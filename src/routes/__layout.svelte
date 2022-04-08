<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>
<footer style="margin-top: 2em; justify-content: center; display: flex;">
	<p>Provided by <a href="https://gaupalabs.com" target="_blank">Gaupa Labs</a>.</p>
</footer>
