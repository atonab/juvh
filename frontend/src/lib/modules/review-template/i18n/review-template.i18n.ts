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

const MODULE_LOCALES: Record<string, ReviewTemplateUIDictionary> = {
	'es-MX': {
		styleLabel: 'Estilo:',
		outputLangLabel: 'Idioma plantilla:',
		includeSignatureLabel: 'Incluir enlace JUVH',
		resetDraftButton: 'Limpiar borrador',
		gameTitleLabel: 'Título del juego o software',
		gameTitlePlaceholder: 'Ej. Six Days in Fallujah',
		commentLabel: 'Reseña / Comentario libre (Opcional)',
		commentPlaceholder:
			'Escribe tu opinión general; se enmarcará automáticamente con el estilo de la plantilla...',
		loadingCategories: 'Cargando definición de apartados desde el núcleo...',
		scorableSectionTitle: 'Apartados Evaluables',
		scorableSectionHint: 'Promedian la calificación final',
		specsSectionTitle: 'Ficha Técnica y Perfil',
		specsSectionHint: 'Informativos (no alteran el promedio)',
		typeMultiple: 'Múltiple',
		typeSingle: 'Única',
		previewTitle: 'Vista Previa',
		copyButton: 'Copiar texto',
		copiedButton: 'Copiado',
		generatingPreview: 'Generando plantilla...',
		emptyPreviewHint: 'Selecciona apartados para previsualizar tu reseña.'
	},
	'en-US': {
		styleLabel: 'Style:',
		outputLangLabel: 'Template language:',
		includeSignatureLabel: 'Include JUVH link',
		resetDraftButton: 'Clear draft',
		gameTitleLabel: 'Game or software title',
		gameTitlePlaceholder: 'e.g. Six Days in Fallujah',
		commentLabel: 'Review / Free comment (Optional)',
		commentPlaceholder:
			'Write your overall thoughts; it will be framed automatically with the template style...',
		loadingCategories: 'Loading category definitions from core...',
		scorableSectionTitle: 'Scorable Categories',
		scorableSectionHint: 'Averaged into final rating',
		specsSectionTitle: 'Technical & Profile Specs',
		specsSectionHint: 'Informational (do not affect average)',
		typeMultiple: 'Multiple',
		typeSingle: 'Single',
		previewTitle: 'Live Preview',
		copyButton: 'Copy text',
		copiedButton: 'Copied',
		generatingPreview: 'Generating template...',
		emptyPreviewHint: 'Select options to preview your review.'
	}
};

export function resolveModuleUIDictionary(langCode: string): ReviewTemplateUIDictionary {
	if (MODULE_LOCALES[langCode]) return MODULE_LOCALES[langCode];
	const base = langCode.toLowerCase().split('-')[0];
	if (base === 'es' || base === 'pt') return MODULE_LOCALES['es-MX'];
	return MODULE_LOCALES['en-US'];
}