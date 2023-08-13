<script lang="ts">
    import { cubicInOut } from "svelte/easing";
	import Logo from "./Logo.svelte";
	import { tweened } from "svelte/motion";

	const progress = tweened(0, {
		duration: 300,
		easing: cubicInOut,
	});
</script>

<section class="relative h-full bg-transparent">
	<div class="relative grid h-full sm:flex sm:flex-col sm:gap-3 p-4 md:pt-4 sm:items-center sm:justify-center place-content-center place-items-center gap-8" >
		<div class="main-title text-3xl font-mono text-slate-300 text-center flex flex-col items-center" >
			キンパツ先生
			<Logo width="300" />
			Helps you learn, and more!
		</div>
		<progress value={$progress} />
		<input type="range" min="0" max="1" step="0.1" bind:value={$progress} />
	</div>
</section>

<style>
	progress[value]::-webkit-progress-bar {
		background-color: #eee;
		border-radius: 2px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
	}

	progress[value]::-webkit-progress-value {
		background-color: var(--color-background-offset);
		border-radius: 2px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
		@apply blur sepia;
	}
</style>
