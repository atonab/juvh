import { shellStore } from '#lib/core/stores/shell.svelte';
import {
	fetchReviewMetadata,
	renderReviewJson
} from '../services/review-template.service';
import {
	clearReviewDraft,
	loadReviewDraft,
	saveReviewDraft
} from '../storage/review-template.storage';
import type {
	ReviewTemplateMetadata,
	ReviewTemplatePayload,
	ReviewTemplateResponse
} from '../types/review-template.types';
import {
	resolveModuleUIDictionary,
	type ReviewTemplateUIDictionary
} from '../locales';

class ReviewTemplateState {
	metadata = $state<ReviewTemplateMetadata | null>(null);
	loadingMetadata = $state(false);
	rendering = $state(false);
	error = $state<string | null>(null);

	template = $state<string>('minimal');
	outputLang = $state<string>(shellStore.uiLang);
	hasManualLangOverride = $state<boolean>(false);
	gameTitle = $state<string>('');
	comment = $state<string>('');
	selections = $state<Record<string, number[]>>({});
	manualRating = $state<number | null>(null);
	includeSignature = $state<boolean>(true);

	result = $state<ReviewTemplateResponse | null>(null);

	constructor() {
		const saved = loadReviewDraft();
		if (saved) {
			if (saved.template) this.template = saved.template;
			if (saved.lang) {
				this.outputLang = saved.lang;
				this.hasManualLangOverride = saved.lang !== shellStore.uiLang;
			}
			if (typeof saved.game_title === 'string') this.gameTitle = saved.game_title;
			if (typeof saved.comment === 'string') this.comment = saved.comment;
			if (saved.selections) this.selections = saved.selections;
			if (typeof saved.manual_rating === 'number') this.manualRating = saved.manual_rating;
			if (typeof saved.include_signature === 'boolean') {
				this.includeSignature = saved.include_signature;
			}
		} else {
			this.outputLang = shellStore.uiLang;
		}
	}

	get payload(): ReviewTemplatePayload {
		return {
			template: this.template,
			lang: this.outputLang,
			game_title: this.gameTitle.trim() || null,
			comment: this.comment.trim() || null,
			selections: this.selections,
			manual_rating: this.manualRating,
			include_signature: this.includeSignature
		};
	}

	async init() {
		const targetLang = this.hasManualLangOverride ? this.outputLang : shellStore.uiLang;
		await this.loadMetadata(targetLang);
		await this.refreshPreview();
	}

	async syncWithShellLang(shellLang: string) {
		this.hasManualLangOverride = false;
		await this.loadMetadata(shellLang);
		await this.refreshPreview();
	}

	async loadMetadata(requestedLang: string) {
		this.loadingMetadata = true;
		this.error = null;
		try {
			const meta = await fetchReviewMetadata(requestedLang);
			this.metadata = meta;
			// Si el idioma existe en el módulo toma ese; si no, usa el fallback resuelto por core
			this.outputLang = meta.resolved_lang;
			if (!meta.templates.some((t) => t.id === this.template) && meta.templates.length > 0) {
				this.template = meta.templates[0].id;
			}
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Error al cargar metadatos del módulo';
		} finally {
			this.loadingMetadata = false;
		}
	}

	async setOutputLang(lang: string) {
		this.hasManualLangOverride = true;
		await this.loadMetadata(lang);
		await this.refreshPreview();
	}

	async setTemplate(templateId: string) {
		this.template = templateId;
		await this.refreshPreview();
	}

	async toggleOption(categoryId: string, optionIndex: number, type: 'radio' | 'check') {
		const current = this.selections[categoryId] ?? [];
		let updated: number[];

		if (type === 'radio') {
			updated = current.includes(optionIndex) ? [] : [optionIndex];
		} else {
			updated = current.includes(optionIndex)
				? current.filter((i) => i !== optionIndex)
				: [...current, optionIndex].sort((a, b) => a - b);
		}

		if (updated.length === 0) {
			const { [categoryId]: _, ...rest } = this.selections;
			this.selections = rest;
		} else {
			this.selections = { ...this.selections, [categoryId]: updated };
		}

		await this.refreshPreview();
	}

	async resetDraft() {
		clearReviewDraft();
		this.hasManualLangOverride = false;
		this.gameTitle = '';
		this.comment = '';
		this.selections = {};
		this.manualRating = null;
		this.includeSignature = true;
		await this.loadMetadata(shellStore.uiLang);
		await this.refreshPreview();
	}

	async refreshPreview() {
		const currentPayload = this.payload;
		saveReviewDraft(currentPayload);
		this.rendering = true;
		this.error = null;
		try {
			this.result = await renderReviewJson(currentPayload);
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Error al renderizar la plantilla';
		} finally {
			this.rendering = false;
		}
	}

    get ui(): ReviewTemplateUIDictionary {
		return resolveModuleUIDictionary(shellStore.uiLang);
	}
}

export const reviewTemplateStore = new ReviewTemplateState();