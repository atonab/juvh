import type { ReviewTemplatePayload } from '../types/review-template.types';

const DRAFT_STORAGE_KEY = 'juvh.module.review_template.draft.v1';

export function loadReviewDraft(): Partial<ReviewTemplatePayload> | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Partial<ReviewTemplatePayload>) : null;
	} catch {
		return null;
	}
}

export function saveReviewDraft(draft: ReviewTemplatePayload): void {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
	} catch {
		// Ignorar errores de cuota de almacenamiento
	}
}

export function clearReviewDraft(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(DRAFT_STORAGE_KEY);
}