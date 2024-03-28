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
	<div class="overflow-hidden flex flex-col h-[100dvh] bg-main h-[100dvh] min-h-[100vh] fixed min-w-[100%] bottom-0 left-0">
		<div class="fixed w-full z-50">
			<Header {showWelcome}  on:changeComponent={({ detail }) => currentComponent.set(detail.component)} />
		</div>
		{#if showWelcome && $currentComponent === 'About'}
			<div class="flex justify-center items-center p-0 h-[100%] z-0">
				<About
					on:continue={() => (showWelcome = false)}
					on:changeComponent={({ detail }) => currentComponent.set(detail.component)}
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
