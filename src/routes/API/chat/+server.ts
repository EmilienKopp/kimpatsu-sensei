import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { PUBLIC_HOME_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

import { OPEN_AI_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

// Create an OpenAI API client (that's edge friendly!)
const cfg = new Configuration({
    apiKey: OPEN_AI_KEY,
});
const openai = new OpenAIApi(cfg);

export const config = {
    runtime: 'edge'
}

export async function POST({ params, request }: any) {
    console.log(request);
    const body = await request.json();
    console.log('BODY', body)

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

    const datesFromNowToInSixMonths = [...Array(6).keys()].map((i) => {
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        return date.toISOString().slice(0,6);
    });

    const availabilities = await supabase.from('availability').select('*').in('id', datesFromNowToInSixMonths).order('id', { ascending: true });

    const formattedAvailabilities = availabilities?.data?.map((availability: any) => {
        return `
            キンパツ先生は ${availability.id.slice(0, 4)}年${availability.id.slice(5, 7)}月に以下の日時で空きがある:
                - 月曜日: ${availability.monday} 時間,
                - 火曜日: ${availability.tuesday} 時間,
                - 水曜日: ${availability.wednesday} 時間,
                - 木曜日: ${availability.thursday} 時間,
                - 金曜日: ${availability.friday} 時間,
                - 土曜日: ${availability.saturday} 時間,
                - 日曜日: ${availability.sunday} 時間.
        `;
    }).join('\n');

    let systemRole: ChatCompletionRequestMessageRoleEnum = "system";
    let homeURL = PUBLIC_HOME_URL;
    // Prompt
    const messages = [
        {
            role: systemRole,
            content: `
            あなたは、以下の情報をもとに、このサイトの持ち主「キンパツ先生」の立場となって、クライアントに対して返信する必要がある。
            このサイトは、キンパツ先生のビジネスのために作成されました。キンパツ先生の本名を知っている人ならば、色々とサービスしてまいります。
            キンパツ先生はフランス人で、日本に12年住んでいて英語教師として10年の経験がある。
            中学・高校の英語が一番得意。
            千葉県最大級の合格実績を誇る進学塾に8年もつとめていたので、受験生の英語指導にも自信がある。
            英語、フランス語、日本語が流暢で、語学のプロです。
            また、学習において新しい技術を常に取り入れている。
            高校受験、英会話、英検対策、勉強法相談、社会人向けの英語レッスンなど幅広く教えている。
            受験などが目の前の人以外、英語を長期的に身に着けたい人に対する授業をこれからメインにしていく。
            日常生活でどうすれば語学が身につくか、どうすれば英語が話せるようになるか、アドバイスをしながら、
            伝統的な「文法・単語」中心ではなく、プロジェクトベース学習や多読など、新しい勉強法を使用し、楽しく長期的に定着する学習を目指す。
            キンパツ先生は、オンラインでの受講となります（Zoom使用）。対面希望の方はご相談ください。
            レッスンは基本1時間ですが、30分に分けることも可能です。コース料金は1時間辺り・税込みです。回数券もご購入いただけます。
            プランについては、必要に応じてこのURLを参照してください: \` ${homeURL}courses \`.
            申し込む意思が顧客にありそうなら、このURLを参照してください: \` ${homeURL}contact \`.
            1対1のレッスンは3つのプランがあります:
                \`・カジュアルプラン:　一時間3000円（税込み）・ 自分のペースで学びたい人のためのコース。
                宿題はほとんどなく、会話に重点を置いたカジュアルなレッスン。
                あなたが来て、学び、終わり。\`
    
                \`・バランスプラン:　一時間5000円（税込み）・学習者の目指しているゴールに向けて相談しながら、勉強法を決めていきます。
                会話、文法、読み方など、顧客が学びたいことに重点を置いたレッスン。
                テキストに従っていくより、質問対応、宿題サポート、勉強法相談、臨機応変にやりたい人に向いているスタイルです。
                オンライン学習ツールの使用あり。
                教材は基本あなたのを持ち込みです。宿題は任意ですが、おすすめです。\`
    
                \`・ハードコアプラン：一時間7000円（税込み）・早く学びたい人のためのコース。レッスンはあなたの目標に向けて、宿題は必須です。
                教師からカスタマイズされた教材や宿題がもらえます。\`
                
            オンラインでの受講となります（Zoom使用）。対面希望の方は相談が必要と伝えること。
    
            ${formattedAvailabilities}

            キンパツ先生の立場となって、一人称で答えること。また、キンパツ先生は、長い返答をせずに、お客さんからの質問に対して、簡潔に答えて、会話が続くように質問もしていくこと。
            自分については、聞かれたときだけ話す。
            `
        },
    ]

    messages.push(...body?.messages);

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        temperature: 0.6,
        messages: messages
    });

   // TODO: Handle errors

    if(response.status > 299) {
        return {
            status: response.status,
            body: {
                error: response.statusText
            }
        }
    }

    let start: number, end: number;
    let word_count = 0;

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
        onStart: async () => {

            start = performance.now();
            console.log(start);
        },
        onToken: async () => {
            word_count++;
        },
        onCompletion: async (completion: string) => {
            end = performance.now();
            console.log('DURATION:', end - start)
        },
    });

    // Respond with the stream
    const streamingResponse = new StreamingTextResponse(stream);
    return streamingResponse;
}