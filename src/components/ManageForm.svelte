<script>
	import { contractAddress, baseHookURL } from '../stores.js';
	import { bech32 } from 'bech32';

	let proposedAddress = 'erd1';
	let selectedOption;
	let newQuorum;

	let proposalCommands = [
		'proposeAddBoardMember',
		'proposeAddProposer',
		'proposeRemoveUser',
		'proposeChangeQuorum'
	];

	function proposeManage() {
		let requestData;

		if (selectedOption == 3) {
			requestData = proposalCommands[selectedOption] + '@' + newQuorum.toString(16).padStart(2, '0');
		} else {
			let parsedAddress = proposedAddress == 'erd1' ? 0x00 : convertAddressToHex(proposedAddress);
			requestData = proposalCommands[selectedOption] + '@' + parsedAddress;
		}

		let request =
			$baseHookURL +
			'transaction?receiver=' +
			$contractAddress +
			'&value=0&gasLimit=25000000&data=' +
			requestData +
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

<div class="row align-items-end" style="padding: 2em;">
	<div class="col">
		<h4>Manage board members, quorum and action proposer.</h4>
		<p style="margin-top: 2em;">Choose the action and address or quorum the proposal concerns.</p>
	</div>
</div>
<div class="row align-items-end" style="margin-top: -4em; padding: 2em;">
	<div class="col-lg-3">
		<label for="Action option">Action</label>
		<select class="form-select" aria-label="Action option" bind:value={selectedOption}>
			<option selected>Select an option</option>
			<option value="0">Add Board Member</option>
			<option value="1">Add Proposer</option>
			<option value="2">Remove User</option>
			<option value="3">Change Quorum</option>
		</select>
	</div>
	{#if selectedOption == 3}
		<div class="col-lg-6">
			<label for="quorum">Quorum</label>
			<div class="input-group">
				<input
					type="number"
					class="form-control"
					id="quorum"
					placeholder="Quorum"
					aria-label="Quorum"
					bind:value={newQuorum}
				/>
				<span class="input-group-text">Number of Signatures Needed</span>
			</div>
		</div>
	{:else}
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
	{/if}
</div>
<div class="row" style="padding: 0 2em 2em 2em;">
	<div class="col">
		<button class="btn btn-dark" on:click={() => proposeManage()}>Propose Change</button>
	</div>
</div>
