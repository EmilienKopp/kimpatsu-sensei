<script lang="ts">
    import Logo from "./Logo.svelte";
    import ShadowButton from "./ShadowButton.svelte";
    import { language } from "$lib/stores";
</script>

<div class="fixed top-3 left-5 w-full flex items-center">
    <ShadowButton title="日本語・Japanese" on:click={() => $language = 'ja'}>
        日本語
    </ShadowButton>
    <Logo width="100" reversed={$language == 'en'}/>
    <ShadowButton title="English・英語" on:click={ () => $language = 'en'}>
        English
    </ShadowButton>
</div>

