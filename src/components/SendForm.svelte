<script>
	import { contractAddress, baseHookURL, callbackURL } from '../stores.js';
	import { bech32 } from 'bech32';

	let receiverAddress = 'erd1';
	let amountEGLD = 0;

	function proposeSending() {
		let parsedAddress = receiverAddress == 'erd1' ? 0x00 : convertAddressToHex(receiverAddress);
		let parsedEGLDAmount = amountEGLD * 10 ** 18;
		let amount;

		if(parsedEGLDAmount.toString(16).length % 2 !== 0){
			amount = parsedEGLDAmount.toString(16).padStart(parsedEGLDAmount.toString(16).length + 1, '0');
		} else {
			amount = parsedEGLDAmount.toString(16);
		}

		console.log(amount);

		let requestData =
			'proposeTransferExecute@' + parsedAddress + '@' + amount;

		let request =
			$baseHookURL +
			'transaction?receiver=' +
			$contractAddress +
			'&value=0&gasLimit=25000000&data=' +
			requestData +
			'&callbackUrl=' + $callbackURL;

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

<div class="container" style="padding: 2em;">
	<div class="row align-items-end">
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

	<div class="row" style="margin-top: 2em;">
		<div class="col">
			<button class="btn btn-dark" on:click={() => proposeSending()}>Propose sending EGLD</button>
		</div>
	</div>
</div>
