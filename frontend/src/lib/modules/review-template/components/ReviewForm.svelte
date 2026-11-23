<script lang="ts">
	import { Input } from '#lib/components/ui/input';
	import { Textarea } from '#lib/components/ui/textarea';
	import { Label } from '#lib/components/ui/label';
	import { Badge } from '#lib/components/ui/badge';
	import { reviewTemplateStore } from '../state/review-template.svelte';

	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	function scheduleRefresh() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			reviewTemplateStore.refreshPreview();
		}, 220);
	}

	const scorableCategories = $derived(
		reviewTemplateStore.metadata?.categories.filter((c) => c.group === 'scorable') ?? []
	);

	const specCategories = $derived(
		reviewTemplateStore.metadata?.categories.filter((c) => c.group === 'specs') ?? []
	);
</script>

<div class="flex flex-col gap-6">
	<section class="flex flex-col gap-4 rounded-lg border bg-card p-4">
		<div class="flex flex-col gap-1.5">
			<Label for="game-title" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
				{reviewTemplateStore.ui.gameTitleLabel}
			</Label>
			<Input
				id="game-title"
				placeholder={reviewTemplateStore.ui.gameTitlePlaceholder}
				value={reviewTemplateStore.gameTitle}
				oninput={(e) => {
					reviewTemplateStore.gameTitle = e.currentTarget.value;
					scheduleRefresh();
				}}
			/>
		</div>

		<div class="flex flex-col gap-1.5">
			<Label for="review-comment" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
				{reviewTemplateStore.ui.commentLabel}
			</Label>
			<Textarea
				id="review-comment"
				rows={3}
				placeholder={reviewTemplateStore.ui.commentPlaceholder}
				value={reviewTemplateStore.comment}
				oninput={(e) => {
					reviewTemplateStore.comment = e.currentTarget.value;
					scheduleRefresh();
				}}
			/>
		</div>
	</section>

	{#if reviewTemplateStore.loadingMetadata}
		<div class="rounded-lg border p-6 text-center text-sm text-muted-foreground">
			{reviewTemplateStore.ui.loadingCategories}
		</div>
	{:else if reviewTemplateStore.metadata}
		<section class="flex flex-col gap-4 rounded-lg border bg-card p-4">
			<div class="flex items-center justify-between border-b pb-2">
				<h2 class="text-xs font-bold uppercase tracking-wider text-foreground">
					{reviewTemplateStore.ui.scorableSectionTitle}
				</h2>
				<span class="text-xs text-muted-foreground">
					{reviewTemplateStore.ui.scorableSectionHint}
				</span>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each scorableCategories as category (category.id)}
					{@const selected = reviewTemplateStore.selections[category.id] ?? []}
					<div class="flex flex-col gap-2 rounded-md border bg-background/50 p-3">
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold">{category.label}</span>
							{#if selected.length > 0}
								<Badge variant="secondary" class="font-mono text-[10px]">
									#{selected.join(', ')}
								</Badge>
							{/if}
						</div>

						<div class="flex flex-col gap-1">
							{#each category.options as opt (opt.index)}
								{@const active = selected.includes(opt.index)}
								<button
									type="button"
									onclick={() =>
										reviewTemplateStore.toggleOption(
											category.id,
											opt.index,
											category.type
										)}
									class="flex items-center justify-between rounded px-2.5 py-1.5 text-left text-xs transition-colors {active
										? 'bg-primary text-primary-foreground font-medium'
										: 'hover:bg-muted text-foreground'}"
								>
									<span>{opt.label}</span>
									{#if opt.rating !== null}
										<span class="font-mono text-[10px] opacity-75">
											{opt.rating.toFixed(1)}
										</span>
									{/if}
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="flex flex-col gap-4 rounded-lg border bg-card p-4">
			<div class="flex items-center justify-between border-b pb-2">
				<h2 class="text-xs font-bold uppercase tracking-wider text-foreground">
					{reviewTemplateStore.ui.specsSectionTitle}
				</h2>
				<span class="text-xs text-muted-foreground">
					{reviewTemplateStore.ui.specsSectionHint}
				</span>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each specCategories as category (category.id)}
					{@const selected = reviewTemplateStore.selections[category.id] ?? []}
					<div class="flex flex-col gap-2 rounded-md border bg-background/50 p-3">
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold">{category.label}</span>
							<span class="text-[10px] uppercase text-muted-foreground">
								{category.type === 'check'
									? reviewTemplateStore.ui.typeMultiple
									: reviewTemplateStore.ui.typeSingle}
							</span>
						</div>

						<div class="flex flex-col gap-1">
							{#each category.options as opt (opt.index)}
								{@const active = selected.includes(opt.index)}
								<button
									type="button"
									onclick={() =>
										reviewTemplateStore.toggleOption(
											category.id,
											opt.index,
											category.type
										)}
									class="flex items-center justify-between rounded px-2.5 py-1.5 text-left text-xs transition-colors {active
										? 'bg-secondary text-secondary-foreground ring-1 ring-primary font-medium'
										: 'hover:bg-muted text-foreground'}"
								>
									<span>{opt.label}</span>
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>