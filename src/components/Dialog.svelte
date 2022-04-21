<script>
	import { popupVisible, contractAddress, baseHookURL, baseAPIArray, baseAPIURL, baseHookArray, baseExplorerURL, baseExplorerArray } from '../stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let address;
	let selectedOption;

	async function walletLogin() {
		contractAddress.set(address);
        baseHookURL.set($baseHookArray[selectedOption]);
        baseAPIURL.set($baseAPIArray[selectedOption]);
        baseExplorerURL.set($baseExplorerArray[selectedOption]);
		await dispatch('toggle');
		popupVisible.set(false);
	}
</script>

<div
	class="container-d full-screen-bg"
	on:click={() => {
		popupVisible.set(false);
	}}
>
	<div class="row text-light justify-content-center align-items-center">
		<div class="col-auto dialog" on:click|stopPropagation>
			<h2 style="margin-bottom: 1em;">Enter the contract address and network.</h2>

			<label for="receiver-address">Contract Address</label>
			<input
				type="text"
				class="form-control"
				id="receiver-address"
				placeholder="Address"
				aria-label="Address"
				bind:value={address}
			/>

			<label for="Action option" style="margin-top: 1em;">Action</label>
			<select class="form-select" aria-label="Action option" bind:value={selectedOption}>
				<option selected>Select an option</option>
				<option value=0>Testnet</option>
				<option value=1>Devnet</option>
				<option value=2>Mainnet</option>
			</select>

			<button class="btn btn-success" style="margin-top: 1.5em;" on:click={() => walletLogin()}
				>Connect</button
			>
			<button
				class="btn btn-danger"
				style="margin-top: 1.5em;"
				on:click={() => {
					popupVisible.set(false);
				}}>Close</button
			>
		</div>
	</div>
</div>

<style>
	.full-screen-bg {
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.555);
		z-index: 10;
	}

	.dialog {
		border-radius: 2em;
		padding: 4em;
		background: none;
		background-color: var(--background-blue);
		position: relative;
		margin: 20% auto;
		z-index: 20;
	}
</style>
