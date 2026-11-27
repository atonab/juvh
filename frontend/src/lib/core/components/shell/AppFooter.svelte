<script lang="ts">
	import { Star, Code2, BookOpen, MessageSquarePlus, ExternalLink } from '@lucide/svelte';
	import { mode } from 'mode-watcher';
	import { Button } from '#lib/components/ui/button';
	import { Separator } from '#lib/components/ui/separator';
	import { shellStore } from '#lib/core/stores/shell.svelte';

	const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
	const REPO_URL = 'https://github.com/atonab/juvh';
	const API_DOCS_URL = 'https://juvh.vercel.app/docs';
	const ISSUES_URL = 'https://github.com/atonab/juvh/issues/new/choose';
</script>

<footer class="mt-auto w-full border-t bg-background/95">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row"
	>
		<div class="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
			<img
				src="{baseUrl}/{mode.current === 'dark' ? 'logo-dark.svg' : 'logo-light.svg'}"
				alt="JUVH"
				class="h-5 w-auto shrink-0"
			/>
			<Separator orientation="vertical" class="h-4" />
			<span>{shellStore.t.footer.openSourceBadge}</span>
		</div>

		<nav
			aria-label="Enlaces del proyecto"
			class="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end"
		>
			<Button
				href={REPO_URL}
				target="_blank"
				rel="noopener noreferrer"
				variant="outline"
				size="sm"
				class="h-7 gap-1.5 px-2.5 text-xs"
			>
				<Star class="h-3.5 w-3.5 text-amber-400" />
				<span>{shellStore.t.footer.starCta}</span>
			</Button>

			<Button
				href={REPO_URL}
				target="_blank"
				rel="noopener noreferrer"
				variant="ghost"
				size="sm"
				class="h-7 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
			>
				<Code2 class="h-3.5 w-3.5" />
				<span>{shellStore.t.footer.sourceCode}</span>
			</Button>

			<Button
				href={API_DOCS_URL}
				target="_blank"
				rel="noopener noreferrer"
				variant="ghost"
				size="sm"
				class="h-7 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
			>
				<BookOpen class="h-3.5 w-3.5" />
				<span>{shellStore.t.footer.apiDocs}</span>
				<ExternalLink class="h-3 w-3 opacity-60" />
			</Button>

			<Button
				href={ISSUES_URL}
				target="_blank"
				rel="noopener noreferrer"
				variant="ghost"
				size="sm"
				class="h-7 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
			>
				<MessageSquarePlus class="h-3.5 w-3.5" />
				<span>{shellStore.t.footer.suggestIdea}</span>
			</Button>
		</nav>
	</div>
</footer>
