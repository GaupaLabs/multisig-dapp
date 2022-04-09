<script>
	import { page } from '$app/stores';
	import { contractAddress } from '../stores.js';
	import SendForm from '../components/SendForm.svelte';
	import ActionsForm from '../components/ActionsForm.svelte';
	import ManageForm from '../components/ManageForm.svelte';
	import DepositForm from '../components/DepositForm.svelte';

	const userAddress = $page.url.searchParams.get('address');
	const lastTx = $page.url.searchParams.get('txHash');

	let selectedTab = 'send';
	let amountEGLD = 0;
	function addFunds() {}
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
