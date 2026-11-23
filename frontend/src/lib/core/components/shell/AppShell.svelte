<script lang="ts">
	import type { Snippet } from 'svelte';
	import AppHeader from './AppHeader.svelte';
	import GlobalNavDrawer from './GlobalNavDrawer.svelte';
	import AppContextBar from './AppContextBar.svelte';

	interface Props {
		contextControls?: Snippet;
		children: Snippet;
	}

	let { contextControls, children }: Props = $props();
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<AppHeader />
	<GlobalNavDrawer />
	<AppContextBar children={contextControls} />

	<main class="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
		{@render children()}
	</main>
</div>