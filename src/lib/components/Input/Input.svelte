<script lang="ts">
	import '../../styles/tailwind.css';

	export let type: string = 'text';
	export let placeholder: string | undefined = undefined;
	export let size: 'small' | 'medium' | 'large';
	export let min: string = '';
	export let id: string = '';
	export let value: string = '';
	export let group: string = '';
	export let innerRef: { current: null | HTMLInputElement } = { current: null };
	

	let baseClasses = 'block p-4 ps-5 text-sm text-font border border-custom-blue rounded-lg bg-main focus:ring-custom-blue focus:border-custom-blue focus:outline-none focus:ring-0';
	let sizeClasses = {
		small: 'p-2 text-sm',
		medium: 'p-3 text-base',
		large: 'w-full pr-[8%]'
	};
</script>

{#if type === 'text'}
	<input
	bind:this={innerRef.current}
		class={`${baseClasses} ${sizeClasses[size]}`}
		type="text"
		{placeholder}
		bind:value
		{id}
		required
		on:focus
	/>
{:else if type === 'number'}
	<input
		class={`border rounded ${sizeClasses[size]} `}
		type="number"
		bind:value
		{min}
	/>
{:else if type === 'radio'}
	<input
		class={`border rounded ${sizeClasses[size]}`}
		type="radio"
		{id}
		bind:group
		{value}
	/>
{/if}
