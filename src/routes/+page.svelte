<script lang="ts">
    import { cubicInOut } from "svelte/easing";
	import Logo from "$lib/components/Logo.svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import ShadowButton from "$lib/components/ShadowButton.svelte";
	import { tweened } from "svelte/motion";
    import { pickedWord } from "$lib/stores";
    import { confetti } from '@neoconfetti/svelte';
    import { Drawer } from 'flowbite-svelte';
    import ChatWithMeButton from "$lib/components/ChatWithMeButton.svelte";
    import Chat from "$lib/components/Chat.svelte";
    import type { PageData } from "./$types";
    import Commands from "$lib/components/Commands.svelte";

    export let data: PageData;

    let words = [
        'sunglasses',
        'hair',
        'bowtie',
        'shirt',
        'nose',
    ];

    let showingWord: string | undefined = randomWord();
    let skipped = false;

	const progress = tweened(0, {
		duration: 300,
		easing: cubicInOut,
	});

    

    function randomWord() {
        return words.at(Math.floor(Math.random() * words.length));
    }

    function skip() {
        skipped = true;
        $progress = 1;
        words = [];
    }
    
    $: {
        if(showingWord == $pickedWord) {
            $progress += 0.20;
            $pickedWord = "";
            words = words.filter(word => word != showingWord);
            if(words.length) showingWord = randomWord();
        }
    }
</script>


<div class="grid h-full sm:flex sm:flex-col sm:gap-3 md:pt-4 sm:items-center sm:justify-center place-content-center place-items-center gap-5" >
    <div class="main-title text-3xl font-mono text-slate-300 text-center flex flex-col items-center" >
        キンパツ先生
        <Logo width="300" clickable/>
        Helps you learn, and more!
    </div>
    {#if words.length}
    <progress value={$progress} />
    <div class="text-[--color-text] text-lg font-mono">
        Click my ...
        <div class="gradient-text text-2xl text-center">{showingWord}</div>
    </div>
    <ShadowButton title="スキップ" on:click={skip}>
        Skip
    </ShadowButton>
    {:else}
        {#if !skipped}
            <span class="text-lg">😄🎉</span>
            <div class="gradient-text text-center py-1">
                Your first lesson will be free!
            </div>
            <div
                style="position: absolute; left: 50%; top: 30%"
                use:confetti={{
                    force: 0.3,
                    stageWidth: window.innerWidth,
                    stageHeight: window.innerHeight,
                    colors: ['#ff3e00', '#40b3ff', '#676778']
                }}>
                
            </div>
            <Commands />
        {:else}
            <Commands />
        {/if}
    {/if}
</div>



<style>
    progress[value]::-webkit-progress-bar {
        background-color: #eee;
        border-radius: 2px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    }

    progress[value]::-webkit-progress-value {
        background-color: rgb(255, 250, 175);
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    }
</style>