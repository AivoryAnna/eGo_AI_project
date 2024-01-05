<script lang="ts">
	import './header.css';
	import Button from '../Button/Button.svelte';

	import { createEventDispatcher } from 'svelte';

	export let user: { name: string } | null = null;

	const dispatch = createEventDispatcher();

	function onLogin(event: MouseEvent) {
		dispatch('login', event);
	}
	function onLogout(event: MouseEvent) {
		dispatch('logout', event);
	}
	function onCreateAccount(event: MouseEvent) {
		dispatch('createAccount', event);
	}
</script>

<header>
	<div class="storybook-header">
		<div>
			<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style="stop-color:#91BAF8;stop-opacity:1" />
						<stop offset="100%" style="stop-color:#555AB9;stop-opacity:1" />
					</linearGradient>
					<filter id="f1" x="0" y="0" width="150%" height="150%">
						<feOffset result="offOut" in="SourceGraphic" dx="1" dy="1" />
						<feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
						<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
					</filter>
				</defs>
				<path
					d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2L2 10.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"
					fill="url(#grad1)"
					filter="url(#f1)"
				/>
				<path
					d="M20 3C22 5 22 9 20 11C18 13 14 13 12 11C10 9 10 5 12 3C14 1 18 1 20 3Z"
					fill="#555AB9"
					stroke="white"
					stroke-width="1.5"
				/>
			</svg>
			<h1>eGo</h1>
		</div>
		<div>
			{#if user}
				<span class="welcome">
					Welcome, <b>{user.name}</b>!
				</span>
				<Button type="button" size="small" on:click={onLogout} label="Log out" />
			{:else}
				<Button type="button" size="small" on:click={onLogin} label="Log in" />
				<Button type="button" primary size="small" on:click={onCreateAccount} label="Sign up" />
			{/if}
		</div>
	</div>
</header>
