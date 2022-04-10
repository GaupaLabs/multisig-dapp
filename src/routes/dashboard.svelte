<script>
	import { page } from '$app/stores';
	import { contractAddress } from '../stores.js';
	import { onMount } from 'svelte';
	import SendForm from '../components/SendForm.svelte';
	import ActionsForm from '../components/ActionsForm.svelte';
	import ManageForm from '../components/ManageForm.svelte';
	import DepositForm from '../components/DepositForm.svelte';
	import { each } from 'svelte/internal';

	const userAddress = $page.url.searchParams.get('address');
	const lastTx = $page.url.searchParams.get('txHash');

	let walletAddress = '';
	let walletBalance = 0;
	let walletNonce = 0;
	let multisigAddress = '';
	let multisigBalance = 0;
	let multisigRewards = 0;
	let lastTransactions = [];

	let selectedTab = 'send';

	onMount(async function () {
		if (userAddress) {
			const response = await fetch('https://devnet-api.elrond.com/accounts/' + userAddress);
			const userData = await response.json();

			walletAddress = userData['address'];
			walletBalance = userData['balance'] / 10 ** 18;
			walletNonce = userData['nonce'];
		}

		if ($contractAddress) {
			const response = await fetch('https://devnet-api.elrond.com/accounts/' + $contractAddress);
			const contractData = await response.json();

			multisigAddress = contractData['address'];
			multisigBalance = contractData['balance'] / 10 ** 18;
			multisigRewards = contractData['developerReward'] / 10 ** 18;

			const txResponse = await fetch(
				'https://devnet-api.elrond.com/accounts/' +
					$contractAddress +
					'/transactions?size=5&withLogs=false'
			);
			const txData = await txResponse.json();

			txData.forEach((element) => {
				let tx = {
					txHash: element['txHash'],
					value: element['value'] / 10 ** 18,
					status: element['status'],
					timestamp: element['timestamp'],
					sender: element['sender']
				};

				if (element['action']) {
					tx['action'] = element['action']['name'];
				}

				lastTransactions = [...lastTransactions, tx];
			});
		}

		if (lastTx) {
		}
	});
</script>

<div class="container hero-dark text-light">
	<div class="row justify-content-center align-items-center">
		<div class="col">
			<h1>Dashboard</h1>
			<p>Find all the contract interaction shortcuts on this page.</p>
		</div>
	</div>
</div>

<div class="container hero-dark text-light">
	<div class="row justify-content-center align-items-stretch">
		<div class="col-lg-6">
			<h4>Your Account</h4>
			<div class="account-card text-dark">
				<h5>Address</h5>
				<p class="long-field">{walletAddress}</p>
				<h5>Balance</h5>
				<p>{walletBalance} EGLD</p>
				<h5>Current Nonce</h5>
				<p>{walletNonce}</p>
			</div>
		</div>
		<div class="col-lg-6">
			<h4>Contract</h4>
			<div class="account-card text-dark">
				<h5>Address</h5>
				<p class="long-field">{multisigAddress}</p>
				<h5>Balance</h5>
				<p>{multisigBalance} EGLD</p>
				<h5>Developer Rewards</h5>
				<p>{multisigRewards} EGLD</p>
			</div>
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
				<SendForm />
			{:else if selectedTab === 'actions'}
				<ActionsForm />
			{:else if selectedTab === 'manage'}
				<ManageForm />
			{:else if selectedTab === 'deposit'}
				<DepositForm />
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

{#if lastTransactions.length > 0}
	<div class="container hero-dark text-light" style="margin-top: 2em;">
		<div class="row">
			<div class="col">
				<h3>Last Transactions with Smart Contract</h3>

				{#each lastTransactions as tx}
					<div class="account-card text-dark" style="margin-top: 2em;">
						<h5 class="long-field">Hash: {tx['txHash']}</h5>
						<p class="long-field" style="margin-top: 1em;">Sender: {tx['sender']}</p>
						<p>Status: {tx['status']}</p>
						<p>Value: {tx['value']}</p>

						{#if tx['action']}
							<p>Action: {tx['action']}</p>
						{/if}

						<p>
							<a
								href="https://devnet-explorer.elrond.com/transactions/{tx['txHash']}"
								target="_blank">View in explorer</a
							>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.account-card {
		border-radius: 1em;
		background-color: var(--background-white);
		padding: 1.5em 1.5em 0.5em 1.5em;
	}

	.nav-item:hover {
		cursor: pointer;
	}

	.form-wrapper {
		padding: 2em;
	}

	.long-field {
		overflow: auto;
	}
</style>
