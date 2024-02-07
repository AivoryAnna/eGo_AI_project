<script lang="ts">
	import Input from '$components/Input/Input.svelte';
	import Button from '$components/Button/Button.svelte';
	import '../../styles/tailwind.css';
	import { onMount } from 'svelte';
	import { db } from '../../../firebase';
	import { v4 as uuidv4 } from 'uuid';
	import { updateDoc, doc, arrayUnion, serverTimestamp } from 'firebase/firestore';

	let sessionId = uuidv4();
	let subject = '';
	let responseMessage = '';
	let userResponse = '';
	let isInputFocused = false;

	onMount(() => {
		handleSubmit();
	});

	const handleSubmit = async () => {
		try {
			const sessionRef = doc(db, 'chatSessions', sessionId);
			// Обновляем документ, добавляя timestamp отдельно, если это необходимо для других целей.
			await updateDoc(sessionRef, {
				// другие обновления, если они есть
			});
			// Добавляем сообщение без serverTimestamp в arrayUnion
			await updateDoc(sessionRef, {
				messages: arrayUnion({
					// timestamp: serverTimestamp(), // Убираем это отсюда
					message: subject,
					sender: 'user'
				})
			});
		} catch (error) {
			console.error('Firestore :', error);
		}
		const prompt = `
	Play with me a socially acute dilemma for the "Exploring Personality through Dilemmas" game. 
	The game aims to understand the deeper aspects of my personalities and moral principles. 
	Create an initial dilemma that requires me to make a decision and justify my choice.
	Start without any introductory words or preliminary explanations. Wait for my answer.
	After I reply, give an analysis of my answer on your previous dilemma and write the result, analyze my answer to tailor the plot of the next games to my individuality.
    `;

		const response = await fetch('http://localhost:3000/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				sessionId: sessionId,
				message: prompt
			})
		});

		const data = await response.json();
		responseMessage = data.reply;
	};

	async function sendUserResponse() {
		try {
			const response = await fetch('http://localhost:3000/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sessionId: sessionId,
					message: userResponse // Отправляем ответ пользователя
				})
			});

			const data = await response.json();
			responseMessage = data.reply; // Обновляем сообщение с ответом от сервера/чата
		} catch (error) {
			console.error('Error sending user response:', error);
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

	<form class="mb-10 fixed bottom-0 z-50 w-3/5 h-16 bg-transparent" on:submit|preventDefault={sendUserResponse}>
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
