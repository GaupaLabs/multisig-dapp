<script>
	import { page } from '$app/stores';
	import { contractAddress } from '../stores.js';
	import { bech32 } from 'bech32';

	const userAddress = $page.url.searchParams.get('address');
	const lastTx = $page.url.searchParams.get('txHash');

	let selectedTab = 'send';
	let receiverAddress = 'erd1';
	let amountEGLD = 0;

	function proposeSending() {
		let parsedAddress = convertAddressToHex(receiverAddress);
		let parsedEGLDAmount = amountEGLD * 10 ** 18;

		let request =
			'https://devnet-wallet.elrond.com/hook/transaction?receiver=' +
			$contractAddress +
			'&value=0&data=proposeTransferExecute@' +
			parsedAddress +
			'@' +
			parsedEGLDAmount.toString(16) +
			'&callbackUrl=http://localhost:3000/dashboard';

		console.log(request);

		window.open(request);
	}

	function convertAddressToHex(address) {
		let parsedWords = bech32.fromWords(bech32.decode(address).words);
		let parsedAddress = '';

		parsedWords.forEach((item, _index) => {
			let converted = String(item.toString(16)).padStart(2, '0');
			parsedAddress += converted;
		});

		return parsedAddress;
	}
</script>

<div class="container hero-dark text-light">
	<div class="row justify-content-center align-items-center">
		<div class="col">
			<h1>Dashboard</h1>
			<p>Find all the contract interaction shortcuts on this page.</p>
		</div>
	</div>
	<div class="row justify-content-center align-items-center" style="margin-top: 2em;">
		<div class="col">
			<h4>Your Address</h4>
			<p class="address-card text-dark">{userAddress}</p>
		</div>
	</div>
	<div class="row justify-content-center align-items-center" style="margin-top: 2em;">
		<div class="col">
			<h4>Contract Address</h4>
			<p class="address-card text-dark">{$contractAddress}</p>
		</div>
	</div>
</div>

<div class="container hero text-dark" style="margin-top: 4em;">
	<div class="row">
		<div class="col">
			<h3>Propose a new action</h3>
			<ul class="nav nav-tabs" style="margin-top: 2em;">
				<div class="nav-item" on:click={(e) => (selectedTab = 'send')}>
					<p class="nav-link" class:active={selectedTab === 'send'}>Send EGLD</p>
				</div>
				<div class="nav-item" on:click={(e) => (selectedTab = 'actions')}>
					<p class="nav-link" class:active={selectedTab === 'actions'}>Actions</p>
				</div>
				<div class="nav-item" on:click={(e) => (selectedTab = 'manage')}>
					<p class="nav-link" class:active={selectedTab === 'manage'}>Manage Members</p>
				</div>
				<div class="nav-item" on:click={(e) => (selectedTab = 'deposit')}>
					<p class="nav-link" class:active={selectedTab === 'deposit'}>Deposit Funds</p>
				</div>
			</ul>
			{#if selectedTab === 'send'}
				<div class="row form-wrapper align-items-end">
					<div class="col">
						<h4>Propose Sending EGLD</h4>
						<p style="margin-top: 2em;">Enter address and amount to be sent.</p>
						<label for="receiver-address">Receiver Address</label>
						<input
							type="text"
							class="form-control"
							id="receiver-address"
							placeholder="Address"
							aria-label="Address"
							bind:value={receiverAddress}
						/>
					</div>
					<div class="col">
						<label for="amount">Amount</label>
						<div class="input-group">
							<input
								type="number"
								class="form-control"
								id="amount"
								placeholder="Amount"
								aria-label="Amount"
								bind:value={amountEGLD}
							/>
							<span class="input-group-text">EGLD</span>
						</div>
					</div>
				</div>
				<div class="row" style="padding: 0 2em 2em 2em;">
					<div class="col">
						<button class="btn btn-dark" on:click={() => proposeSending()}
							>Propose sending EGLD</button
						>
					</div>
				</div>
			{:else if selectedTab === 'actions'}
				<div class="row form-wrapper">
					<div class="col">
						<p>Sign, unsign and execute actions.</p>
					</div>
				</div>
			{:else if selectedTab === 'manage'}
				<div class="row form-wrapper">
					<div class="col">
						<p>Manage the contract.</p>
					</div>
				</div>
			{:else if selectedTab === 'fuinds'}
				<div class="row form-wrapper">
					<div class="col">
						<p>Distribute the currently available funds.</p>
					</div>
				</div>
			{:else}
				<div class="row form-wrapper">
					<div class="col">
						<p>No category selected.</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if lastTx}
	<div class="container hero text-dark" style="margin-top: -4em;">
		<div class="row">
			<div class="col">
				<h3>Last Transaction</h3>
				<p style="margin-top: 1em;">Transaction hash: {lastTx}</p>
				<p>
					<a href="https://devnet-explorer.elrond.com/transactions/{lastTx}" target="_blank"
						>View in explorer</a
					>
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.address-card {
		border-radius: 1em;
		background-color: var(--background-white);
		padding: 1em;
	}

	.nav-item:hover {
		cursor: pointer;
	}

	.form-wrapper {
		padding: 2em;
	}
</style>
