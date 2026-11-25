<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		variant?: 'logo' | 'icon';
		class?: string;
		alt?: string;
	}

	let { variant = 'logo', class: className = 'h-6 w-auto', alt = 'JUVH' }: Props = $props();
</script>

<!-- Versión para tema claro (se oculta en dark mode) -->
<img
	src="{base}/{variant}-light.svg"
	{alt}
	class="block dark:hidden {className}"
/>

<!-- Versión para tema oscuro (se muestra solo en dark mode) -->
<img
	src="{base}/{variant}-dark.svg"
	{alt}
	class="hidden dark:block {className}"
/>