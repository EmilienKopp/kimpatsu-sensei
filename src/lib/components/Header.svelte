<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
	import type { NavItem } from "$lib";
	import { slide, fly } from "svelte/transition";
	import { sineInOut } from "svelte/easing";
	import { theme } from "$lib/stores";
    import { onMount } from "svelte";
	import { chatting, scrolled} from '$lib/stores';
    import ChatWithMeButton from "./ChatWithMeButton.svelte";

	let menuModal, header, page, menu, openNavButton, closeNavButton;
	let modalMenuOpen = false;

	const navItems: Array<NavItem> = [
		{ title: "Services", url: "/#services" },
		{ title: "Showcase", url: "/#showcase" },
		{ title: "Contact", url: "/contact" },
	];

	console.log($theme);
</script>

<!-- TOP -->
<header
	transition:fly={{ duration: 500, x: -500, easing: sineInOut }}
	bind:this={header}
	id="page-header"
	class="z-[9999] {$scrolled ? 'fixed-header-top border-b' : 'fixed-header-bottom border-t'} flex w-full items-center justify-between border-transparent px-8 py-2 text-[--color-text]  mr-16 h-12 sm:h-16 xl:h-20 2xl:h-28"
>
	<a href="/">
		<svg id="one-in-emilien" class="h-12 xl:h-20 2xl:h-28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify" viewBox="0 0 300 149.999998" preserveAspectRatio="xMidYMid meet" version="1.0" >
			<defs>
				<g />
				<clipPath id="bb214a3457">
					<path
						d="M 0 56.175781 L 300 56.175781 L 300 93 L 0 93 Z M 0 56.175781 "
						clip-rule="nonzero"
					/>
				</clipPath>
			</defs>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(86.557185, 129.713095)">
					<g>
						<path
							d="M 61.507812 -111.007812 L 61.507812 -110.019531 C 67.589844 -96.042969 64.960938 -75.648438 51.96875 -61.835938 L 45.882812 -55.421875 L 45.882812 -100.8125 L 54.269531 -110.019531 L 54.269531 -111.007812 L 5.261719 -111.007812 L 5.261719 -110.019531 L 13.648438 -100.8125 L 13.648438 -10.195312 L 5.261719 -0.988281 L 5.261719 0 L 54.269531 0 L 54.269531 -0.988281 L 45.882812 -10.195312 L 45.882812 -51.144531 L 46.539062 -51.804688 L 68.578125 -9.539062 L 60.519531 -0.988281 L 60.519531 0 L 106.566406 0 L 106.566406 -1.152344 L 74.003906 -67.753906 L 51.640625 -55.585938 L 51.144531 -56.242188 L 106.894531 -110.019531 L 106.894531 -111.007812 Z M 61.507812 -111.007812 "
						/>
					</g>
				</g>
			</g>
			<g clip-path="url(#bb214a3457)">
				<path
					fill="var(--color-background)"
					d="M -40.050781 56.175781 L 323.234375 56.175781 L 323.234375 92.292969 L -40.050781 92.292969 Z M -40.050781 56.175781 "
					fill-opacity="1"
					fill-rule="nonzero"
				/>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(8.458449, 77.513986)">
					<g>
						<path
							d="M 7.601562 0.359375 C 11.808594 0.359375 14.671875 -1.847656 14.671875 -5.066406 C 14.671875 -8.273438 11.808594 -10.507812 7.601562 -10.507812 C 3.40625 -10.507812 0.542969 -8.273438 0.542969 -5.066406 C 0.542969 -1.847656 3.40625 0.359375 7.601562 0.359375 Z M 7.601562 -1.1875 C 4.609375 -1.1875 2.535156 -2.777344 2.535156 -5.066406 C 2.535156 -7.359375 4.609375 -8.945312 7.601562 -8.945312 C 10.59375 -8.945312 12.683594 -7.359375 12.683594 -5.066406 C 12.683594 -2.777344 10.59375 -1.1875 7.601562 -1.1875 Z M 7.601562 -1.1875 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(35.130256, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.632812 0 L 2.632812 -8.214844 L 2.648438 -8.214844 L 9.921875 0 L 12.410156 0 L 12.410156 -10.148438 L 10.480469 -10.148438 L 10.480469 -1.945312 L 10.464844 -1.945312 L 3.207031 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(59.712408, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 10.949219 0 L 10.949219 -1.445312 L 2.648438 -1.445312 L 2.648438 -4.550781 L 10.234375 -4.550781 L 10.234375 -5.882812 L 2.648438 -5.882812 L 2.648438 -8.6875 L 10.808594 -8.6875 L 10.808594 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(82.405287, 77.513986)">
					<g />
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(97.999074, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.691406 0 L 2.691406 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(112.86291, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.632812 0 L 2.632812 -8.214844 L 2.648438 -8.214844 L 9.921875 0 L 12.410156 0 L 12.410156 -10.148438 L 10.480469 -10.148438 L 10.480469 -1.945312 L 10.464844 -1.945312 L 3.207031 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(137.445068, 77.513986)">
					<g />
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(153.038863, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 10.949219 0 L 10.949219 -1.445312 L 2.648438 -1.445312 L 2.648438 -4.550781 L 10.234375 -4.550781 L 10.234375 -5.882812 L 2.648438 -5.882812 L 2.648438 -8.6875 L 10.808594 -8.6875 L 10.808594 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(175.731744, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.632812 0 L 2.632812 -8.074219 L 2.664062 -8.074219 L 7.070312 0 L 9.0625 0 L 13.441406 -8.074219 L 13.46875 -8.074219 L 13.46875 0 L 15.386719 0 L 15.386719 -10.148438 L 12.597656 -10.148438 L 8.058594 -1.789062 L 8.046875 -1.789062 L 3.480469 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(203.290949, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.691406 0 L 2.691406 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(218.154791, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 9.203125 0 L 9.203125 -1.574219 L 2.707031 -1.574219 L 2.707031 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(238.929777, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.691406 0 L 2.691406 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(253.793605, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 10.949219 0 L 10.949219 -1.445312 L 2.648438 -1.445312 L 2.648438 -4.550781 L 10.234375 -4.550781 L 10.234375 -5.882812 L 2.648438 -5.882812 L 2.648438 -8.6875 L 10.808594 -8.6875 L 10.808594 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(276.486486, 77.513986)">
					<g>
						<path
							d="M 0.714844 0 L 2.632812 0 L 2.632812 -8.214844 L 2.648438 -8.214844 L 9.921875 0 L 12.410156 0 L 12.410156 -10.148438 L 10.480469 -10.148438 L 10.480469 -1.945312 L 10.464844 -1.945312 L 3.207031 -10.148438 L 0.714844 -10.148438 Z M 0.714844 0 "
						/>
					</g>
				</g>
			</g>
			<g fill="var(--color-text)" fill-opacity="1">
				<g transform="translate(192.278151, 39.012858)">
					<g>
						<path
							d="M 21.589844 -22.007812 C 21.589844 -25.917969 18.429688 -29.078125 14.558594 -29.078125 L 1.332031 -29.078125 L 1.332031 -20.257812 L 8.363281 -20.257812 L 8.363281 -22.007812 L 14.558594 -22.007812 L 14.558594 -17.597656 L 8.363281 -17.597656 C 4.453125 -17.597656 1.332031 -14.433594 1.332031 -10.566406 L 1.332031 0.0429688 L 21.589844 0.0429688 L 21.589844 -7.03125 L 8.363281 -7.03125 L 8.363281 -10.566406 L 14.558594 -10.566406 C 18.429688 -10.566406 21.589844 -13.726562 21.589844 -17.597656 L 21.550781 -17.597656 C 21.589844 -17.886719 21.589844 -18.179688 21.589844 -18.511719 Z M 21.589844 -22.007812 "
						/>
					</g>
				</g>
			</g>
		</svg>
	</a>
	<div class="z-[9999]">
		<div class="flex items-center gap-6">
			<nav class="hidden sm:block">
				<ul class="flex items-center gap-6">
					{#each navItems as { title, url }}
						<li>
							<a
								class="text-sm xl:text-lg 2xl:text-xl"
								href={url}
							>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<ThemeSwitcher />
			<ChatWithMeButton class="h-8 block sm:hidden"/>
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
			<div
				id="menu-modal"
				class="modal"
				aria-hidden="true"
				bind:this={menuModal}
				transition:slide={{ duration: 500, easing: sineInOut }}
			>
				<div class="fixed inset-0 bg-default px-8 py-4 text-default">
					<div class="space-y-4" role="dialog" aria-modal="true">
						<header class="text-right">
							<button
								bind:this={closeNavButton}
								on:click={() => (modalMenuOpen = false)}
								id="close-nav-button"
								type="button"
								class="btn"
								aria-label="Close navigation"
							>
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
										<a
											class="block py-4 text-center text-xl"
											href={url}
											on:click={() =>
												(modalMenuOpen = false)}
										>
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
	
	<div class="hidden gap-2 sm:flex">
		<h1 class="font-extralight hidden md:block text-red">emilien kopp</h1>
		<ChatWithMeButton class="h-8 hidden sm:block"/>
		<Icon
			pack="mbi"
			name="github"
			cssClass="h-8"
			href="https://github.com/EmilienKopp"
		/>
		<Icon
			pack="mbi"
			name="linkedin"
			cssClass="h-8"
			href="https://www.linkedin.com/in/emilien-kopp/"
		/>

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
