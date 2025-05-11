import { defineExternal, definePlugins } from '@gera2ld/plaid-rollup';
import { defineConfig } from 'rollup';
import pkg from './package.json' with { type: 'json' };

const external = defineExternal(Object.keys(pkg.dependencies));

export default defineConfig([
	{
		input: 'src/index.ts',
		plugins: definePlugins({
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
			replaceValues: {
				'process.env.VERSION': pkg.version,
			},
		}),
		output: {
			format: 'iife',
			file: `dist/index.js`,
			name: 'IRF',
			indent: false,
			banner: `/*! ${pkg.name}@${pkg.version} | ${pkg.license} License */\nvar s,i,t;i=null==(s=this.IRF||{})?void 0:s.version,t="${pkg.version}",(void 0===i||i.startsWith(t+"-")||!t.startsWith(i+"-")&&-1===i.localeCompare(t,void 0,{numeric:!0,sensitivity:"case",caseFirst:"upper"}))&&`,
			extend: true,
			esModule: false,
		},
	},
]);
