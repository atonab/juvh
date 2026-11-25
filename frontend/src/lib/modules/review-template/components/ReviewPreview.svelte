<script lang="ts">
	import { Copy, Check } from '@lucide/svelte';
	import { Button } from '#lib/components/ui/button';
	import { Badge } from '#lib/components/ui/badge';
	import { reviewTemplateStore } from '../state/review-template.svelte';

	let copied = $state(false);

	async function copyOutput() {
		const text = reviewTemplateStore.result?.rendered;
		if (!text) return;
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<aside class="flex w-full min-w-0 flex-col gap-3 lg:sticky lg:top-20">
	<div class="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3">
		<div class="flex min-w-0 flex-wrap items-center gap-2">
			<span class="text-xs font-bold uppercase tracking-wider">
				{reviewTemplateStore.ui.previewTitle}
			</span>
			{#if reviewTemplateStore.result}
				<Badge variant="outline" class="font-mono text-xs">
					{reviewTemplateStore.result.average_rating.toFixed(1)} / 5.0
				</Badge>
				<span class="text-xs text-muted-foreground">
					({reviewTemplateStore.result.evaluated_count}/{reviewTemplateStore.result.total_scorable})
				</span>
			{/if}
		</div>

		<Button
			size="sm"
			class="h-8 shrink-0 text-xs"
			disabled={!reviewTemplateStore.result?.rendered}
			onclick={copyOutput}
		>
			{#if copied}
				<Check class="mr-1.5 h-3.5 w-3.5" />
				{reviewTemplateStore.ui.copiedButton}
			{:else}
				<Copy class="mr-1.5 h-3.5 w-3.5" />
				{reviewTemplateStore.ui.copyButton}
			{/if}
		</Button>
	</div>

	{#if reviewTemplateStore.error}
		<div class="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-xs text-destructive">
			{reviewTemplateStore.error}
		</div>
	{/if}

	<div class="w-full min-w-0 overflow-x-auto rounded-lg border bg-muted/40 p-4">
		{#if reviewTemplateStore.result?.rendered}
			<pre class="font-mono text-xs leading-relaxed whitespace-pre text-foreground">{reviewTemplateStore.result.rendered}</pre>
		{:else}
			<p class="py-12 text-center text-xs text-muted-foreground">
				{reviewTemplateStore.rendering
					? reviewTemplateStore.ui.generatingPreview
					: reviewTemplateStore.ui.emptyPreviewHint}
			</p>
		{/if}
	</div>
</aside>