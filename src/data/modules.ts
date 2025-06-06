import type * as howlerjs from 'howler';
import type * as maplibregl from 'maplibre-gl';
import type matterjs from 'matter-js';
import type Hls from 'hls.js';

import { content, page, getOrSet, getFromPageWindow } from '../lib/util';

function modulePromise(name: string, match: string, vdom: Promise<object>, prefix: string, suffix: string) {
	return new Promise((resolve) => {
		vdom.then(() => {
			const webpack = `${prefix}Object.values(webpackJsonp.push([[],{""(e,a,c){a.cache=c.c}},[[""]]]).cache).find(e=>${match}).exports${suffix}`;
			if (typeof webpackJsonp === 'undefined') {
				page(
					`void 0===window.IRF.internal.modules&&Object.defineProperty(window.IRF.internal,'modules',{configurable:!1,enumerable:!1,writable:!1,value:{}});Object.defineProperty(window.IRF.internal.modules,'${name}',{configurable:!1,enumerable:!1,writable:!1,value:${webpack}});`,
				);
				resolve(getFromPageWindow('IRF').internal.modules[name]);
			} else {
				resolve(new Function(`return ${webpack};`)());
			}
		});
	});
}

const getModule = <T>(
	name: string,
	match: string,
	vdom: string,
	prefix: string = '',
	suffix: string = '',
): Promise<T> => {
	return content(
		`${getOrSet(
			'window.IRF.modules',
			name,
			`(${modulePromise.toString()})('${name}','${match}',window.IRF.vdom.${vdom},'${prefix}','${suffix}')`,
		)}\n${page.toString()}\n${getFromPageWindow.toString()}`,
	);
};

content(getOrSet('window.IRF', 'modules', '{}'));
export const maplibre: Promise<typeof maplibregl> = getModule(
	'maplibre',
	'e?.exports?.Map&&document.querySelector(".map-container").__vue__._data.map instanceof e?.exports?.Map',
	'map',
);
export const matter: Promise<typeof matterjs> = getModule('matter', '"matter-js"===e?.exports?.name', 'container');
export const hls: Promise<Hls> = getModule(
	'hls',
	'e?.exports&&e?.exports[Object.keys(Object.getOwnPropertyDescriptors(e?.exports))]?.MetadataSchema?.dateRange==="com.apple.quicktime.HLS"',
	'container',
	'Object.entries(',
	')[0][1]',
);

function howlerPromise(vdom: Promise<object>) {
	return new Promise((resolve) => {
		vdom.then(() => {
			resolve({
				Howl: typeof Howl !== 'undefined' ? Howl : getFromPageWindow('Howl'),
				Howler: typeof Howler !== 'undefined' ? Howler : getFromPageWindow('Howler'),
			});
		});
	});
}
export const howler: Promise<{
	Howl: new (options: howlerjs.HowlOptions) => howlerjs.Howl;
	Howler: howlerjs.HowlerGlobal;
}> = content(
	`${getOrSet('window.IRF.modules', 'howler', `(${howlerPromise.toString()})(window.IRF.vdom.container)`)}\n${getFromPageWindow.toString()}`,
);
