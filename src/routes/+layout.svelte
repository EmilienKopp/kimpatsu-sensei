<script lang="ts">
    import "../app.postcss";
    import "$lib/styles/index.css";
    import Chat from "$lib/components/Chat.svelte";
    import ChatWithMeButton from "$lib/components/ChatWithMeButton.svelte";
    import type { PageData } from "./$types";
    import { language } from "$lib/stores";

    export let data: PageData;
    
</script>

<div class="bg-[--color-background] h-full w-full flex flex-col items-start sm:items-center justify-center lg:pt-auto px-2">
    <slot/>
</div>

<div class="fixed bottom-6 right-6 flex gap-4">
    <span class="text-xs font-thin font-mono">
        {#if $language == 'en'}
            A little chat first?
        {:else}
            まずはチャットで
        {/if}
        <ChatWithMeButton />
    </span>
    
</div>

<Chat {data}/>