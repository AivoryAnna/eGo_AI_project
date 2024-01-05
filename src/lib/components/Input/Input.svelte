<script lang="ts">
	import '../Input/Input.css';

	export let type: string = 'text'; 
	export let placeholder: string;
	export let primary = false;
	export let backgroundColor: string | undefined = undefined;
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let value: string = '';

	$: mode = primary ? 'storybook-input--primary' : 'storybook-input--secondary';
	$: style = backgroundColor ? `background-color: ${backgroundColor}` : '';
</script>

{#if type === 'text'}
	<input
		class={['storybook-input', `storybook-input--${size}`, mode].join(' ')}
		type="text"
		{style}
		{placeholder}
		bind:value
	/>
{:else if type === 'checkbox'}
	<!-- Handle checkbox specific binding here -->
	<!-- ... -->
{:else if type === 'radio'}
	<!-- Handle radio specific binding here -->
	<!-- ... -->
{/if}
