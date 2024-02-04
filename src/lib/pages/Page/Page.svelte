<script lang="ts">
	import Gameplay from '$components/Gameplay/Gameplay.svelte';
	import About from '$components/About/About.svelte';

	let showWelcome: boolean = true;
</script>

<article>
	<div class="flex justify-center items-center min-h-screen">
		{#if showWelcome}
			<About on:continue={() => (showWelcome = false)} />
		{:else}
			<Gameplay />
		{/if}
	</div>
</article>
