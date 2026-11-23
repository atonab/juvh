<script lang="ts">
	import { onMount } from 'svelte';
	import AppShell from '#lib/core/components/shell/AppShell.svelte';
	import { shellStore } from '#lib/core/stores/shell.svelte';
	import { reviewTemplateStore } from '#lib/modules/review-template/state/review-template.svelte';
	import ReviewContextControls from '#lib/modules/review-template/components/ReviewContextControls.svelte';
	import ReviewForm from '#lib/modules/review-template/components/ReviewForm.svelte';
	import ReviewPreview from '#lib/modules/review-template/components/ReviewPreview.svelte';

	onMount(() => {
		shellStore.setActiveApp('review-template');
		reviewTemplateStore.init();
	});
</script>

{#snippet contextControls()}
	<ReviewContextControls />
{/snippet}

<AppShell {contextControls}>
	<div class="grid gap-6 lg:grid-cols-[1fr_460px] lg:items-start">
		<ReviewForm />
		<ReviewPreview />
	</div>
</AppShell>