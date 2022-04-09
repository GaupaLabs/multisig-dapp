<script>
	let proposedAddress = 'erd1';

	function proposeManage() {}
</script>

<div class="row align-items-end" style="padding: 2em;">
	<div class="col">
		<h4>Manage board members, quorum and action proposer.</h4>
		<p style="margin-top: 2em;">Choose the action and address the proposal concerns.</p>
	</div>
</div>
<div class="row align-items-end" style="margin-top: -4em; padding: 2em;">
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
