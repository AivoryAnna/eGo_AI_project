<script lang="ts">
	import Button from '../Button/Button.svelte';
	import Input from '../Input/Input.svelte';

	let name = '';
	let responseMessage = '';

	const handleSubmit = async () => {
            const response = await fetch('http://localhost:3000/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: name })
		    });
		const data = await response.json();
    
		if (name.length > 0) {
			responseMessage = `Hello, ${name}! `;
		}
		responseMessage += data.reply;
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input size="small" type="text" bind:value={name} placeholder="Enter your name" />
	{#if name.length > 0}
		<Button
			type="submit"
			size="small"
			label={`Hello, ${name}! Click me!`}
			on:click={handleSubmit}
		/>
	{/if}
	{#if responseMessage}
		<p>{responseMessage}</p>
	{/if}
</form>
