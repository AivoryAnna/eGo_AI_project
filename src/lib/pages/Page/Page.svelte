<script lang="ts">
	import Gameplay from '$components/Gameplay/Gameplay.svelte';
	import About from '$components/About/About.svelte';
	import Header from '$components/Header/Header.svelte';

	let showWelcome: boolean = true;
</script>

<article>
	<div class="overflow-hidden flex flex-col h-[100dvh]">
		<div class='fixed'>
			<Header {showWelcome} />
		</div>
		{#if showWelcome}
			<div class="flex justify-center items-center p-0 h-[100%]">
				<About on:continue={() => (showWelcome = false)} />
			</div>
		{:else}
			<div class="flex justify-center h-[100dvh] ">
				<Gameplay />
			</div>
		{/if}
	</div>
</article>
