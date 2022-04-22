<script>
	import {
		contractAddress,
		deployAddress,
		baseHookURL,
		baseAPIArray,
		baseAPIURL,
		baseHookArray,
		baseExplorerURL,
		baseExplorerArray,
		callbackURL
	} from '../stores';
	import { onMount } from 'svelte';

	let selectedOption;

	onMount(async function () {
		// Check if tx field is set in URL, if yes set appropriate variables and redirect to dashboard
	});

	async function deployContract() {
		
	}
</script>

<div class="container hero-dark text-light">
	<div class="row justify-content-between align-items-center">
		<div class="col-auto">
			<h1>Contract Deployment</h1>
			<p>This page guides through the setup of your contract.</p>
		</div>
		<div class="col-auto">
			<img
				src="smart-contracts.png"
				alt="dashboard icon"
				style="height:6em; filter: invert(100%)"
			/>
		</div>
	</div>
</div>

<div class="container hero text-dark">
	<div class="row justify-content-between align-items-center">
		<div class="col-auto">
			<h2>Deployment Steps</h2>

			<div class="row justify-content-between align-items-center">
				<div class="col explanation">
					<p>
						After pressing the button below, a transaction will be generated for you which contains
						the compiled <a
							href="https://github.com/ElrondNetwork/elrond-wasm-rs/tree/master/contracts/examples/multisig"
							target="_blank">contract code</a
						> in its data field.
					</p>
				</div>
				<div class="col explanation">
					<center><img src="code.png" alt="dashboard icon" style="height:12em;" /></center>
				</div>
			</div>
		</div>
	</div>
	<div class="row justify-content-between align-items-center">
		<div class="col-auto">
			<div class="row justify-content-between align-items-center">
				<div class="col explanation">
					<center
						><img
							src="contract.png"
							alt="dashboard icon"
							style="height:12em; filter:invert(5%)"
						/></center
					>
				</div>
				<div class="col explanation">
					<p>
						All you need to do is select the right network you want to deploy the contract to and
						proceed in the wallet interface to sign the transaction. <br />
						After signing the transaction you will be redirected to the multisig DApp.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="container hero-dark text-light">
	<div class="row justify-content-between align-items-center">
		<div class="col-auto">
			<h2 style="margin-bottom: 1em;">Select a network.</h2>
			<label for="Action option">Network</label>
			<select class="form-select" aria-label="Action option" bind:value={selectedOption}>
				<option selected>Select an option</option>
				<option value="0">Testnet</option>
				<option value="1">Devnet</option>
				<option value="2">Mainnet</option>
			</select>
		</div>
	</div>
	<div class="row justify-content-between align-items-center">
		<div class="col-auto">
			<button class="btn btn-light" style="margin-top: 1em;"  on:click={() => deployContract()}>Deploy Contract</button>
		</div>
	</div>
</div>

<style>
	.explanation {
		padding: 2em;
	}
</style>
