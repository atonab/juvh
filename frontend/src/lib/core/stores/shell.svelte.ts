import { locales, setLocale } from '#lib/paraglide/runtime.js';
import {
	getAvailableShellLocales,
	resolveShellDictionary,
	type ShellDictionary
} from '../locales';

export interface AppModuleMeta {
	id: string;
	route: string;
	status: 'active' | 'planned';
}

export const REGISTERED_APPS: AppModuleMeta[] = [
	{
		id: 'review-template',
		route: '/',
		status: 'active'
	}
];

const UI_LANG_STORAGE_KEY = 'juvh.ui.lang';

export function detectInitialLocale(): string {
	if (typeof window === 'undefined') return 'es-MX';

	const saved = localStorage.getItem(UI_LANG_STORAGE_KEY);
	if (saved) return saved;

	const navLang = (navigator.language || 'es-MX').toLowerCase();
	if (navLang.startsWith('es') || navLang.startsWith('pt')) {
		return 'es-MX';
	}
	return 'en-US';
}

function syncParaglideLocale(code: string) {
	const normalized = code.toLowerCase();
	const exact = locales.find((l) => l.toLowerCase() === normalized);
	if (exact) {
		setLocale(exact, { reload: false });
		return;
	}
	const base = normalized.split('-')[0];
	const family = locales.find((l) => l.toLowerCase().startsWith(base));
	if (family) {
		setLocale(family, { reload: false });
	}
}

class ShellState {
	navOpen = $state(false);
	uiLang = $state<string>('es-MX');
	activeAppId = $state<string>('review-template');

	constructor() {
		if (typeof window !== 'undefined') {
			const initial = detectInitialLocale();
			this.uiLang = initial;
			syncParaglideLocale(initial);
		}
	}

	get t(): ShellDictionary {
		return resolveShellDictionary(this.uiLang);
	}

	setUiLang(code: string) {
		this.uiLang = code;
		if (typeof window !== 'undefined') {
			localStorage.setItem(UI_LANG_STORAGE_KEY, code);
			syncParaglideLocale(code);
		}
	}

	setActiveApp(appId: string) {
		this.activeAppId = appId;
	}

	get activeApp(): AppModuleMeta {
		return (
			REGISTERED_APPS.find((app) => app.id === this.activeAppId) ?? REGISTERED_APPS[0]
		);
	}
}

export const shellStore = new ShellState();