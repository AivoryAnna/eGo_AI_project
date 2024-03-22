<script lang="ts">
	import Gameplay from '$components/Gameplay/Gameplay.svelte';
	import About from '$components/About/About.svelte';
	import Header from '$components/Header/Header.svelte';
	import { writable } from 'svelte/store';
	let showComponent = 'Gameplay';
	let showWelcome: boolean = true;
	let gameplayKey = writable(0);

	function resetGameplay() {
		gameplayKey.update((n) => n + 1);
	}
	function handleChangeComponent(event: CustomEvent<{ component: string }>) {
		showComponent = event.detail.component;
		showWelcome = false;
		gameplayKey.update((n) => n + 1);
	}
</script>

<article>
	<div class="overflow-hidden flex flex-col h-[100dvh]">
		<div class="fixed w-full">
			<Header {showWelcome}  on:changeComponent={handleChangeComponent} />
		</div>
		{#if showWelcome || showComponent === 'About'}
			<div class="flex justify-center items-center p-0 h-[100%]">
				<About
					on:continue={() => (showWelcome = false)}
					on:changeComponent={handleChangeComponent}
				/>
			</div>
		{:else if !showWelcome || showComponent === 'Gameplay'}
			{#key $gameplayKey}
				<div class="flex justify-center h-[100dvh]">
					<Gameplay on:reset={resetGameplay} />
				</div>
			{/key}
		{/if}
	</div>
</article>
