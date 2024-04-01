<script lang="ts">
    import { onMount } from 'svelte';
    import Gameplay from '$components/Gameplay/Gameplay.svelte';
    import About from '$components/About/About.svelte';
    import Header from '$components/Header/Header.svelte';
    import { writable } from 'svelte/store';
	import { currentComponent } from '../../../stores';

    let showWelcome: boolean = true;
    let gameplayKey = writable(0);

	onMount(() => {
        const storedComponent = localStorage.getItem('currentComponent');
        if (storedComponent) {
            currentComponent.set(storedComponent);
        } 
    });

    function resetGameplay() {
        gameplayKey.update((n) => n + 1);
		localStorage.removeItem('chatMessages');
    }

	$: showWelcome = $currentComponent === 'About';

	onMount(() => {
        currentComponent.subscribe($currentComponent => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('currentComponent', $currentComponent);
            } 
        });
    });
</script>


<article>
	<div class="overflow-hidden flex flex-col h-[100dvh] bg-main ">
		{#if $currentComponent === 'Gameplay' || $currentComponent === 'About'}
		<div class="fixed w-full z-50">
			<Header {showWelcome} />
		</div>
		{/if}
		{#if showWelcome && $currentComponent === 'About'}
			<div class="flex justify-center items-center p-0 h-[100dvh] ">
				<About
					on:continue={() => (showWelcome = false)}
				/>
			</div>
		{:else if $currentComponent === 'Gameplay'}
			{#key $gameplayKey}
				<div class="flex justify-center h-[100dvh] ">
					<Gameplay on:reset={resetGameplay} />
				</div>
			{/key}
		{/if}
	</div>
</article>
