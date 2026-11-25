<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '#lib/paraglide/runtime.js';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>JUVH</title>
<!-- Favicon adaptativo según el tema del navegador/sistema -->
	<link
		rel="icon"
		type="image/svg+xml"
		href="{baseUrl}/icon-light.svg"
		media="(prefers-color-scheme: light)"
	/>
	<link
		rel="icon"
		type="image/svg+xml"
		href="{baseUrl}/icon-dark.svg"
		media="(prefers-color-scheme: dark)"
	/>
	<!-- Fallback PNG para navegadores que no soporten favicon SVG -->
	<link rel="icon" type="image/png" href="{baseUrl}/icon-dark.png" />
	<link rel="apple-touch-icon" href="{baseUrl}/icon-dark.png" />
</svelte:head>

<ModeWatcher />

{@render children()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}>{locale}</a>
	{/each}
</div>