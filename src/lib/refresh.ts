import { flags } from '../data/internal';
import { getFromPageWindow } from './util';

function createRefreshListeners() {
	getFromPageWindow('history').pushState = new Proxy(history.pushState, {
		apply: (target, thisArg, argsList) => {
			if (argsList[2] !== undefined) {
				const newURL = new URL(argsList[2], document.baseURI);
				const isInternetRoadtrip = newURL.hostname === 'neal.fun' && newURL.pathname === '/internet-roadtrip/';
				const fromInternetRoadtrip = location.hostname === 'neal.fun' && location.pathname === '/internet-roadtrip/';
				if (isInternetRoadtrip && !fromInternetRoadtrip) location.replace(newURL);
			}
			return Reflect.apply(target, thisArg, argsList);
		},
	});

	getFromPageWindow('history').replaceState = new Proxy(history.replaceState, {
		apply: (target, thisArg, argsList) => {
			if (argsList[2] !== undefined) {
				const newURL = new URL(argsList[2], document.baseURI);
				const isInternetRoadtrip = newURL.hostname === 'neal.fun' && newURL.pathname === '/internet-roadtrip/';
				const fromInternetRoadtrip = location.hostname === 'neal.fun' && location.pathname === '/internet-roadtrip/';
				if (isInternetRoadtrip && !fromInternetRoadtrip) location.replace(newURL);
			}
			return Reflect.apply(target, thisArg, argsList);
		},
	});

	getFromPageWindow('addEventListener')('popstate', () => {
		const newURL = new URL(window.location.href);
		const isInternetRoadtrip = newURL.hostname === 'neal.fun' && newURL.pathname === '/internet-roadtrip/';
		const fromInternetRoadtrip = location.hostname === 'neal.fun' && location.pathname === '/internet-roadtrip/';
		if (isInternetRoadtrip && !fromInternetRoadtrip) location.replace(newURL);
	});
}

if (window.location.hostname === 'neal.fun' && !flags.refreshOnStateChange) {
	if (document.readyState === 'complete') {
		createRefreshListeners();
	} else {
		window.addEventListener('load', createRefreshListeners, { once: true });
	}
	flags.refreshOnStateChange = true;
}
