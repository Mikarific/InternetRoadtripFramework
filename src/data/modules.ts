import * as howlerjs from 'howler';
import type * as maplibregl from 'maplibre-gl';
import type matterjs from 'matter-js';

import * as vdom from './vdom';
import { getFromPageWindow, runInContentContext, runInPageContext } from '../lib/util';

export const maplibre: Promise<typeof maplibregl> = new Promise((resolve) => {
	vdom.map.then(() => {
		if (typeof webpackJsonp === 'undefined') {
			runInPageContext(
				'window.maplibre=Object.values(webpackJsonp.push([[],{""(e,a,p){a.cache=p.c}},[[""]],]).cache).find(e=>e?.exports?.Map&&document.querySelector(".map-container").__vue__._data.map instanceof e?.exports?.Map).exports;',
			);
			resolve(getFromPageWindow('maplibre'));
		} else {
			resolve(
				runInContentContext(
					'Object.values(webpackJsonp.push([[],{""(e,a,p){a.cache=p.c}},[[""]],]).cache).find(e=>e?.exports?.Map&&document.querySelector(".map-container").__vue__._data.map instanceof e?.exports?.Map).exports;',
				),
			);
		}
	});
});

export const matter: Promise<typeof matterjs> = new Promise((resolve) => {
	vdom.container.then(() => {
		if (typeof webpackJsonp === 'undefined') {
			runInPageContext(
				'window.matter=Object.values(webpackJsonp.push([[],{""(e,a,c){a.cache=c.c}},[[""]]]).cache).find(e=>"matter-js"===e?.exports?.name).exports;',
			);
			resolve(getFromPageWindow('matter'));
		} else {
			resolve(
				runInContentContext(
					'Object.values(webpackJsonp.push([[],{""(e,a,c){a.cache=c.c}},[[""]]]).cache).find(e=>"matter-js"===e?.exports?.name).exports;',
				),
			);
		}
	});
});

export const howler: Promise<{
	Howl: new (options: howlerjs.HowlOptions) => howlerjs.Howl;
	Howler: howlerjs.HowlerGlobal;
}> = new Promise((resolve) => {
	vdom.container.then(() => {
		resolve({
			Howl: typeof Howl !== 'undefined' ? Howl : getFromPageWindow('Howl'),
			Howler: typeof Howler !== 'undefined' ? Howler : getFromPageWindow('Howler'),
		});
	});
});
