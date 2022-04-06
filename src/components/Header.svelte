<header>
	<nav>
		<ul>
            <li>
                <a href="/dashboard"><p>Log in</p></a>
            </li>
			<li>
				<a href="/dashboard"><p>About</p></a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: end;
	}

	nav {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 2em;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li {
		position: relative;
		height: 100%;
		padding: 2em;
	}

	a {
		color: grey;
		text-decoration: none;
	}

	a:hover {
		color: var(--background-blue);
	}
</style>