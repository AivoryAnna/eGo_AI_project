<script lang="ts">
    import Input from '$components/Input/Input.svelte';
    import Button from '$components/Button/Button.svelte';
    import '../../styles/tailwind.css';
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';

    let sessionId = uuidv4();
    let responseMessage = '';
    let userResponse = '';
    let isInputFocused = false;

    onMount(() => {
        initializeSessionAndSendInitialMessage();
    });

    async function initializeSessionAndSendInitialMessage() {
        const prompt = `
            Play with me a socially acute dilemma for the "Exploring Personality through Dilemmas" game...
        `;
        await sendUserResponse(prompt);
    }

    async function sendUserResponse(messageToSend?: string) { 
        const message = messageToSend || userResponse; 
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sessionId,
                    message: message,
                })
            });

            const data = await response.json();
            responseMessage = data.reply;
        } catch (error) {
            console.error('Error sending user response:', error);
        }
    }

    
    async function handleSubmit(event: Event) {
        event.preventDefault(); 
        if (userResponse.trim() !== '') {
            await sendUserResponse(userResponse); 
            userResponse = ''; 
        }
    }

    const handleInputFocus = () => {
        isInputFocused = true;
    };
</script>




<div class="mb-20 flex w-3/5 flex-col justify-center items-center text-center p-10">
	{#if responseMessage}
		<div style="white-space: pre-line;">{responseMessage}</div>
	{/if}

	<form class="mb-10 fixed bottom-0 z-50 w-3/5 h-16 bg-transparent" on:submit|preventDefault={handleSubmit}>
		<label for="answer" class="mb-2 text-sm font-medium text-gray-900 sr-only">Answer</label>
		<div class="relative">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
			<Input
				size="large"
				type="text"
				id="answer"
				bind:value={userResponse}
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
	</form>
</div>
