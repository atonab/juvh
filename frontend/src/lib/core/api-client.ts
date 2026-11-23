const BASE_URL = (import.meta.env.PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

export async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
	const url = `${BASE_URL}${path}`;

	const response = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!response.ok) {
		const errorBody = await response.text();
		throw new Error(`API Error ${response.status}: ${errorBody}`);
	}

	const contentType = response.headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		return (await response.json()) as T;
	}
	return (await response.text()) as unknown as T;
}