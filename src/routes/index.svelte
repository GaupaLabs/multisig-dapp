<script>

import { baseHookURL, callbackURL } from "../stores.js";

</script>
<div
	class="container hero text-dark image-hero"
	style="padding-top: 8em; padding-bottom: 8em; margin-top: 8em;"
>
	<div class="row justify-content-start align-items-center">
		<div class="col-lg-8">
			<h1>Welcome to your Multisig dApp</h1>
			<p class="large-text" style="margin-top: 2em;">
				Mange your multi-signature contracts on the Elrond blockchain.
			</p>
			<button class="btn btn-dark" style="margin-top: 1em;"
				><a class="text-light" href="#get-started">Get Started</a></button
			>
		</div>
		<div class="col-lg-4">
			<img src="lock.png" alt="dashboard icon" style="height: 20em;" />
		</div>
	</div>
</div>

<div class="container hero-light text-dark" style="padding-top: 12em;" id="get-started">
	<div class="row justify-content-center align-items-center">
		<div class="col-auto">
			<h2>Choose an Option to Get Started</h2>
		</div>
	</div>
	<div class="row justify-content-evenly align-items-stretch" style="margin-top: 4em;">
		<div class="col-lg-5 dark-card text-light centered info-card" on:click={() => window.open($baseHookURL + 'login?callbackUrl=' + $callbackURL, '_self')}>
			<center style="margin-top: 2em;">
				<img src="chain-interact.png" alt="dashboard icon" style="height:8em;" />
				<p class="large-text" style="margin-top: 2em;">Interact with existing contract</p>
			</center>
		</div>
		<div class="col-lg-2 centered">
			<h2 style="margin-top: 2em;">or</h2>
		</div>
		<div class="col-lg-5 dark-card text-light centered info-card">
			<center style="margin-top: 2em;">
				<img
					src="smart-contracts.png"
					alt="dashboard icon"
					style="height:8em; filter: invert(100%)"
				/>
				<p class="large-text" style="margin-top: 2em;">
					Deploy a new Multisig contract and start managing interactions with the contract.
				</p>
			</center>
		</div>
	</div>
</div>

<div class="container hero-dark text-light card-background" style="margin-top: 8em;">
	<div class="row justify-content-start align-items-start">
		<div class="col-lg-10">
			<p class="large-text">
				All Transactions generated by the Application have to be approved by you, in your wallet.
			</p>
			<p class="large-text">
				The code to deploy a new multisig contract is the template provided by the Elrond team,
				compiled and put into the right format for you to deploy the contract in one transaction.
			</p>
		</div>
	</div>
</div>

<div class="container hero text-dark" style="margin-top: 8em;">
	<div class="row justify-content-center align-items-center">
		<div class="col-auto">
			<h2>Additional Information and Resources</h2>
		</div>
	</div>

	<div class="row justify-content-evenly align-items-stretch" style="margin-top: 4em;">
		<div class="col-lg-3 info-card">
			<a href="https://github.com/GaupaLabs/multisig-dapp" target="_blank"
				><center
					><h4>Application Repo</h4>
					<img src="folder.png" alt="dashboard icon" style="height:8em;" /></center
				></a
			>
		</div>
		<div class="col-lg-3 info-card">
			<a
				href="https://github.com/ElrondNetwork/elrond-wasm-rs/tree/master/contracts/examples/multisig"
				target="_blank"
				><center
					><h4>Contract Code</h4>
					<img src="contract.png" alt="dashboard icon" style="height:8em;" /></center
				></a
			>
		</div>
		<div class="col-lg-3 info-card">
			<a href="https://gaupalabs.com" target="_blank">
				<center
					><h4>Gaupa Labs</h4>
					<img src="twitter.png" alt="dashboard icon" style="height:8em;" /></center
				></a
			>
		</div>
	</div>
</div>

<style>
	.dark-card {
		border-radius: 2em;
		background-color: var(--background-blue);
		padding: 1em;
	}

	.centered {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.large-text {
		font-size: 1.2em;
	}

	.image-hero {
		background-image: url('/background-hero-2.png');
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 100;
	}

	.card-background {
		background-image: url('/card-background-2.png');
		background-position: right;
		background-size: contain;
		background-repeat: no-repeat;
		z-index: 100;
	}

	.info-card {
		padding: 1em;
		transition: transform 0.2s;
	}

	.info-card:hover {
		transform: scale(1.05);
		cursor: pointer;
	}

	a {
		text-decoration: none;
		color: var(--background-blue);
	}
</style>
