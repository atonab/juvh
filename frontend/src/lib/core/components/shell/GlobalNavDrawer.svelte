<script lang="ts">
	import * as Sheet from '#lib/components/ui/sheet';
	import { Badge } from '#lib/components/ui/badge';
	import { Separator } from '#lib/components/ui/separator';
	import { shellStore, REGISTERED_APPS } from '#lib/core/stores/shell.svelte';
</script>

<Sheet.Root bind:open={shellStore.navOpen}>
	<Sheet.Content side="left" class="w-80 gap-2 sm:w-96">
		<Sheet.Header class="pb-1 text-left">
			<Sheet.Title class="font-mono text-base tracking-wider uppercase">
				{shellStore.t.ecosystemTitle}
			</Sheet.Title>
			<Sheet.Description class="text-xs">
				{shellStore.t.ecosystemSubtitle}
			</Sheet.Description>
		</Sheet.Header>

		<Separator class="my-1" />

		<nav class="flex flex-col gap-1.5 px-4" aria-label={shellStore.t.appsMenuNavLabel}>
			{#each REGISTERED_APPS as app}
				{@const isActive = shellStore.activeAppId === app.id}
				{@const appInfo = shellStore.t.apps[app.id]}
				<a
					href={app.route}
					onclick={() => {
						shellStore.setActiveApp(app.id);
						shellStore.navOpen = false;
					}}
					class="flex flex-col gap-1 rounded-md border p-3 transition-colors {isActive
						? 'border-primary bg-muted/60'
						: 'border-transparent hover:bg-muted/40'}"
				>
					<div class="flex items-center justify-between">
						<span class="text-sm font-semibold">{appInfo?.name ?? app.id}</span>
						<Badge variant={isActive ? 'default' : 'secondary'} class="text-[10px]">
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