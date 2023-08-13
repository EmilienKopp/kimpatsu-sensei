<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
	import type { NavItem } from "$lib";
	import { slide, fly } from "svelte/transition";
	import { sineInOut } from "svelte/easing";
	import Logo from "./Logo.svelte";
	import { theme } from "$lib/stores";
    import { onMount, tick } from "svelte";
	import { chatting, scrolled} from '$lib/stores';
    import ChatWithMeButton from "./ChatWithMeButton.svelte";
    import { goto } from "$app/navigation";
    import ShadowBox from "./ShadowBox.svelte";
    import ShadowButton from "./ShadowButton.svelte";

	export let position: "top" | "bottom" = "top";

	let menuModal, header, page, menu, openNavButton, closeNavButton;
	let modalMenuOpen = false;
	let main: HTMLElement | null;
	

	const navItems: Array<NavItem> = [
		{ title: "Services", url: "#services" },
		{ title: "Showcase", url: "#showcase" },
		{ title: "Contact", url: "/contact" },
	];

    onMount(() => {
        main = document.querySelector('main');
    });

	$: borderPosition = position === "top" ? "b" : "t";
</script>


<!-- TOP -->
<header id="page-header" transition:fly={{ duration: 500, x: -500, easing: sineInOut }} bind:this={header}
class="z-[9999] fixed-header-{position} border-{borderPosition} flex w-full items-center 
justify-between border-transparent px-8 py-2 text-[--color-text]  mr-16 h-12 sm:h-16 xl:h-20 2xl:h-28" >

	<a href="/dev" id="home" on:click={() => main?.scrollTo({top: 0, behavior: 'smooth'})}>
		<Logo width="70" reversed />
	</a>
	<div class="z-[9999]">
		<div class="flex items-center gap-6">
			<nav class="hidden sm:block">
				<ul class="flex items-center gap-6">
					{#each navItems as { title, url, external }}
						<li>
							<ShadowButton {title} href={url} {external}>
								{title}
							</ShadowButton>
						</li>
					{/each}

				</ul>
			</nav>
			
			<div class="block sm:hidden">
				<ChatWithMeButton />
			</div>
			
			<button
				bind:this={openNavButton}
				on:click={() => (modalMenuOpen = true)}
				id="open-nav-button"
				type="button"
				class="btn sm:hidden"
				aria-label="Navigation"
			>
				<Icon pack="mdi" name="menu" cssClass="h-8" />
			</button>
		</div>
		
		{#if modalMenuOpen}
			<div id="menu-modal" class="modal" aria-hidden="true"
				bind:this={menuModal} transition:slide={{ duration: 500, easing: sineInOut }}>

				<div class="fixed inset-0 bg-default px-8 py-4 text-default">
					<div class="space-y-4" role="dialog" aria-modal="true">
						<header class="text-right">
							<button id="close-nav-button" type="button" class="btn" aria-label="Close navigation"
							bind:this={closeNavButton} on:click={() => (modalMenuOpen = false)}>
								<Icon pack="mdi" name="close" cssClass="h-8" />
							</button>
						</header>
						<div class="flex justify-center">
							<Icon name="logomark" cssClass="h-16" />
						</div>
						<nav>
							<ul class="flex flex-col" bind:this={menu}>
								{#each navItems as { title, url }}
									<li>
										<a class="block py-4 text-center text-xl" href={url}
										on:click={() => { (modalMenuOpen = false);  }}>
											{title}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		{/if}
	</div>
	
	<div class="hidden gap-2 sm:flex items-center">
		<h1 class="font-extralight hidden md:block text-red">emilien kopp</h1>
		<ChatWithMeButton />
		<ShadowButton external rounded title="Visit my GitHub" type="a" href="https://github.com/EmilienKopp">
			<Icon
				pack="mbi"
				name="github"
				cssClass="h-6"
				fill="none"
			/>
		</ShadowButton>
		<ShadowButton external rounded title="Visit my LinkedIn" type="button" href="https://www.linkedin.com/in/emilien-kopp/">
			<Icon
				pack="mbi"
				name="linkedin"
				cssClass="h-6"
				fill="none"
			/>
		</ShadowButton>
		<ThemeSwitcher />
	</div>
</header>


<noscript>
	<style>
		#open-nav-button {
			display: none;
		}
	</style>
</noscript>

<style>
	.fixed-header-bottom {
		@apply fixed top-auto bottom-0;
		@apply border-default bg-default text-default;
		transition: top 0.5s ease-in-out;
	}

	.fixed-header-top {
		@apply fixed bottom-auto top-0;
		@apply border-default bg-default text-default;
		transition: top 0.5s ease-in-out;
	}
</style>
