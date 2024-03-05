<script>
	import Page from '$pages/Page/Page.svelte';
	import '../lib/styles/tailwind.css';
	import Header from '$components/Header/Header.svelte';
</script>

<div class="bg-main overflow-hidden flex flex-col h-screen">
	<div class="flex-none">
		<Header />
	</div>
	<div class="flex-none h-full">
		<Page />
	</div>
</div>
