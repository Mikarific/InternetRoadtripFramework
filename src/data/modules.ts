import * as howlerjs from 'howler';
import type * as maplibregl from 'maplibre-gl';
import type matterjs from 'matter-js';

import * as vdom from './vdom';

export const maplibre: Promise<typeof maplibregl> = new Promise((resolve) => {
	vdom.map.then((vMap) => {
		if (typeof webpackJsonp === 'undefined') {
			const script = document.createElement('script');
			script.textContent = `(function(){window.maplibre=Object.values(webpackJsonp.push([[],{['']:(_,e,r)=>{e.cache=r.c}},[['']]]).cache).find(m=>m?.exports?.Map&&document.querySelector('.map-container').__vue__._data.map instanceof m?.exports?.Map).exports;})();`;
			document.documentElement.appendChild(script);
			script.remove();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resolve((('wrappedJSObject' in window ? window.wrappedJSObject : window) as any).maplibre);
		} else {
			const maplibre = (
				Object.values(
					webpackJsonp.push([
						[],
						{
							['']: (_, e, r) => {
								e.cache = r.c;
							},
						},
						[['']],
					]).cache,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				).find((m: any) => m?.exports?.Map && vMap.data.map instanceof m?.exports?.Map) as any
			).exports;
			resolve(maplibre);
		}
	});
});

export const matter: Promise<typeof matterjs> = new Promise((resolve) => {
	vdom.container.then(() => {
		if (typeof webpackJsonp === 'undefined') {
			const script = document.createElement('script');
			script.textContent = `(function(){window.matter=Object.values(webpackJsonp.push([[],{['']:(_,e,r)=>{e.cache=r.c}},[['']]]).cache).find(m=>m?.exports?.name==='matter-js').exports;})();`;
			document.documentElement.appendChild(script);
			script.remove();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resolve((('wrappedJSObject' in window ? window.wrappedJSObject : window) as any).matter);
		} else {
			const matter = (
				Object.values(
					webpackJsonp.push([
						[],
						{
							['']: (_, e, r) => {
								e.cache = r.c;
							},
						},
						[['']],
					]).cache,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				).find((m: any) => m?.exports?.name === 'matter-js') as any
			).exports;
			resolve(matter);
		}
	});
});

export const howler: Promise<{
	Howl: new (options: howlerjs.HowlOptions) => howlerjs.Howl;
	Howler: howlerjs.HowlerGlobal;
}> = new Promise((resolve) => {
	vdom.container.then(() => {
		resolve({
			Howl:
				typeof Howl === 'undefined' ?
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(('wrappedJSObject' in window ? window.wrappedJSObject : window) as any).Howl
				:	Howl,
			Howler:
				typeof Howler === 'undefined' ?
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(('wrappedJSObject' in window ? window.wrappedJSObject : window) as any).Howler
				:	Howler,
		});
	});
});
