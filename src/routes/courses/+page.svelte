<script lang="ts">
    import type { PageData } from "./$types";
    import Logo from "$lib/components/Logo.svelte";
    import { fly, slide, fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { language } from "$lib/stores";
    import ShadowButton from "$lib/components/ShadowButton.svelte";
    import LanguageControls from "$lib/components/LanguageControls.svelte";

    export let data: PageData;
    
    const plans =  {
        casual: {
            name: 'Casual',
            price: 3000,
            description: `For those who want to learn at their own pace.
            Casual lessons with no homework, and a focus on conversation.
            You come, you learn, you go.`,
            description_jp: `自分のペースで学びたい人のためのコース。
            宿題はほとんどなく、会話に重点を置いたカジュアルなレッスン。
            あなたが来て、学び、終わり。`,
        },
        balanced: {
            name: 'Balanced',
            price: 5000,
            description: `Lessons focused on your goals. You can choose to focus on conversation, grammar, reading, or
            whatever else you want to learn. Bring-your-own-materials.
            Ideal for those who want a mix of conversation and grammar, homework help, and blended learning with online tools.
            Homework is optional, but recommended.`,
            description_jp: `あなたの目指しているゴールに向けて相談しながら、勉強法を決めていきます。
            会話、文法、読み方など、あなたが学びたいことに重点を置いたレッスン。
            テキストに従っていくより、質問対応、宿題サポート、勉強法相談、臨機応変にやりたい人に向いているスタイルです。
            オンライン学習ツールの使用あり。
            教材は基本あなたのを持ち込みです。宿題は任意ですが、おすすめです。`,
        },
        hardcore: {
            name: 'Hardcore',
            price: 7000,
            description: `For those who want to learn fast. Lessons are intensive, and homework is mandatory.
            You can choose to focus on conversation, grammar, reading, or whatever else you want to learn.
            The teacher will make customized homework for you.`,
            description_jp: `早く学びたい人のためのコース。レッスンはあなたの目標に向けて、宿題は必須です。
            教師からカスタマイズされた教材や宿題がもらえます。`,
        },
    }

    async function checkAvailability() {
        const { data: availabilityData, error } = await data.supabase.from('availability').select('*');
        console.log(availabilityData);
    }


    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>

<LanguageControls />

<div class="flex flex-col w-[90%] h-2/3 mx-auto overflow-auto p-2 shadow-md border">
    <h1 class="text-xl w-full px-2">
        {#if $language == 'ja'}
            レッスンについて
        {:else}
            About the lessons
        {/if}
    </h1>    
    <p transition:slide>
        {#if $language == 'ja'}
            オンラインでの受講となります（Zoom使用）。対面希望の方はご相談ください。
            <br>レッスンは基本1時間ですが、30分に分けることも可能です。
            <br>※コース料金は1時間辺り・税込みです。回数券もご購入いただけます。
        {:else}
            Lessons are online (using Zoom). If you want to meet in person, please contact me.
            <br>Lessons are usually 1 hour, but can be split into 30 minute lessons.
            <br>※Prices are per hour, tax included. You can also buy packs of lessons.
        {/if}
    </p>

    <ShadowButton title="連絡する" href="/contact">
        {#if $language == 'ja'}
            連絡する
        {:else}
            Contact me
        {/if}
    </ShadowButton>

    {#await sleep(100) then}   
        <ul class="text-left w-full flex flex-col sm:gap-12">
            <li in:fly={{duration: 600, delay: 1500, x: -1500}}>
                <h3 class="lg:text-2xl text-[--color-text] text-md font-bold mt-10 font-mono block w-fit"> 
                    🌻 {plans.casual.name}: ¥{plans.casual.price}
                </h3>
                {#if $language == 'ja'}
                    <p transition:slide>{plans.casual.description_jp}</p>
                {:else}
                    <p transition:slide>{plans.casual.description}</p>
                {/if}
            </li>
            <li in:fly={{duration: 600, delay: 2100, x: -1500}}>
                <h3 class="lg:text-2xl text-[--color-text] text-md font-bold mt-10 font-mono block w-fit"> 
                    ⚖️ {plans.balanced.name}: ¥{plans.balanced.price} 
                </h3>
                {#if $language == 'ja'}
                    <p transition:slide>{plans.balanced.description_jp}</p>
                {:else}
                    <p transition:slide>{plans.balanced.description}</p>
                {/if}
            </li>
            <li in:fly={{duration: 600, delay: 1800, x: -1500}}>
                <h3 class="lg:text-2xl text-[--color-text] text-md font-bold mt-10 font-mono block w-fit"> 
                    🔥 {plans.hardcore.name}: ¥{plans.hardcore.price}
                </h3>
                {#if $language == 'ja'}
                    <p transition:slide>{plans.hardcore.description_jp}</p>
                {:else}
                    <p transition:slide>{plans.hardcore.description}</p>
                {/if}
            </li>
        </ul>        
    
        
    
    {/await}

</div>


<style>
    p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        @apply text-[--color-text] text-xs font-mono;
    }
</style>
