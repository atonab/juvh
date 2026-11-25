<script lang="ts">
	import { mode } from 'mode-watcher';
	import * as Sheet from '#lib/components/ui/sheet';
	import { Badge } from '#lib/components/ui/badge';
	import { Separator } from '#lib/components/ui/separator';
	import { shellStore, REGISTERED_APPS } from '#lib/core/stores/shell.svelte';

	const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
</script>

<Sheet.Root bind:open={shellStore.navOpen}>
	<Sheet.Content side="left" class="w-80 gap-2 sm:w-96">
		<Sheet.Header class="items-center justify-center pt-5 pb-3 text-center">
			<Sheet.Title class="sr-only">
				{shellStore.t.ecosystemTitle}
			</Sheet.Title>
			<img
				src="{baseUrl}/{mode.current === 'dark' ? 'logo-dark.svg' : 'logo-light.svg'}"
				alt={shellStore.t.ecosystemTitle}
				class="mx-auto h-9 w-auto"
			/>
		</Sheet.Header>

		<Separator class="my-1" />

		<nav class="flex flex-col gap-1.5 px-4" aria-label={shellStore.t.appsMenuNavLabel}>
			{#each REGISTERED_APPS as app}
				{@const isActive = shellStore.activeAppId === app.id}
				{@const appInfo = shellStore.t.apps[app.id]}
				<a
					href="{baseUrl}{app.route}"
					onclick={() => {
						shellStore.setActiveApp(app.id);
						shellStore.navOpen = false;
					}}
					class="flex flex-col gap-1 rounded-md border p-3 transition-colors {isActive
						? 'border-primary bg-muted/60'
						: 'border-transparent hover:bg-muted/40'}"
				>
					<div class="flex items-center justify-between gap-2">
						<span class="text-sm font-semibold">{appInfo?.name ?? app.id}</span>
						<Badge variant={isActive ? 'default' : 'secondary'} class="shrink-0 text-[10px]">
							{app.status === 'active'
								? shellStore.t.statusActive
								: shellStore.t.statusPlanned}
						</Badge>
					</div>
					<p class="text-xs text-muted-foreground">
						{appInfo?.description ?? ''}
					</p>
				</a>
			{/each}
		</nav>
	</Sheet.Content>
</Sheet.Root>