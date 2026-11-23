<script lang="ts">
	import { Menu, Sun, Moon, Globe } from '@lucide/svelte';
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '#lib/components/ui/button';
	import { getAvailableShellLocales } from '#lib/core/locales';
	import { shellStore } from '#lib/core/stores/shell.svelte';
	import { reviewTemplateStore } from '#lib/modules/review-template/state/review-template.svelte';

	const uiLocales = getAvailableShellLocales();

	function handleGlobalLangChange(newLang: string) {
		shellStore.setUiLang(newLang);
		if (shellStore.activeAppId === 'review-template') {
			reviewTemplateStore.syncWithShellLang(newLang);
		}
	}
</script>

<header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
		<div class="flex items-center gap-3">
			<Button
				variant="ghost"
				size="icon"
				aria-label={shellStore.t.openAppsMenu}
				onclick={() => (shellStore.navOpen = true)}
			>
				<Menu class="h-5 w-5" />
			</Button>

			<div class="flex items-center gap-2">
				<span class="font-mono text-sm font-bold tracking-wider uppercase">JUVH</span>
				<span class="text-muted-foreground">/</span>
				<span class="text-sm font-medium text-foreground">
					{shellStore.t.apps[shellStore.activeApp.id]?.name ?? shellStore.activeApp.id}
				</span>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<div class="relative flex items-center">
				<Globe class="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
				<select
					aria-label={shellStore.t.uiLanguageLabel}
					value={shellStore.uiLang}
					onchange={(e) => handleGlobalLangChange(e.currentTarget.value)}
					class="h-8 rounded-md border border-input bg-background pl-8 pr-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
				>
					{#each uiLocales as locale}
                        <option value={locale.code}>{locale.name}</option>
                    {/each}
				</select>
			</div>

			<Button
				variant="ghost"
				size="icon"
				class="h-8 w-8"
				aria-label={shellStore.t.toggleThemeLabel}
				onclick={toggleMode}
			>
				{#if mode.current === 'dark'}
					<Sun class="h-4 w-4" />
				{:else}
					<Moon class="h-4 w-4" />
				{/if}
			</Button>
		</div>
	</div>
</header>