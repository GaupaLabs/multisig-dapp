<script>
	import { contractAddress, baseHookURL } from '../stores.js';

	let amountEGLD = 0;

	function addFunds() {
		let parsedEGLDAmount = amountEGLD * 10 ** 18;

		let request =
			$baseHookURL +
			'transaction?receiver=' +
			$contractAddress +
			'&value=' +
			parsedEGLDAmount +
			'&data=deposit&callbackUrl=http://localhost:3000/dashboard';

		console.log(request);

		window.open(request);
	}
</script>

<div class="row" style="padding: 2em;">
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
		<button class="btn btn-dark" on:click={() => addFunds()}>Send EGLD</button>
	</div>
</div>
