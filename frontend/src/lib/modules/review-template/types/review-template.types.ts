export interface LocaleMeta {
	code: string;
	base_lang: string;
	name: string;
	direction: string;
}

export interface TemplateMeta {
	id: string;
	label: string;
	description: string;
}

export interface CategoryOption {
	index: number;
	label: string;
	rating: number | null;
}

export interface CategoryMeta {
	id: string;
	group: 'scorable' | 'specs';
	type: 'radio' | 'check';
	order: 'best_first' | 'worst_first';
	label: string;
	options: CategoryOption[];
}

export interface ReviewTemplateMetadata {
	module: string;
	resolved_lang: string;
	locales: LocaleMeta[];
	templates: TemplateMeta[];
	categories: CategoryMeta[];
}

export interface ReviewTemplatePayload {
	template: string;
	lang: string;
	game_title: string | null;
	comment: string | null;
	selections: Record<string, number[]>;
	manual_rating: number | null;
	include_signature: boolean;
}

export interface ReviewTemplateResponse {
	template: string;
	requested_lang: string;
	resolved_lang: string;
	average_rating: number;
	evaluated_count: number;
	total_scorable: number;
	rendered: string;
}