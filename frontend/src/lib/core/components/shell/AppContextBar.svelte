<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if children}
	<div class="border-b bg-muted/30">
		<div class="mx-auto flex min-h-12 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2">
			{@render children()}
		</div>
	</div>
{/if}