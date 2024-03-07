<script lang="ts">
	import Input from '$components/Input/Input.svelte';
	import Button from '$components/Button/Button.svelte';
	import '../../styles/tailwind.css';
	import { useChat } from 'ai/svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { writable } from 'svelte/store';

	let inputElementRef: { current: HTMLInputElement | null } = { current: null };
	let specialMessage = writable(false);
	const { messages, input, handleSubmit, append, isLoading } = useChat();

	onMount(() => {
		if (inputElementRef.current) {
			inputElementRef.current.focus();
		}
	});

	onMount(() => {
		initializeSessionAndSendInitialMessage();
	});

	async function initializeSessionAndSendInitialMessage() {
		const initialPrompt: string = `
        Do not use greetings or introductory words to start a conversation. Give the user a socially acute hard dilemma for the "Exploring Personality through Dilemmas" game. After the user's response, provide analysis of the user's response to the previous dilemma you presented and pose a new social dilemma, different and harder from the one given to them before. If the user changes the topic of conversation or the user's response is not closely related to the context of your dilemma or user asks you something, ask  the user to not deviate from the topic of the conversation and give a new dilemma. If you notice that the user has responded to 3 dilemmas within the context write him:  Are you ready to get your full result?. If the user agrees, compose their psychological profile by analyzing the entire conversation.
        `;
		await sendInitialMessage(initialPrompt);
	}
	async function sendInitialMessage(messageToSend: string) {
		await append({ content: messageToSend, role: 'assistant' });
	}

	let isInputFocused = false;

	const handleInputFocus = () => {
		isInputFocused = true;
		if (inputElementRef.current) {
			inputElementRef.current.focus();
		}
	};

	$: $messages, afterUpdate(scrollToBottom);

	function scrollToBottom() {
		const chatContainer = document.getElementById('chat-container');
		if (chatContainer && chatContainer.scrollHeight > chatContainer.clientHeight) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
</script>

<div
	class="flex justify-center items-center w-3/5 sm:w-[100dvh] md:w-4/5 lg:w-4/5 pl-3 pr-3 sm:pl-5 sm:pr-5"
>
	<div id="chat-container" class="overflow-scroll scroll-smooth p-0 h-[calc(100%-25%)] mb-12">
		{#each $messages.slice(1) as m (m.id)}
			<div class="flex justify-start items-start text-start">
				<span class="pr-1 pt-2 font-bold">{m.role === 'user' ? 'You' : 'eGo'}: </span>
				<span class={m.role === 'user' ? 'text-custom-blue pt-2' : 'pb-2 pt-2'}>
					{m.content}
				</span>
			</div>
		{/each}
	</div>
	<form
		class="mb-10 sm:mb-10 md:mb-10 lg:mb-[70px] fixed bottom-0 z-50 w-3/5 h-16 bg-transparent sm:w-screen md:w-4/5 lg:w-4/5 sm:pl-3 sm:pr-3 md:pl-3 md:pr-3"
		on:submit={handleSubmit}
	>
		<label for="answer" class="mb-2 text-sm font-medium text-gray-900 sr-only">Answer</label>
		{#if $isLoading == false}
			<div class="relative">
				<Input
					size="large"
					type="text"
					id="answer"
					bind:value={$input}
					bind:innerRef={inputElementRef}
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
