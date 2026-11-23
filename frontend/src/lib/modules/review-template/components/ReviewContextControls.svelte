<script lang="ts">
	import { RotateCcw, Layers, Languages } from '@lucide/svelte';
	import { Button } from '#lib/components/ui/button';
	import { reviewTemplateStore } from '../state/review-template.svelte';
</script>

<div class="flex flex-wrap items-center gap-3">
	<div class="flex items-center gap-1.5">
		<Layers class="h-3.5 w-3.5 text-muted-foreground" />
		<label for="rt-style-select" class="text-xs font-medium text-muted-foreground">
			{reviewTemplateStore.ui.styleLabel}
		</label>
		<select
			id="rt-style-select"
			value={reviewTemplateStore.template}
			onchange={(e) => reviewTemplateStore.setTemplate(e.currentTarget.value)}
			class="h-8 rounded-md border border-input bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
		>
			{#if reviewTemplateStore.metadata}
				{#each reviewTemplateStore.metadata.templates as tpl}
					<option value={tpl.id}>{tpl.label}</option>
				{/each}
			{:else}
				<option value={reviewTemplateStore.template}>{reviewTemplateStore.template}</option>
			{/if}
		</select>
	</div>

	<div class="flex items-center gap-1.5">
		<Languages class="h-3.5 w-3.5 text-muted-foreground" />
		<label for="rt-lang-select" class="text-xs font-medium text-muted-foreground">
			{reviewTemplateStore.ui.outputLangLabel}
		</label>
		<select
			id="rt-lang-select"
			value={reviewTemplateStore.outputLang}
			onchange={(e) => reviewTemplateStore.setOutputLang(e.currentTarget.value)}
			class="h-8 rounded-md border border-input bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
		>
			{#if reviewTemplateStore.metadata}
				{#each reviewTemplateStore.metadata.locales as loc}
					<option value={loc.code}>{loc.name}</option>
				{/each}
			{:else}
				<option value={reviewTemplateStore.outputLang}>{reviewTemplateStore.outputLang}</option>
			{/if}
		</select>
	</div>

	<label class="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground select-none">
		<input
			type="checkbox"
			checked={reviewTemplateStore.includeSignature}
			onchange={(e) => {
				reviewTemplateStore.includeSignature = e.currentTarget.checked;
				reviewTemplateStore.refreshPreview();
			}}
			class="h-3.5 w-3.5 rounded border-input accent-primary"
		/>
		{reviewTemplateStore.ui.includeSignatureLabel}
	</label>
</div>

<div class="flex items-center gap-2">
	<Button
		variant="outline"
		size="sm"
		class="h-8 text-xs"
		onclick={() => reviewTemplateStore.resetDraft()}
	>
		<RotateCcw class="mr-1.5 h-3.5 w-3.5" />
		{reviewTemplateStore.ui.resetDraftButton}
	</Button>
</div>