<script>
	import Page from '$pages/Page/Page.svelte';
	import '../lib/styles/tailwind.css';
	import { currentComponent } from '../stores';

	currentComponent.set('About'); 

</script>

<div class="bg-main h-[100dvh]">
	<div class="flex-none ">
		<Page /> 
	</div>
</div>
