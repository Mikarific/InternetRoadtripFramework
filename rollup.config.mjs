import { defineExternal, definePlugins } from '@gera2ld/plaid-rollup';
import debugLibraryUserscriptOutput from './rollup-plugin-debug-library-userscript.mjs';
import { defineConfig } from 'rollup';
import pkg from './package.json' with { type: 'json' };

const external = defineExternal(Object.keys(pkg.dependencies));

export default defineConfig([
	{
		input: 'src/index.ts',
		plugins: definePlugins({
			postcss: {
				inject: false,
				minimize: true,
				modules: {
					generateScopedName: 'irf-[hash:base64:6]',
				},
			},
			replaceValues: {
				'process.env.VERSION': pkg.version,
			},
		}),
		external,
		output: {
			format: 'esm',
			file: `dist/index.mjs`,
			indent: false,
			banner: `/*! ${pkg.name}@${pkg.version} | ${pkg.license} License */`,
		},
	},
	{
		input: 'src/index.ts',
		plugins: definePlugins({
			minimize: true,
			postcss: {
				inject: false,
				minimize: true,
				modules: {
					generateScopedName: 'irf-[hash:base64:6]',
				},
			},
			replaceValues: {
				'process.env.VERSION': pkg.version,
			},
		}),
		output: {
			format: 'iife',
			file: `dist/index.js`,
			name: 'IRF',
			indent: false,
			// const current = (void 0!==this.IRF&&this.IRF||(this.IRF={})).version;
			// const latest = pkg.version;
			// if (current===undefined||current.startsWith(latest + '-')||(!latest.startsWith(current + '-')&&current.localeCompare(latest, undefined, { numeric: true, sensitivity: 'case', caseFirst: 'upper' }) === -1)) run();
			banner: `/*! ${pkg.name}@${pkg.version} | ${pkg.license} License */\nconst c=(void 0!==this.IRF&&this.IRF||(this.IRF={})).version,l="${pkg.version}";(void 0===c||c.startsWith(l+"-")||!l.startsWith(c+"-")&&-1===c.localeCompare(l,void 0,{numeric:!0,sensitivity:"case",caseFirst:"upper"}))&&`,
			extend: true,
			esModule: false,
		},
	},
	{
		input: 'src/index.ts',
		plugins: definePlugins({
			minimize: true,
			postcss: {
				inject: false,
				minimize: true,
				modules: {
					generateScopedName: 'irf-[hash:base64:6]',
				},
			},
			replaceValues: {
				'process.env.VERSION': pkg.version,
			},
		}),
		output: {
			format: 'iife',
			file: `dist/debugging.user.js`,
			name: 'IRF',
			indent: false,
			banner: `/*! ${pkg.name}@${pkg.version} | ${pkg.license} License */\nvar s,i,t;i=null==(s=this.IRF||{})?void 0:s.version,t="${pkg.version}",(void 0===i||i.startsWith(t+"-")||!t.startsWith(i+"-")&&-1===i.localeCompare(t,void 0,{numeric:!0,sensitivity:"case",caseFirst:"upper"}))&&`,
			extend: true,
			esModule: false,
			plugins: [
				debugLibraryUserscriptOutput()
			]
		},
	},
]);
