import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';

export default defineConfig(() => {
	return {
		server: {
			host: '0.0.0.0',
			port: 3000
		},
		css: {
			transformer: 'postcss'
		},
		root: resolve(__dirname, 'src'),
		publicDir: resolve(__dirname, 'public'),
		plugins: [
			pugPlugin(),
			{
				name: 'vite:pug',
				apply: 'build',
				transformIndexHtml: {
					order: 'post',
					handler: async (html, ctx) => {
						if (/\.html$/.test(ctx.path)) {
							return html.replace(/\/public\//g, '/');
						}
					}
				}
			}
		],
		build: {
			outDir: resolve(__dirname, 'dist'),
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'src/index.html')
				},
				output: {
					entryFileNames: `assets/[name].js`,
					chunkFileNames: `assets/[name].js`,
					assetFileNames: `assets/[name].[ext]`,
				},
			},
		}
	};
});
