<script lang="ts">
	import '../Page/page.css';
	import Header from '../Header/Header.svelte';
	import Form from '../Form/Form.svelte';

	let user: { name: string } | null = null;
</script>

<article>
	<Header
		{user}
		on:login={() => (user = { name: 'Anna' })}
		on:logout={() => (user = null)}
		on:createAccount={() => (user = { name: 'Anna' })}
	/>

	<section class="storybook-page">
		<Form />
	</section>
</article>
