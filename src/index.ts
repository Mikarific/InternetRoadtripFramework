import './lib/refresh';
import './data/internal';

export const version: string = 'process.env.VERSION';
export const isInternetRoadtrip =
	window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/';

import * as dom from './data/dom';
export { dom };

import * as vdom from './data/vdom';
export { vdom };
