<script lang="ts">
	import Gameplay from '$components/Gameplay/Gameplay.svelte';
	import About from '$components/About/About.svelte';

	let showWelcome: boolean = true;
</script>

<article>
	<div class="flex justify-center items-center">
		{#if showWelcome}
			<div class="flex justify-center items-center pt-20">
				<About on:continue={() => (showWelcome = false)} />
			</div>
		{:else}
			<div class="flex justify-center items-center pt-0">
				<Gameplay />
			</div>
		{/if}
	</div>
</article>
