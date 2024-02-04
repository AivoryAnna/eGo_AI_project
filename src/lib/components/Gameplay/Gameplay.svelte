<script lang="ts">
	import Input from '$components/Input/Input.svelte';
	import Button from '$components/Button/Button.svelte';
	import '../../styles/tailwind.css';
	import { onMount } from 'svelte';

	let subject = '';
	let responseMessage = '';
	let isSubmitting = true;
	let isInputFocused = false;

	onMount(() => {
        handleSubmit(); 
    });

	const handleSubmit = async () => {
		const prompt = `
	If you have already offered me a socially charged game earlier, analyze my response to it and provide the result. After that, propose a new socially charged game to me. If you haven't given me any socially charged games in this session:
	Play with me a socially acute dilemma for the "Exploring Personality through Dilemmas" game. 
	The game aims to understand the deeper aspects of my personalities and moral principles. 
	Create an initial dilemma that requires me to make a decision and justify my choice.
	Start without any introductory words or preliminary explanations. Wait for my answer.
	After I reply, give an analysis of my answer on your previous dilemma and write the result, analyze my answer to tailor the plot of the next games to my individuality.
    `;

		const response = await fetch('http://localhost:3000/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: prompt })
		});

		const data = await response.json();
		responseMessage = data.reply;
	};

	const handleNext = async () => {
		const prompt = `After I reply, give an analysis of my answer on your previous dilemma and write the result, analyze my answer to tailor the plot of the next games to my individuality.`;

		const response = await fetch('http://localhost:3000/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: prompt })
		});

		const data = await response.json();
		responseMessage = data.reply;
	};

	const handleAction = async () => {
		if (isSubmitting) {
			await handleSubmit();
		} else {
			await handleNext();
		}
	};

	const handleInputFocus = () => {
        isInputFocused = true;
    };

</script>

<div
	class="mb-20 flex w-3/5 flex-col justify-center items-center text-center p-10"
>
	{#if responseMessage}
		<div style="white-space: pre-line;">{responseMessage}</div>
	{/if}

	<form class="mb-10 fixed bottom-0 z-50 w-3/5 h-16 bg-transparent">
		<label for="answer" class="mb-2 text-sm font-medium text-gray-900 sr-only">Answer</label>
		<div class="relative">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
			<Input
				size="large"
				type="text"
				id="answer"
				bind:value={subject}
				placeholder="Enter your answer..."
				on:focus={handleInputFocus}
			/>
			<Button type="submit" isFocused={isInputFocused} on:click={handleSubmit}
				><svg
					class="w-3 h-4 ms-0"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
					transform="rotate(-90)"
				>
					<path
						stroke={isInputFocused ? '#222222' : '#909191'}
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</Button>
		</div>
	</form>
</div>
