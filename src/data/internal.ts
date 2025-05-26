import { runInContentContext } from '../lib/util';
import { IRF as windowIRF } from './types';

// (typeof window.IRF !== 'undefined' && window.IRF) || (window.IRF = {});
const IRF = runInContentContext('void 0!==window.IRF&&window.IRF||(window.IRF={});') as windowIRF;
const panelHost = document.createElement('irf-' + Math.random().toString(36).slice(2, 8));
if (IRF.internal === undefined) {
	Object.defineProperty(IRF, 'internal', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {
			flags: {
				refreshOnStateChange: false,
			},
			ui: {
				globalStyles: document.createElement('style'),
				moduleStyles: document.createElement('style'),
				panelButton: document.createElement('button'),
				panelIcon: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				panelPath: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
				panel: {
					host: panelHost,
					root: panelHost.attachShadow({ mode: 'open' }),
					wrapper: document.createElement('irf-' + Math.random().toString(36).slice(2, 8)),
					body: document.createElement('irf-' + Math.random().toString(36).slice(2, 8)),
					styles: document.createElement('style'),
					tabMeta: [],
					show: () => {},
					hide: () => {},
				},
			},
		},
	});
}

export const flags = Object.fromEntries(
	Object.keys(IRF.internal.flags).map((flag) => [
		flag,
		{
			get() {
				return runInContentContext(`window.IRF.internal.flags.${flag};`);
			},
			set(value: boolean) {
				return runInContentContext(`window.IRF.internal.flags.${flag}=${value};`);
			},
		},
	]),
) as {
	[K in keyof typeof IRF.internal.flags]: {
		get(): boolean;
		set(value: boolean): void;
	};
};

export const ui: typeof IRF.internal.ui = {
	get globalStyles() {
		return runInContentContext(`window.IRF.internal.ui.globalStyles;`);
	},
	get moduleStyles() {
		return runInContentContext(`window.IRF.internal.ui.moduleStyles;`);
	},
	get panelButton() {
		return runInContentContext(`window.IRF.internal.ui.panelButton;`);
	},
	get panelIcon() {
		return runInContentContext(`window.IRF.internal.ui.panelIcon;`);
	},
	get panelPath() {
		return runInContentContext(`window.IRF.internal.ui.panelPath;`);
	},
	panel: {
		get host() {
			return runInContentContext(`window.IRF.internal.ui.panel.host;`);
		},
		get root() {
			return runInContentContext(`window.IRF.internal.ui.panel.root;`);
		},
		get wrapper() {
			return runInContentContext(`window.IRF.internal.ui.panel.wrapper;`);
		},
		get body() {
			return runInContentContext(`window.IRF.internal.ui.panel.body;`);
		},
		get styles() {
			return runInContentContext(`window.IRF.internal.ui.panel.styles;`);
		},
		get tabMeta() {
			return runInContentContext(`window.IRF.internal.ui.panel.tabMeta;`);
		},
		get show() {
			return runInContentContext(`window.IRF.internal.ui.panel.show;`);
		},
		get hide() {
			return runInContentContext(`window.IRF.internal.ui.panel.hide;`);
		},
	},
};
