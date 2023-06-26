<script lang="ts">
	import { auth } from '../stores';
	import { fly, fade } from 'svelte/transition';
	import Toast from './Toast.svelte';

	let username = '';
	let password = '';
	let loggedIn = false;

	let error = false;
	let errorMessage = 'An error has ocurred!';

	async function handleSubmit() {
		if (!username) {
			error = true;
			errorMessage = 'Missing username';
			return;
		}
		if (!password) {
			error = true;
			errorMessage = 'Missing password';
			return;
		}
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			const data = await response.json();
			if (response.ok) {
				auth.setUser(data.userData);
				auth.setToken(data.token);
				loggedIn = true;
			} else {
				error = true;
				errorMessage = data.message;
			}
		} catch (err) {
			error = true;
		}
	}

	function closeToast() {
		error = false;
	}
</script>

{#if error}
	<Toast handleClose={closeToast}>{errorMessage}</Toast>
{/if}

<div
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
	class="z-10 fixed -left-0 top-0 grid h-full w-full grid-cols-12 bg-[#00000f] bg-opacity-80"
>
	<div class="fixed inset-0 z-20" />
	{#if !loggedIn}
		<div
			class=" z-50 col-span-12 md:col-span-4 md:mx-0 mx-2 md:col-start-5 mt-[6rem] -mb-4 md:mt-[7rem] md:mb-[7rem] rounded-2xl bg-white shadow-md text-text border-2 border-accent md:max-h-[26rem]"
			in:fly={{ y: 200, duration: 1000 }}
			out:fly={{ y: -200, duration: 1000 }}
		>
			<h1 class="font-bold text-5xl mt-10 mx-10 mb-2">Hello Stranger!</h1>
			<div class="text-slate-500 text-md mx-10">
				Please verify your identity, so we can let you play with Felicette.
			</div>
			<form on:submit={handleSubmit}>
				<span class="text-primary block mx-10 mt-4">Username</span>
				<input
					bind:value={username}
					placeholder="xXCoolNameXx"
					type="text"
					class="border-2 border-primary mx-10 p-1 w-[70%] rounded-lg"
				/>
				<span class="text-primary block mx-10 mt-2">Password</span>
				<input
					bind:value={password}
					placeholder=" - - - - - - - -"
					type="password"
					class="border-2 border-primary mx-10 p-1 w-[70%] rounded-lg"
				/>
				<button
					type="submit"
					class="font-semibold bg-primary text-[#ffffff] rounded-lg px-4 py-2 shadow-lg mt-4 float-right mr-8"
					>login</button
				>
			</form>
		</div>
	{/if}
</div>
