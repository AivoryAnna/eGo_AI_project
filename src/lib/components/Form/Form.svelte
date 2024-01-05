<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Input from '../Input/Input.svelte';

	let name = '';
</script>

<form method="POST" action="/login">
	<Input size='small' type="text" bind:value={name} placeholder="Enter your name"  />
	{#if name.length > 0}
		<Button type="submit" size="small" label={`Hello, ${name}! Click me!`}/>
	{/if}
</form>
