<script lang="ts">
	import '../../styles/tailwind.css';
</script>

<header class="flex text-left p-5">
	<div>
		<div class="flex flex-row ">
			<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style="stop-color:#222222;stop-opacity:1" />
						<stop offset="100%" style="stop-color:#1ea7fd;stop-opacity:1" />
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
					fill="#1ea7fd"
					stroke="white"
					stroke-width="1.5"
				/>
			</svg>
			<h1 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white p-1">eGo</h1>
		</div>
	</div>
</header>
