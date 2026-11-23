export interface ReviewTemplateUIDictionary {
	styleLabel: string;
	outputLangLabel: string;
	includeSignatureLabel: string;
	resetDraftButton: string;
	gameTitleLabel: string;
	gameTitlePlaceholder: string;
	commentLabel: string;
	commentPlaceholder: string;
	loadingCategories: string;
	scorableSectionTitle: string;
	scorableSectionHint: string;
	specsSectionTitle: string;
	specsSectionHint: string;
	typeMultiple: string;
	typeSingle: string;
	previewTitle: string;
	copyButton: string;
	copiedButton: string;
	generatingPreview: string;
	emptyPreviewHint: string;
}

interface ModuleLocaleFileSchema {
	_meta: {
		code: string;
		base_lang: string;
		name: string;
		direction: string;
	};
	strings: ReviewTemplateUIDictionary;
}

const rawModules = import.meta.glob<ModuleLocaleFileSchema>('./*.json', {
	eager: true,
	import: 'default'
});

const MODULE_REGISTRY: Record<string, ModuleLocaleFileSchema> = {};
for (const mod of Object.values(rawModules)) {
	if (mod?._meta?.code) {
		MODULE_REGISTRY[mod._meta.code] = mod;
	}
}

export function resolveModuleUIDictionary(langCode: string): ReviewTemplateUIDictionary {
	if (MODULE_REGISTRY[langCode]) {
		return MODULE_REGISTRY[langCode].strings;
	}
	const base = langCode.toLowerCase().split('-')[0];
	const familyMatch = Object.values(MODULE_REGISTRY).find(
		(entry) => entry._meta.base_lang.toLowerCase() === base
	);
	if (familyMatch) {
		return familyMatch.strings;
	}
	if (base === 'es' || base === 'pt') {
		return MODULE_REGISTRY['es-MX'].strings;
	}
	return MODULE_REGISTRY['en-US'].strings;
}