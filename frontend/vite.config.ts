import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

const isProd = process.env.NODE_ENV === 'production';
const runtimeFile = path.resolve(process.cwd(), '../.runtime/core.json');

function readCoreEndpoint(): { host: string; port: number } | null {
	if (process.env.CORE_URL) {
		const url = new URL(process.env.CORE_URL);
		return { host: url.hostname, port: Number(url.port) || 80 };
	}
	try {
		const raw = fs.readFileSync(runtimeFile, 'utf-8');
		const data = JSON.parse(raw);
		if (data?.port) {
			return { host: data.host || '127.0.0.1', port: Number(data.port) };
		}
	} catch {
		return null;
	}
	return null;
}

function dynamicCoreProxyPlugin(): Plugin {
	return {
		name: 'juvh-dynamic-core-proxy',
		configureServer(server) {
			server.middlewares.use('/api', (req, res) => {
				const target = readCoreEndpoint();
				if (!target) {
					res.statusCode = 503;
					res.setHeader('Content-Type', 'application/json');
					res.end(
						JSON.stringify({
							error: 'JUVH Core no detectado',
							detail: `No se encontró ${runtimeFile}. Ejecuta: python run.py en core/`
						})
					);
					return;
				}

				const proxyReq = http.request(
					{
						hostname: target.host,
						port: target.port,
						path: `/api${req.url || ''}`,
						method: req.method,
						headers: {
							...req.headers,
							host: `${target.host}:${target.port}`
						}
					},
					(proxyRes) => {
						res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
						proxyRes.pipe(res, { end: true });
					}
				);

				proxyReq.on('error', (err) => {
					res.statusCode = 502;
					res.setHeader('Content-Type', 'application/json');
					res.end(
						JSON.stringify({
							error: 'Error conectando con JUVH Core',
							target: `http://${target.host}:${target.port}`,
							detail: err.message
						})
					);
				});

				req.pipe(proxyReq, { end: true });
			});
		}
	};
}

export default defineConfig({
	envPrefix: 'PUBLIC_',
	plugins: [
		dynamicCoreProxyPlugin(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				fallback: 'index.html'
			}),
			paths: {
				base: isProd ? process.env.BASE_PATH || '/juvh' : ''
			}
		}),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			emitTsDeclarations: true
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});