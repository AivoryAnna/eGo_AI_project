<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import '../../styles/tailwind.css';

	const dispatch = createEventDispatcher();

	function handleHostClick() {
        dispatch('continue');
    }

	function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            handleHostClick();
            event.preventDefault();
        }
    }
</script>

<div class="sm:mt-[calc(100%-90%)] md:mt-[calc(100%-90%)] lg:mt-[calc(100%-95%)] mt-[calc(100%-98%)]  flex flex-col justify-center items-center text-center pr-10 pl-10 overflow-hidden ">
	<h1
		class=" sm:mb-15 md:mb-5 mb-5 sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none text-font"
	>
		Discover Your Uniqueness
	</h1>
	<p class="mb-20 font-normal text-font sm:hidden md:hidden lg:text-2xl xl:text-2xl">
		Embark on an adventure into self-discovery by diving into social games with AI.
	</p>
	<p class="mb-20 sm:mb-10 font-normal text-font sm:text-base md:text-2xl lg:hidden xl:hidden">
		Embark on an adventure with AI.
	</p>
	<div class=" mb-0 flex w-full flex-row justify-center items-center justify-start">
		<div>
			<div
				tabindex="0"
				role="button"
				on:click={handleHostClick}
				on:keydown={handleKeyDown}
				class="inline-flex items-center w-full p-5 text-font bg-white border border-custom-blue rounded-lg cursor-pointer peer-checked:border-custom-blue peer-checked:text-blue-600 hover:text-font hover:bg-main"
			>
				<div class="block text-left justify-self-center">
					<div class="w-full text-lg font-semibold">Start Game</div>
					<div class="w-full">I am ready to discover myself.</div>
				</div>

				<svg
					class="w-5 h-5 ms-3 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="#222222"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</div>
		</div>
	</div>
</div>
