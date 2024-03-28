<script lang="ts">
	import Input from '$components/Input/Input.svelte';
	import Button from '$components/Button/Button.svelte';
	import '../../styles/tailwind.css';
	import { useChat } from 'ai/svelte';
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { t, locale, locales } from '../../../locales/i18n';
	import { nanoid } from 'nanoid';
	const dispatch = createEventDispatcher();

	let specialMessage = writable(false);
	let newStart = false;
	const { messages, input, handleSubmit, append, isLoading, setMessages, reload } = useChat({
		id: nanoid()
	});
	let initialPromptSent = false;
	let showButton = writable(false);
	let userMessages = writable(0);
	let isInputFocused = false;
	let currentMessageIndex = 0;
	let currentSmMessageIndex = 0;
	let intervalId: number | undefined;
	let intervaSmlId: number | undefined;
	let firstRule = $t('rule.first');
	let secondRule = $t('rule.second');
	let thirdRule = $t('rule.third');
	let smfirstRule = $t('smrule.first');
	let smsecondRule = $t('smrule.second');
	let smthirdRule = $t('smrule.third');
	let quotes = [firstRule, secondRule, thirdRule];
	let smquotes = [smfirstRule, smsecondRule, smthirdRule];
	let userScrolled = false;
	let isProgrammaticScroll = true;

	$: if ($userMessages > 3) {
		$showButton = true;
	}

	function showNextMessage() {
		currentMessageIndex = (currentMessageIndex + 1) % quotes.length;
	}
	function showSmNextMessage() {
		currentSmMessageIndex = (currentSmMessageIndex + 1) % smquotes.length;
	}
	onMount(() => {
		intervaSmlId = setInterval(showSmNextMessage, 3000) as unknown as number;
	});
	onMount(() => {
		intervalId = setInterval(showNextMessage, 3000) as unknown as number;
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	onDestroy(() => {
		clearInterval(intervaSmlId);
	});

	function handleYesClick() {
		specialMessage.set(false);
		newStart = false;
		$userMessages = 0;
		currentMessageIndex = 0;
		localStorage.removeItem('chatMessages');
		setMessages([]);
		initializeSessionAndSendInitialMessage();
		dispatch('reset', {});
	}

	onMount(async () => {
		const storedMessages = localStorage.getItem('chatMessages');
		if (storedMessages !== null) {
			setMessages(JSON.parse(storedMessages));
		} else {
			initialPromptSent = true;
			await initializeSessionAndSendInitialMessage();
		}

		messages.subscribe(($messages) => {
			localStorage.setItem('chatMessages', JSON.stringify($messages));
		});
	});

	$: $specialMessage && initializeSessionAndSendInitialMessage();

	async function initializeSessionAndSendInitialMessage() {
		let initialPrompt: string =
			$locale === 'en'
				? `
        Do not use greetings or introductory words to start a conversation. Give me a  socially acute hard dilemma for the "Exploring Personality through Dilemmas" game. Dilemmas must be complex and put me in truly difficult social choices. If it is not first dillema, give me analyse of my previous answer. Every new dillema should be different and harder from the one given to me before. 
		If I change the topic of conversation or my response is not closely related to the context of your dilemma or I ask you something, tell me about it and give me a new dilemma immediatly without asking additional questions.  In any situation, present a new dilemma without asking if I need it.
        `
				: `Не используй приветствия или вводные слова, чтобы начать разговор, начинай сразу с текста дилеммы. Предложи мне социально острую сложную дилемму для игры "Исследование личности через дилеммы". Дилеммы должны быть сложными и ставить меня в реально тяжелые социальные выборы. Если это не первая дилемма, дай мне анализ моего предыдущего ответа. Каждая новая дилемма должна отличаться и  быть сложнее , чем была предложена мне ранее. 
		Если я изменю тему разговора или мой ответ не будет  связан с контекстом твоей дилеммы, или я задам тебе вопрос, скажи  мне об этом и дай мне новую дилемму, немедленно, не задавая дополнительных вопросов. В любой ситуации задавай новую диллему не спрашивая, нужна ли она мне.`;

		const unsubscribe = specialMessage.subscribe((value) => {
			if (value) {
				initialPrompt =
					$locale === 'en'
						? `Analyze our entire conversation. If my responses were brief, inform me about this and write a  psychological portrait about me based
				on your questions and my answers in context.   If I provided detailed answers, write an extensive psychological portrait about me based
				on your questions and my answers in context. If I conquered the same answer, provide short psychological portrait about me and indicate that I did not take the task seriously enough.   identify my strong character traits if I've demonstrated them, and leadership qualities if I've shown any.
				If my responses were off-topic or I kept asking questions and straying from the topic, let me know about this and suggest me play again.
 `
						: `Проанализируй весь наш разговор. Если мои ответы были краткими, сообщи мне об этом и напиши  психологический портрет обо мне, основываясь на твоих вопросах и моих ответах в контексте. Если я предоставил подробные ответы, напиши обширный психологический портрет обо мне, основываясь на твоих вопросах и моих ответах в контексте. Если я повторял один и тот же ответ, предоставь короткий психологический портрет обо мне и укажи, что я не отнесся к задаче достаточно серьезно. 
 Определи мои сильные черты характера, если я их продемонстрировал, и лидерские качества, если они у меня есть. 
 Если мои ответы были не по теме или я продолжал задавать вопросы и отходить от темы, дай мне знать об этом и предложите сыграть еще раз.`;
				newStart = true;
			}
		});

		await sendInitialMessage(initialPrompt);
		initialPromptSent = true;
		unsubscribe();
	}
	async function sendInitialMessage(messageToSend: string) {
		await append({ content: messageToSend, role: 'system' });
	}

	const handleInputFocus = () => {
		isInputFocused = true;
		userScrolled = false;
		isProgrammaticScroll = true;
	};

	async function handleReload() {
		try {
			await reload();
			console.log('Чат обновлен');
		} catch (error) {
			console.error('Ошибка при перезагрузке чата:', error);
		}
	}

	const handleButtonClick = () => {
		specialMessage.set(true);
	};

	$: $messages, afterUpdate(scrollToBottom);

	function scrollToBottom() {
		const chatContainer = document.getElementById('chat-container');
		const resultContainer = document.getElementById('result-container');

		if (chatContainer) {
			chatContainer.addEventListener('touchstart', () => {
				userScrolled = true;
				isProgrammaticScroll = false;
			});
			chatContainer.addEventListener('mousedown', () => {
				userScrolled = true;
				isProgrammaticScroll = false;
			});
			chatContainer.addEventListener('wheel', () => {
				userScrolled = true;
				isProgrammaticScroll = false;
			});

			if (
				!userScrolled &&
				isProgrammaticScroll &&
				chatContainer.scrollHeight > chatContainer.clientHeight
			) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}
		if (resultContainer) {
			resultContainer.addEventListener('touchstart', () => {
				userScrolled = true;
				isProgrammaticScroll = false;
			});
			resultContainer.addEventListener('mousedown', () => {
				userScrolled = true;
				isProgrammaticScroll = false;
			});
			resultContainer.addEventListener('wheel', () => {
				userScrolled = true;
				isProgrammaticScroll = false;
			});
			if (!userScrolled && isProgrammaticScroll) {
				resultContainer.scrollTop = 0;
			}
		}
	}

	$: $userMessages = $messages.filter((m) => m.role === 'user').length;
</script>

<div
	class="flex relative justify-start items-center w-3/5 sm:w-[100dvh] md:w-4/5 lg:w-4/5 pl-3 pr-3 sm:pl-5 sm:pr-5 p-3 sm:p-5"
>
	<div
		id={$specialMessage ? 'result-container' : 'chat-container'}
		class=" overflow-scroll scroll-smooth p-0 h-[calc(100%-22%)] mb-12 scrollbar-hide"
	>
		{#if !$specialMessage}
			{#each $messages as m (m.id)}
				{#if m.role !== 'system'}
					<div class="flex justify-start items-start text-start">
						<span class="pr-1 pt-2 font-bold">{m.role === 'user' ? $t('user.user') : 'eGo'}: </span>
						<span
							class={m.role === 'user' && $locale === 'en'
								? 'text-custom-blue pt-2'
								: m.role === 'user' && $locale === 'ru'
									? 'text-custom-blue pt-2 pl-1.5 '
									: 'pb-2 pt-2'}
						>
							{m.content}
							{#if m.role !== 'user' && m == $messages[$messages.length - 1] && $isLoading == false}
								<button on:click={handleReload} class="bg-transparent pl-2 m-0">
									<svg
										fill="#222222"
										height="12px"
										width="12px"
										version="1.1"
										id="Capa_1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
										viewBox="0 0 489.698 489.698"
										xml:space="preserve"
									>
										<g>
											<g>
												<path
													d="M468.999,227.774c-11.4,0-20.8,8.3-20.8,19.8c-1,74.9-44.2,142.6-110.3,178.9c-99.6,54.7-216,5.6-260.6-61l62.9,13.1
			c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-123.7-26c-7.2-1.7-26.1,3.5-23.9,22.9l15.6,124.8
			c1,10.4,9.4,17.7,19.8,17.7c15.5,0,21.8-11.4,20.8-22.9l-7.3-60.9c101.1,121.3,229.4,104.4,306.8,69.3
			c80.1-42.7,131.1-124.8,132.1-215.4C488.799,237.174,480.399,227.774,468.999,227.774z"
												/>
												<path
													d="M20.599,261.874c11.4,0,20.8-8.3,20.8-19.8c1-74.9,44.2-142.6,110.3-178.9c99.6-54.7,216-5.6,260.6,61l-62.9-13.1
			c-10.4-2.1-21.8,4.2-23.9,15.6c-2.1,10.4,4.2,21.8,15.6,23.9l123.8,26c7.2,1.7,26.1-3.5,23.9-22.9l-15.6-124.8
			c-1-10.4-9.4-17.7-19.8-17.7c-15.5,0-21.8,11.4-20.8,22.9l7.2,60.9c-101.1-121.2-229.4-104.4-306.8-69.2
			c-80.1,42.6-131.1,124.8-132.2,215.3C0.799,252.574,9.199,261.874,20.599,261.874z"
												/>
											</g>
										</g>
									</svg>
								</button>
							{/if}
						</span>
					</div>
				{/if}
			{/each}
		{/if}
		{#if $messages.length > 1 && $specialMessage}
			{#if $isLoading}
				<div
					role="status"
					class="flex absolute l-[50%] t-[50%] flex-col justify-center h-[calc(100%-20%)] items-center w-[100%] sm:w-[91.5%] md:w-[98.5%] lg:w-[100%]"
				>
					<svg
						aria-hidden="true"
						class="inline w-20 h-20 text-font animate-spin fill-custom-blue"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<div class="flex justify-center text-center p-5 sm:hidden">
						{quotes[currentMessageIndex]}
					</div>
					<div class="flex justify-center text-center p-2 md:hidden lg:hidden xl:hidden">
						{smquotes[currentSmMessageIndex]}
					</div>
				</div>
			{/if}

			{#if !$isLoading}
				<div class="mt-[8%] flex flex-col -b-2 p-10 sm:p-2 sm:h-[calc(100%-35%)]">
					<span class="pr-1 pt-2 font-bold">
						{$messages[$messages.length - 1].role === 'user' ? $t('user.user') : $t('user.eGo')}:
					</span>
					<span class="pb-2 pt-2">
						{$messages[$messages.length - 1].content}
					</span>
				</div>
			{/if}
		{/if}
		{#if $showButton && $isLoading == false && !newStart}
			<div class="flex justify-start items-center text-start pl-[4.5%] sm:pl-[9%]">
				<h5 class="text-md tracking-tight text-font sm:hidden md:hidden">
					{$t('portrait.exploration')}
				</h5>
				<h5 class="text-md tracking-tight text-font lg:hidden xl:hidden">
					{$t('smportrait.exploration')}
				</h5>
				<div
					role="button"
					tabindex="0"
					aria-label="Activate to get the personality exploration portrait"
					class="cursor-pointer hover:opacity-100 opacity-50 ml-2 end-1.5 bottom-1.5 px-4 py-2 rounded-lg bg-custom-blue text-md text-left tracking-tight text-font"
					on:click={handleButtonClick}
				>
					{$t('get.portrait')}
				</div>
			</div>
		{/if}
	</div>

	<form
		class="mb-10 sm:mb-10 md:mb-10 lg:mb-[70px] fixed justify-center items-center self-center bottom-0 z-100 w-3/5 min-h-16 max-h-[30%] bg-transparent sm:w-[90%] md:w-[80%] lg:w-4/5 sm:pl-0 sm:pr-0 md:pl-0 md:pr-0"
		on:submit={handleSubmit}
	>
		{#if newStart && $isLoading == false}
			<div class="relative mb-[7%] sm:mb-0 flex justify-center self-center items-center w-[100%]">
				<div
					tabindex="0"
					role="button"
					class="inline-flex items-center w-[30%] sm:w-[60%] md:w-[40%] lg:w-[25%] p-5 sm:p-3 md:p-3 lg:p-4 text-font bg-white border border-custom-blue rounded-lg cursor-pointer hover:text-font hover:bg-main"
				>
					<div class="block text-left justify-self-center" on:click={handleYesClick}>
						<div class="w-full text-lg font-semibold">{$t('more.play')}</div>
						<div class="w-full">{$t('start.again')}</div>
					</div>

					<svg
						class="w-5 h-5 ms-3 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="#222222"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</div>
			</div>
		{/if}
		{#if $isLoading == false && !newStart}
			<div class="relative justify-center items-center mr-auto ml-auto bg-transparent w-full">
				<Input
					size="large"
					type="text"
					id="answer"
					bind:value={$input}
					placeholder={$t('enter.answer')}
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
