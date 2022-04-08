<script>
	import { page } from '$app/stores';
	import { contractAddress } from '../stores.js';
	import { bech32 } from 'bech32';

	const userAddress = $page.url.searchParams.get('address');
	const lastTx = $page.url.searchParams.get('txHash');

	let selectedTab = 'send';
	let receiverAddress = 'erd1';
	let amountEGLD = 0;
	let proposalNo = 0;
	let proposedAddress = '';

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

	function action() {}
	function proposeManage() {}
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
					<div class="col-lg-6">
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
					<div class="col-lg-6">
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
				<div class="row form-wrapper align-items-end">
					<div class="col-lg-9">
						<h4>Sign, unsign and execute actions.</h4>
						<p style="margin-top: 2em;">Choose an action and a proposal to use the action on.</p>
						<label for="Action option">Action</label>
						<select class="form-select" aria-label="Action option">
							<option selected>Select an option</option>
							<option value="1">Sign</option>
							<option value="2">Unsign</option>
							<option value="3">Execute</option>
						</select>
					</div>
					<div class="col-lg-3">
						<label for="amount">Proposal Number</label>
						<div class="input-group">
							<input
								type="number"
								class="form-control"
								id="amount"
								placeholder="Proposal Number"
								aria-label="Proposal Number"
								bind:value={proposalNo}
							/>
						</div>
					</div>
				</div>
				<div class="row" style="padding: 0 2em 2em 2em;">
					<div class="col">
						<button class="btn btn-dark" on:click={() => action()}>Execute Action</button>
					</div>
				</div>
			{:else if selectedTab === 'manage'}
				<div class="row form-wrapper align-items-end">
					<div class="col">
						<h4>Manage board members, quorum and action proposer.</h4>
						<p style="margin-top: 2em;">Choose the action and address the proposal concerns.</p>
					</div>
				</div>
				<div class="row form-wrapper align-items-end" style="margin-top: -4em;">
					<div class="col-lg-3">
						<label for="Action option">Action</label>
						<select class="form-select" aria-label="Action option">
							<option selected>Select an option</option>
							<option value="1">Add Board Member</option>
							<option value="2">Add Proposer</option>
							<option value="3">Remove User</option>
							<option value="4">Change Quorum</option>
						</select>
					</div>
					<div class="col-lg-9">
						<label for="amount">Address</label>
						<div class="input-group">
							<input
								type="text"
								class="form-control"
								id="address"
								placeholder="Address"
								aria-label="Address"
								bind:value={proposedAddress}
							/>
							<span class="input-group-text">ERD Adress</span>
						</div>
					</div>
				</div>
				<div class="row" style="padding: 0 2em 2em 2em;">
					<div class="col">
						<button class="btn btn-dark" on:click={() => proposeManage()}>Propose Change</button>
					</div>
				</div>
			{:else if selectedTab === 'deposit'}
				<div class="row form-wrapper">
					<div class="col-auto">
						<h4>Add funds to the contract.</h4>
						<p style="margin-top: 2em;">
							Choose an amount to be sent to the <strong>deposit</strong> endpoint of the contract.
						</p>
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
						<button class="btn btn-dark" on:click={() => proposeSending()}>Send EGLD</button>
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
