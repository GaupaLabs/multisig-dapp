<script>
	import { contractAddress, baseHookURL } from '../stores.js';

	let actionID = 0;
	let selectedOption;

	let commands = ['sign', 'unsign', 'performAction'];

	function triggerAction() {
		let requestData = commands[selectedOption] + '@' + actionID.toString(16).padStart(2, '0');

		let request =
			$baseHookURL +
			'transaction?receiver=' +
			$contractAddress +
			'&value=0&data=' +
			requestData +
			'&callbackUrl=http://localhost:3000/dashboard';

		console.log(request);

		window.open(request);
	}
</script>

<div class="row align-items-end" style="padding: 2em;">
	<div class="col-lg-9">
		<h4>Sign, unsign and execute actions.</h4>
		<p style="margin-top: 2em;">Choose an action and a proposal to use the action on.</p>
		<label for="Action option">Action</label>
		<select class="form-select" aria-label="Action option" bind:value={selectedOption}>
			<option selected>Select an option</option>
			<option value=0>Sign Action</option>
			<option value=1>Unsign Action</option>
			<option value=2>Perform Action</option>
		</select>
	</div>
	<div class="col-lg-3">
		<label for="amount">Action ID</label>
		<div class="input-group">
			<input
				type="number"
				class="form-control"
				id="amount"
				placeholder="Action ID"
				aria-label="Action ID"
				bind:value={actionID}
			/>
		</div>
	</div>
</div>
<div class="row" style="padding: 0 2em 2em 2em;">
	<div class="col">
		<button class="btn btn-dark" on:click={() => triggerAction()}>Create Transaction</button>
	</div>
</div>
