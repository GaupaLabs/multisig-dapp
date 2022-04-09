<script>
	let proposalNo = 0;

	function triggerAction() {}
</script>

<div class="row align-items-end" style="padding: 2em;">
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
		<button class="btn btn-dark" on:click={() => triggerAction()}>Execute Action</button>
	</div>
</div>
