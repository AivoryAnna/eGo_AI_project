<script lang="ts">
	import Input from '$components/Input/Input.svelte';
	import Button from '$components/Button/Button.svelte';
	import '../../styles/tailwind.css';
	import { useChat } from 'ai/svelte';
	import { onMount, afterUpdate } from 'svelte';

	const { messages, input, handleSubmit, append, isLoading } = useChat();

	onMount(() => {
		initializeSessionAndSendInitialMessage();
	});

	async function initializeSessionAndSendInitialMessage() {
		const initialPrompt: string = `
        Do not use greetings or introductory words to start a conversation. Give the user a socially acute dilemma for the "Exploring Personality through Dilemmas" game. After the user's response, provide analysis of the user's response to the previous dilemma you presented and pose a new social dilemma, different from the one given to them before. If the user changes the topic of conversation or the user's response is not closely related to the context of your dilemma or user asks you something, write to the user: "Let's not deviate from the topic of our conversation." and give a new dilemma.
        `;
		await sendInitialMessage(initialPrompt);
	}

	async function sendInitialMessage(messageToSend: string) {
		await append({ content: messageToSend, role: 'assistant' }); 
	}

	let isInputFocused = false;

	const handleInputFocus = () => {
		isInputFocused = true;
	};

	$: $messages, afterUpdate(scrollToBottom);

	function scrollToBottom() {
		const chatContainer = document.getElementById('chat-container');
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
</script>


<div class="flex justify-center items-center w-3/5  ">
	<div id="chat-container" class="overflow-scroll  p-0 min-h-4 max-h-[510px] w-full ">
		{#each $messages.slice(1) as m (m.id)} 
			<div class='flex justify-start items-start text-start'>
				<span class="pr-0.5">{m.role === 'user' ? '👤' : '🤖'}: </span>
				<span class:text-blue-400={m.role === 'user'}>
					{m.content}
				</span>
			</div>
		{/each}
	</div>
	<form class="mb-10 fixed bottom-0 z-50 w-3/5 h-16 bg-transparent" on:submit={handleSubmit}>
		<label for="answer" class="mb-2 text-sm font-medium text-gray-900 sr-only">Answer</label>
		{#if $isLoading == false}
		<div class="relative">
			<!-- <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div> -->
			<Input
				size="large"
				type="text"
				id="answer"
				bind:value={$input}
				placeholder="Enter your answer..."
				on:focus={handleInputFocus}
			/>
			<Button type="submit" isFocused={isInputFocused}
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
		{/if}
	</form>
</div>
