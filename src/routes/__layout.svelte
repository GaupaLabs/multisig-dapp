<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>
<footer style="margin-top: 8em; justify-content: center; display: flex;">
	<p>Provided by <a href="https://gaupalabs.com" target="_blank">Gaupa Labs</a>.</p>
</footer>
