<script lang="ts">
	import '../Input/Input.css';

	export let type: string = 'text';
	export let placeholder: string | undefined = undefined;
	export let primary = false;
	export let backgroundColor: string | undefined = undefined;
	export let size: 'small' | 'medium' | 'large' | undefined = undefined;
	export let min: string = '';
	export let id: string = '';
	export let value: string = '';
	export let group: string = '';


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
{:else if type === 'number'}
	<input
		class={['storybook-input', `storybook-input--${type}`, mode].join(' ')}
		type="number"
		{style}
		bind:value
		{min}
	/>
{:else if type === 'radio'}
<input
class={`storybook-input--${type}`}
type="radio"
{style}
{id}
bind:group={group}
value={value}
/>
{/if}
