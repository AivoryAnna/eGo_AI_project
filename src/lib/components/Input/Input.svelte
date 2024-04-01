<script lang="ts">
	import '../../styles/tailwind.css';
	import { createEventDispatcher } from 'svelte';
	

	export let type: string = 'text';
	export let placeholder: string | undefined = undefined;
	export let size: 'small' | 'medium' | 'large';
	export let min: string = '';
	export let id: string = '';
	export let value: string = '';
	export let group: string = '';
	export let innerRef: { current: null | HTMLTextAreaElement } = { current: null };

	let baseClasses =
		'block p-4 sm:w-[90%] text-sm text-font bg-main rounded-lg border border-custom-blue focus:ring-custon-blue focus:border-custom-blue focus:outline-none focus:ring-0';
	let sizeClasses = {
		small: 'p-2 text-sm',
		medium: 'p-3 text-base',
		large: 'w-full pr-[8%] sm:pr-[15%]'
	};
	function autoResize(event: Event) {
		let textarea = event.target as HTMLInputElement;
		if (window.innerWidth < 959) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
			textarea.style.padding = `pb-[8%] pb-[8%] pl-[2%]`
		}
	}

	const dispatch = createEventDispatcher();

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            dispatch('submit');
        }
    }
</script>

{#if type === 'text'}
	<textarea
		bind:this={innerRef.current}
		class={`${baseClasses} ${sizeClasses[size]}`}
		autocomplete="off"
		{placeholder}
		bind:value
		on:keydown={handleKeyDown}
		{id}
		rows="1"
		required
		on:focus
		on:input={autoResize}
		style="overflow:hidden; resize:none;"
	/>
{:else if type === 'number'}
	<input class={`border rounded ${sizeClasses[size]} `} type="number" bind:value {min} />
{:else if type === 'radio'}
	<input class={`border rounded ${sizeClasses[size]}`} type="radio" {id} bind:group {value} />
{/if}
