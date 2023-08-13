<script lang="ts">
	import Icon from "./Icon.svelte";
	import ContentSection from "$lib/components/ContentSection.svelte";
	import EmailMeButton from "./EmailMeButton.svelte";
</script>

<ContentSection title="Only one in a million" id="intro">
	<p class="text-sm mb-4 max-w-xl text-left font-extrabold sm:text-md" slot="pretext">
		Hi, I'm Emilien, a full-stack developer based near Tokyo, Japan. I'm a
		creative problem solver who loves to build things that make people's lives
		easier.
	</p>
	<div>
		<img src="/images/top.png" alt="My face!" class="w-64 h-64 sm:w-96 sm:h-96" />
	</div>

	<div slot="lead">
		
		<dl class="max-w-xl text-left font-extrabold sm:text-2xl text-md grid grid-cols-5">
			<div class="col-span-5 my-2">Here's me, in short:</div>
			<dt>✅</dt> <dd>proficient in frontend</dd>
			<dt>✅</dt> <dd>proficient in backend</dd>
			<dt>✅</dt> <dd>good communicator</dd>
			<dt>✅</dt> <dd>can lead a team...</dd>
			<dt>✅</dt> <dd>...and architect a project</dd>
			<dt>✅</dt> <dd>speaks English, French, and Japanese</dd>
			<div class="col-span-5 my-2">This is the developer you're looking for. 🤖</div>
		</dl>
	</div>

	<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
		<EmailMeButton>
			<Icon pack="mdi" name="email" cssClass="h-8" />
			<span>Email me</span>
		</EmailMeButton>
		<a
			href="/contact"
			target="_blank"
			class="flex items-center justify-center gap-3 border-2 border-current px-6 py-4"
		>
			<Icon pack="mdi" name="rocket" cssClass="h-8" />
			<span>Contact Form</span>
		</a>
	</div>
</ContentSection>

<style>
	dt {
		grid-column: 1;
	}
	dd {
		grid-column: 2 / 6;
	}
</style>