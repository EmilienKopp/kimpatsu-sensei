<script lang="ts">
    import { createClient } from '@supabase/supabase-js';
    import { Input, Select, Button, GradientButton, Textarea, Label, Helper } from 'flowbite-svelte';
    import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import ShadowButton from '$lib/components/ShadowButton.svelte';
    import ShadowBox from '$lib/components/ShadowBox.svelte';

    export let data: PageData;

    const { form, enhance } = superForm(data.form, {
        onSubmit: async ( {action, data, form, cancel }) => {
            submitted = true;
            cancel();
        }
    });
    
    let submitted = false;
    let response: any = {};

    function clear() {
        $form = {
            customer_name: '',
            age: 0,
            email: '',
            inquiry: '',
            message: ''
        }
    }

    async function handleConfirm() {
        const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
        response = await supabase.from('inquiries').insert($form);
        await fetch('/API/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify($form)
        });
    }

</script>

<div class="pt-4 mx-auto mb-12 w-full h-full sm:px-56 md:px-72 px-2 text-[--color-text] pb-32 max-h-screen overflow-auto bg-[--color-background]">
    <h1 class="text-xl mb-5 text-center text-[--color-text]"> Contact Form </h1>

    {#if !submitted}
    <form method="POST" class="flex flex-col items-center sm:items-end pb-8" use:enhance>
        <fieldset title="Personal Information" class="flex flex-col md:grid md:grid-cols-2 gap-4 w-full ">
            <legend class="text-[--color-text]">基本情報</legend>
            <div class="w-full">
                <Label for="customer_name" class="mb-2 text-[--color-text]">お名前</Label>
                <Input name="customer_name" size="sm" required placeholder="Neil Armstrong" bind:value={$form.customer_name}/>
            </div>
        
            <div class="w-full">
                <Label for="age" class="mb-2 text-[--color-text]">受講者の年齢 【任意】</Label>
                <Input type="number" name="age" size="sm" bind:value={$form.age}/>
            </div>
            
            <div class="w-full">
                <Label class='block mb-2 text-[--color-text]' >Eメール</Label>
                <Input label="Email" id="email" name="email" size="sm"  required placeholder="armstrong@nasa.com" bind:value={$form.email}/>
            </div>

            <div class="col-span-2">
                <Helper class='text-sm mt-2 text-[--color-text]'>
                    We’ll never share your details. 
                    Read our <a target="_blank" href="/text/privacy.md" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Privacy Policy</a>.
                </Helper>
            </div>
        </fieldset>
        <hr class="my-2 w-full text-[--color-text]">
        <fieldset  title="Inquiry" class="flex flex-col gap-3 w-full text-[--color-text]">
            <legend>どのようなご用件ですか</legend>
            <Select bind:value={$form.inquiry} name="inquiry" size="sm" required>
                <option value="casual">Casualプランで受講したい</option>
                <option value="balanced">Balancedプランで受講したい</option>
                <option value="hardcore">Hardcoreプランで受講したい</option>
                <option value="unsure">受講プランについて相談したい</option>
                <option value="corporate">社内英語研修を頼みたい</option>
                <option value="subcontract">業務委託を頼みたい</option>
                <option value="Other...">その他（下記にご記入ください）</option>
            </Select>
            <Label for="message" class="text-[--color-text]">メッセージ【任意】</Label>
            <Textarea  name="message" bind:value={$form.message} placeholder="Fly me to the moon, and ..."/>
        </fieldset>
        <div id="buttons" class="mt-2 flex gap-3 justify-center px-5">
            <ShadowButton title="Go back" href="/">
                <span class="text-[--color-text]">もどる</span>
            </ShadowButton>
            <ShadowButton title="Clear" on:click={clear} color="red">
                <span class="text-[--color-text]">リセット</span>
            </ShadowButton>
            <ShadowButton title="Send" submit color="blue">
                <span class="text-[--color-text]">送信</span>
            </ShadowButton>
            <!-- <GradientButton class="mt-5" color="red" on:click={clear}>Clear</GradientButton>
            <GradientButton class="mt-5" on:click={handleSubmit}>Send</GradientButton> -->
        </div>
        
    </form>
    {:else}
        {#if response?.status < 300}
            <p>
                👋 お問い合わせありがとうございました。48時間以内にご返信いたします。 
            </p>
            <ShadowButton title="Go back" href="/" >戻る</ShadowButton>
        {:else if response?.error}
            問題が生じたようです。もうしばらくたってからやり直していただくか、 <a href="mailto:emilien.kopp@gmail.com">こちらに直接にメールをお送りいただけます</a>。<br>
            <Button on:click={() => {submitted = false}}>やり直す</Button>
        {:else}
            <dl class="grid md:grid-cols-2 mb-4">
                <dt>お名前:</dt>
                <dd>{$form.customer_name}</dd>

                {#if $form.age}
                    <dt>受講者の年齢:</dt>
                    <dd>{$form.age}</dd>
                {/if}

                <dt>Eメール:</dt>
                <dd>{$form.email}</dd>

                <dt>お問い合わせ内容:</dt>
                <dd>{$form.inquiry}</dd>

                <dt>メッセージ文:</dt>
                <dd>{$form.message ?? ""}</dd>
            </dl>
            <ShadowBox direction="col">
                <h3 class="italic text-lg">送信しますか?</h3>
                <div class="flex gap-3">
                    <ShadowButton title="Cancel form submission" color="red" on:click={() => {submitted = false}}>修正</ShadowButton>
                    <ShadowButton  title="Submit form" on:click={handleConfirm} color="green">送信</ShadowButton>
                </div>
            </ShadowBox>            
            
        {/if}
    {/if}

</div>

<style>
    a {
        color: orangered;
        text-decoration: underline;
    }
    dt {
        font-weight: bold;
    }
    dd {
        margin-bottom: 1rem;
    }
</style>