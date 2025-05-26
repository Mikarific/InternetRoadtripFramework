import './data/internal';
import './lib/refresh';

export const version: string = 'process.env.VERSION';
export const isInternetRoadtrip =
	window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/';

import * as dom from './data/dom';
export { dom };

import * as vdom from './data/vdom';
export { vdom };

import * as modules from './data/modules';
export { modules };

import * as panel from './lib/panel';
export const ui = { panel: panel };
