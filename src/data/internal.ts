import { content, getOrSet } from '../lib/util';
import { ParsedMeta } from './types';

function initialize(irf) {
	const set = (obj, prop, value) =>
		Object.defineProperty(obj, prop, { configurable: true, enumerable: false, writable: false, value });

	if (irf.internal === undefined) set(irf, 'internal', {});
	if (irf.internal.flags === undefined) set(irf.internal, 'flags', {});
	if (irf.internal.ui === undefined) set(irf.internal, 'ui', {});
	if (irf.internal.ui.panel === undefined) set(irf.internal.ui, 'panel', {});
	if (irf.internal.ui.panel.container === undefined) set(irf.internal.ui.panel, 'container', {});

	// Flags
	if (irf.internal.flags.refreshOnStateChange === undefined) set(irf.internal.flags, 'refreshOnStateChange', false);

	// UI
	if (irf.internal.ui.globalStyles === undefined) set(irf.internal.ui, 'globalStyles', document.createElement('style'));
	if (irf.internal.ui.moduleStyles === undefined) set(irf.internal.ui, 'moduleStyles', document.createElement('style'));
	if (irf.internal.ui.panelButton === undefined) set(irf.internal.ui, 'panelButton', document.createElement('button'));
	if (irf.internal.ui.panelIcon === undefined) {
		set(irf.internal.ui, 'panelIcon', document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
	}
	if (irf.internal.ui.panelPath === undefined) {
		set(irf.internal.ui, 'panelPath', document.createElementNS('http://www.w3.org/2000/svg', 'path'));
	}

	const randomElem = () => document.createElement('irf-' + Math.random().toString(36).slice(2, 8));
	if (irf.internal.ui.panel.host === undefined) set(irf.internal.ui.panel, 'host', randomElem());
	if (irf.internal.ui.panel.shadowRoot === undefined) {
		set(irf.internal.ui.panel, 'shadowRoot', irf.internal.ui.panel.host.attachShadow({ mode: 'open' }));
	}
	if (irf.internal.ui.panel.wrapper === undefined) set(irf.internal.ui.panel, 'wrapper', randomElem());
	if (irf.internal.ui.panel.body === undefined) set(irf.internal.ui.panel, 'body', randomElem());
	if (irf.internal.ui.panel.styles === undefined) set(irf.internal.ui.panel, 'styles', document.createElement('style'));

	if (irf.internal.ui.panel.dragging === undefined) set(irf.internal.ui.panel, 'dragging', null);
	if (irf.internal.ui.panel.drag === undefined) set(irf.internal.ui.panel, 'drag', () => {});
	if (irf.internal.ui.panel.show === undefined) set(irf.internal.ui.panel, 'show', () => {});
	if (irf.internal.ui.panel.hide === undefined) set(irf.internal.ui.panel, 'hide', () => {});
	if (irf.internal.ui.panel.createTabs === undefined) set(irf.internal.ui.panel, 'createTabs', () => {});
	if (irf.internal.ui.panel.tabMeta === undefined) set(irf.internal.ui.panel, 'tabMeta', []);

	if (irf.internal.ui.panel.container.host === undefined) set(irf.internal.ui.panel.container, 'host', randomElem());
	if (irf.internal.ui.panel.container.shadowRoot === undefined) {
		set(
			irf.internal.ui.panel.container,
			'shadowRoot',
			irf.internal.ui.panel.container.host.attachShadow({ mode: 'open' }),
		);
	}
	if (irf.internal.ui.panel.container.styles === undefined) {
		set(irf.internal.ui.panel.container, 'styles', document.createElement('style'));
	}
	if (irf.internal.ui.panel.container.createContainer === undefined) {
		set(irf.internal.ui.panel.container, 'createContainer', () => {});
	}

	if (irf.internal.ui.panel.footer === undefined) set(irf.internal.ui.panel, 'footer', randomElem());
	if (irf.internal.ui.panel.createFooter === undefined) set(irf.internal.ui.panel, 'createFooter', () => {});
}

content(`(${initialize.toString()})(${getOrSet('window', 'IRF', '{}')});`);

export const flags = {
	get refreshOnStateChange() {
		return content('window.IRF.internal.flags.refreshOnStateChange;');
	},
	set refreshOnStateChange(value: boolean) {
		content(
			`Object.defineProperty(window.IRF.internal.flags,'refreshOnStateChange',{configurable:!0,enumerable:!1,writable:!1,value:${value}});`,
		);
	},
};

export const ui: {
	readonly globalStyles: HTMLStyleElement;
	readonly moduleStyles: HTMLStyleElement;
	readonly panelButton: HTMLButtonElement;
	readonly panelIcon: SVGSVGElement;
	readonly panelPath: SVGPathElement;
	readonly panel: {
		readonly host: HTMLElement;
		readonly shadowRoot: ShadowRoot;
		readonly wrapper: HTMLElement;
		readonly body: HTMLElement;
		readonly styles: HTMLStyleElement;
		readonly dragging: boolean;
		readonly drag: () => void;
		setDrag: (value: string) => void;
		readonly show: () => void;
		setShow: (value: string) => void;
		readonly hide: () => void;
		setHide: (value: string) => void;
		readonly createTabs: () => void;
		setCreateTabs: (value: string) => void;
		readonly tabMeta: { info: ParsedMeta; container: HTMLElement; styles: string }[];
		readonly container: {
			readonly host: HTMLElement;
			readonly shadowRoot: ShadowRoot;
			readonly styles: HTMLStyleElement;
			readonly createContainer: () => void;
			setCreateContainer: (value: string) => void;
		};
		readonly footer: HTMLElement;
		readonly createFooter: () => void;
		setCreateFooter: (value: string) => void;
	};
} = {
	get globalStyles() {
		return content('window.IRF.internal.ui.globalStyles;');
	},
	get moduleStyles() {
		return content('window.IRF.internal.ui.moduleStyles;');
	},
	get panelButton() {
		return content('window.IRF.internal.ui.panelButton;');
	},
	get panelIcon() {
		return content('window.IRF.internal.ui.panelIcon;');
	},
	get panelPath() {
		return content('window.IRF.internal.ui.panelPath;');
	},
	panel: {
		get host() {
			return content('window.IRF.internal.ui.panel.host;');
		},
		get shadowRoot() {
			return content('window.IRF.internal.ui.panel.shadowRoot;');
		},
		get wrapper() {
			return content('window.IRF.internal.ui.panel.wrapper;');
		},
		get body() {
			return content('window.IRF.internal.ui.panel.body;');
		},
		get styles() {
			return content('window.IRF.internal.ui.panel.styles;');
		},
		get dragging() {
			return content('window.IRF.internal.ui.panel.dragging;');
		},
		get drag() {
			return content('window.IRF.internal.ui.panel.drag;');
		},
		setDrag(value: string) {
			content(
				`window.IRF.internal.ui.panel.wrapper.removeEventListener('mousedown',window.IRF.internal.ui.panel.drag);Object.defineProperty(window.IRF.internal.ui.panel,'drag',{configurable:!0,enumerable:!1,writable:!1,value:${value.toString()}});window.IRF.internal.ui.panel.wrapper.addEventListener('mousedown',window.IRF.internal.ui.panel.drag);`,
			);
		},
		get show() {
			return content('window.IRF.internal.ui.panel.show;');
		},
		setShow(value: string) {
			content(
				`window.IRF.internal.ui.panelButton.removeEventListener('click',window.IRF.internal.ui.panel.show);Object.defineProperty(window.IRF.internal.ui.panel,'show',{configurable:!0,enumerable:!1,writable:!1,value:${value.toString()}});window.IRF.internal.ui.panelButton.addEventListener('click',window.IRF.internal.ui.panel.show);`,
			);
		},
		get hide() {
			return content('window.IRF.internal.ui.panel.hide;');
		},
		setHide(value: string) {
			content(
				`Object.defineProperty(window.IRF.internal.ui.panel,'hide',{configurable:!0,enumerable:!1,writable:!1,value:${value.toString()}});`,
			);
		},
		get createTabs() {
			return content('window.IRF.internal.ui.panel.createTabs;');
		},
		setCreateTabs(value: string) {
			content(
				`Object.defineProperty(window.IRF.internal.ui.panel,'createTabs',{configurable:!0,enumerable:!1,writable:!1,value:${value.toString()}});`,
			);
		},
		get tabMeta() {
			return content('window.IRF.internal.ui.panel.tabMeta;');
		},
		container: {
			get host() {
				return content('window.IRF.internal.ui.panel.container.host;');
			},
			get shadowRoot() {
				return content('window.IRF.internal.ui.panel.container.shadowRoot;');
			},
			get styles() {
				return content('window.IRF.internal.ui.panel.container.styles;');
			},
			get createContainer() {
				return content('window.IRF.internal.ui.panel.container.createContainer;');
			},
			setCreateContainer(value: string) {
				content(
					`Object.defineProperty(window.IRF.internal.ui.panel.container,'createContainer',{configurable:!0,enumerable:!1,writable:!1,value:${value.toString()}});`,
				);
			},
		},
		get footer() {
			return content('window.IRF.internal.ui.panel.footer;');
		},
		get createFooter() {
			return content('window.IRF.internal.ui.panel.createFooter;');
		},
		setCreateFooter(value: string) {
			content(
				`Object.defineProperty(window.IRF.internal.ui.panel,'createFooter',{configurable:!0,enumerable:!1,writable:!1,value:${value.toString()}});`,
			);
		},
	},
};
