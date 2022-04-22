<script>
	import { page } from '$app/stores';
	import { contractAddress, baseAPIURL, baseExplorerURL } from '../stores.js';
	import { onMount } from 'svelte';
	import SendForm from '$lib/SendForm.svelte';
	import ActionsForm from '$lib/ActionsForm.svelte';
	import ManageForm from '$lib/ManageForm.svelte';
	import DepositForm from '$lib/DepositForm.svelte';
	import Dialog from '$lib/Dialog.svelte';
	import { popupVisible } from '../stores.js';

	let userAddress;
	let lastTx;
	let walletAddress = '';
	let walletBalance = 0;
	let walletNonce = 0;
	let multisigAddress = '';
	let multisigBalance = 0;
	let multisigRewards = 0;
	let lastTransactions = [];

	let selectedTab = 'send';

	onMount(async function () {
		if ($contractAddress === 'erd1q') {
			popupVisible.set(true);
		} else {
			popupVisible.set(false);
			await connectContract();
		}
	});

	async function connectContract() {
		userAddress = $page.url.searchParams.get('address');

		console.log($contractAddress);
		if (userAddress) {
			let response = await fetch($baseAPIURL + 'accounts/' + userAddress);
			let userData = await response.json();

			console.log(userData);

			while (userData['statusCode'] == 404) {
				response = await fetch($baseAPIURL + 'accounts/' + userAddress);
				userData = await response.json();
			}

			walletAddress = userData['address'];
			walletBalance = userData['balance'] / 10 ** 18;
			walletNonce = userData['nonce'];
		}

		lastTx = $page.url.searchParams.get('txHash');

		if ($contractAddress) {
			let response = await fetch($baseAPIURL + 'accounts/' + $contractAddress);
			let contractData = await response.json();

			while (contractData['statusCode'] == 404) {
				response = await fetch($baseAPIURL + 'accounts/' + $contractAddress);
				contractData = await response.json();
			}

			console.log(contractData);

			multisigAddress = contractData['address'];
			multisigBalance = contractData['balance'] / 10 ** 18;
			multisigRewards = contractData['developerReward'] / 10 ** 18;

			const txResponse = await fetch(
				$baseAPIURL + 'accounts/' +
					$contractAddress +
					'/transactions?size=5&withLogs=false'
			);
			const txData = await txResponse.json();

			const scResultsResponse = await fetch(
				$baseAPIURL + 'accounts/' + $contractAddress + '/sc-results?size=5'
			);
			const scResultData = await scResultsResponse.json();

			console.log(scResultData);

			if (scResultData.length > 1) {
				txData.forEach((element) => {
					let tx = {
						txHash: element['txHash'],
						value: element['value'] / 10 ** 18,
						status: element['status'],
						timestamp: element['timestamp'],
						sender: element['sender'],
						data: atob(element['data'])
					};

					tx['results'] = [];

					scResultData.forEach((scResult) => {
						if (scResult['originalTxHash'] === element['txHash']) {
							let resultData;
							try {
								resultData = atob(scResult['data']);
								let splittedResult = resultData.split('@');
								resultData = '';

								splittedResult.forEach((e) => {
									if (e === '6f6b') {
										resultData = resultData + 'OK';
									} else {
										resultData = resultData + '@' + e;
									}
								});
							} catch (error) {}
							tx['results'] = [...tx['results'], resultData];
						}
					});

					lastTransactions = [...lastTransactions, tx];
				});
			}
		}
	}
</script>

{#if $popupVisible}
	<Dialog on:toggle={() => connectContract()} />
{/if}

<div class="container hero-dark text-light">
	<div class="row justify-content-between align-items-center">
		<div class="col-auto">
			<h1>Dashboard</h1>
			<p>Find all the contract interaction shortcuts on this page.</p>
		</div>
		<div class="col-auto">
			<img
				src="/static/dashboard.png"
				alt="dashboard icon"
				style="height:6em; filter: invert(100%)"
			/>
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
						<div class="row justify-content-stat">
							<div class="col-auto">
								<p>Status:</p>
							</div>
							<div class="col-auto">
								<span
									class="badge"
									class:bg-success={tx['status'] === 'success'}
									class:bg-danger={tx['status'] === 'fail'}
								>
									{tx['status']}
								</span>
							</div>
						</div>
						<p>Value: {tx['value']}</p>
						<p class="long-field">Data: {tx['data']}</p>

						{#if tx['results'].length > 0}
							<h6>SC Results:</h6>
							{#each tx['results'] as scResult}
								<p style="margin-left: 2em;">{scResult}</p>
							{/each}
						{/if}
						<p>
							<a
								href={$baseExplorerURL + 'transactions/' + tx['txHash']}
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
