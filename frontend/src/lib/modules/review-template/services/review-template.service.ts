import { apiRequest } from '#lib/core/api-client';
import type {
	ReviewTemplateMetadata,
	ReviewTemplatePayload,
	ReviewTemplateResponse
} from '../types/review-template.types';

const MODULE_BASE = '/api/v1/review-template';

export async function fetchReviewMetadata(lang: string): Promise<ReviewTemplateMetadata> {
	return apiRequest<ReviewTemplateMetadata>(
		`${MODULE_BASE}/metadata?lang=${encodeURIComponent(lang)}`
	);
}

export async function renderReviewJson(
	payload: ReviewTemplatePayload
): Promise<ReviewTemplateResponse> {
	return apiRequest<ReviewTemplateResponse>(`${MODULE_BASE}/render/json`, {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}