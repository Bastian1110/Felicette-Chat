<script lang="ts">
	import { fly } from 'svelte/transition';
	export let icon: string = '';
	export let handleClose = () => {};
</script>

<div
	class="fixed z-50 top-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg flex items-center max-w-xs sm:max-w-md border-2 border-primary"
	style="min-width: 200px;"
	in:fly={{ x: 200, duration: 1000 }}
	out:fly={{ x: 200, duration: 1000 }}
>
	<button class="ml-auto mr-2" on:click={handleClose}>
		<svg
			class="w-6 h-6 text-accent"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</button>
	<div class="flex items-center space-x-2">
		<div class="flex-grow">
			<slot />
		</div>
		{#if icon}
			<div class="w-6 h-6 align-middle">
				{@html icon}
			</div>
		{/if}
	</div>
</div>
