export interface ShellDictionary {
	ecosystemTitle: string;
	ecosystemSubtitle: string;
	openAppsMenu: string;
	uiLanguageLabel: string;
	toggleThemeLabel: string;
	appsMenuNavLabel: string;
	statusActive: string;
	statusPlanned: string;
	apps: Record<string, { name: string; description: string }>;
}

interface LocaleFileSchema {
	_meta: {
		code: string;
		base_lang: string;
		name: string;
		direction: string;
	};
	strings: ShellDictionary;
}

const rawModules = import.meta.glob<LocaleFileSchema>('./*.json', {
	eager: true,
	import: 'default'
});

const SHELL_REGISTRY: Record<string, LocaleFileSchema> = {};
for (const mod of Object.values(rawModules)) {
	if (mod?._meta?.code) {
		SHELL_REGISTRY[mod._meta.code] = mod;
	}
}

export function getAvailableShellLocales(): Array<{ code: string; name: string }> {
	return Object.values(SHELL_REGISTRY).map((entry) => ({
		code: entry._meta.code,
		name: entry._meta.name
	}));
}

export function resolveShellDictionary(langCode: string): ShellDictionary {
	if (SHELL_REGISTRY[langCode]) {
		return SHELL_REGISTRY[langCode].strings;
	}
	const base = langCode.toLowerCase().split('-')[0];
	const familyMatch = Object.values(SHELL_REGISTRY).find(
		(entry) => entry._meta.base_lang.toLowerCase() === base
	);
	if (familyMatch) {
		return familyMatch.strings;
	}
	if (base === 'es' || base === 'pt') {
		return SHELL_REGISTRY['es-MX'].strings;
	}
	return SHELL_REGISTRY['en-US'].strings;
}