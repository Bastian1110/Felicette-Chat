<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import { auth } from '$lib/stores';
	import { useChat } from 'ai/svelte';

	let testMessages = [
		{ role: 'User', content: 'Hello! How are you doing today?' },
		{ role: 'Felicette', content: 'Find! Thank you, how can I assist you today?' }
	];

	let testInput = '';
	let isFelicette = false;
	const testHandleSubmit = () => {
		testMessages = [
			...testMessages,
			{ role: isFelicette ? 'Felicette' : 'User', content: testInput }
		];
		testInput = '';
		isFelicette = !isFelicette;
	};

	const { messages, handleSubmit, input } = useChat({
		api: '/chat'
	});

	$: loggedIn = $auth.token !== null && $auth.user != null;
</script>

{#if !loggedIn}
	<Login />
{/if}

<main class="grid grid-cols-8">
	<button
		on:click={() => {
			auth.logout();
		}}
		class="col-span-1 h-10 rounded-xl m-6 font-semibold text-primary border-2 border-primary"
		>logout</button
	>
	<ul
		class="col-span-8 md:col-start-2 md:col-span-5 mx-4 h-[82vh] md:h-[84vh] bg-primary-obscure rounded-xl mb-4 mt-8 max-h-[84vh] overflow-y-auto"
	>
		{#each testMessages as message}
			<li class="text-text text-sm md:text-lg mx-6 my-4">
				<span class="capitalize font-bold">{message.role} :</span>
				{message.content}
			</li>
		{/each}
	</ul>

	<form
		on:submit={testHandleSubmit}
		class="col-span-8 md:col-start-2 md:col-span-5 mx-4 grid grid-cols-6 h-[5vh] gap-4"
	>
		<textarea
			bind:value={testInput}
			class="col-span-4 md:col-span-5 p-2 rounded-lg bg-background border-2 border-primary outline-none shadow-lg overflow-x-auto text-text"
		/>
		<button
			type="submit"
			class="font-semibold md:col-span-1 col-span-2 bg-primary text-[#ffffff] rounded-lg px-4 py-2 shadow-lg"
			>Send</button
		>
	</form>
</main>

<style lang="postcss">
	:global(html) {
		background: #f5f5ff;
		font-family: 'Albert Sans Variable', sans-serif;
	}
</style>
