import globalCss from '../style.css';
import moduleStyles, { stylesheet as moduleCss } from '../style.module.css';
import panelStyles, { stylesheet as panelCss } from './panel.module.css';
import containerStyles, { stylesheet as containerCss } from './container.module.css';

import { ui } from '../data/internal';
import { container } from '../data/dom';
import type { ParsedMeta, ScriptMeta } from '../data/types';
import { content, getOrSet, ifExistingVersionLessThan } from './util';

function addStyle(css: string, style: HTMLStyleElement) {
	style.setAttribute('type', 'text/css');
	style.textContent = css;

	const head = document.getElementsByTagName('head')[0];
	if (head && !head.contains(style)) head.appendChild(style);

	return style;
}

function createPanelButton() {
	addStyle(globalCss, ui.globalStyles);
	addStyle(moduleCss, ui.moduleStyles);

	// This code is explicitly designed to *overwrite* any old version of IRF's attributes.
	ui.panelButton.className = moduleStyles['panel-button'];

	ui.panelIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	ui.panelIcon.setAttribute('viewBox', '0 0 24 24');
	ui.panelIcon.setAttribute('fill', 'currentColor');
	ui.panelIcon.setAttribute('class', moduleStyles['panel-icon']);

	ui.panelPath.setAttribute(
		'd',
		'M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0Z',
	);
	ui.panelIcon.appendChild(ui.panelPath);
	ui.panelButton.appendChild(ui.panelIcon);

	container.then((container) => {
		if (!container.contains(ui.panelButton)) container.appendChild(ui.panelButton);
	});
}

function createPanel() {
	// This code is explicitly designed to *overwrite* any old version of IRF's attributes.
	ui.panel.wrapper.className = panelStyles['wrapper'];
	ui.panel.body.className = panelStyles['body'];
	ui.panel.wrapper.append(ui.panel.body);
	ui.panel.styles.setAttribute('type', 'text/css');
	ui.panel.styles.textContent = panelCss;
	ui.panel.shadowRoot.append(ui.panel.styles);
	ui.panel.shadowRoot.append(ui.panel.wrapper);
	ui.panel.body.append(ui.panel.container.host);

	ui.panel.container.host.className = panelStyles['container'];
	ui.panel.container.styles.setAttribute('type', 'text/css');
	ui.panel.container.styles.textContent = containerCss;
	ui.panel.container.shadowRoot.append(ui.panel.container.styles);

	ui.panel.body.append(ui.panel.footer);
	ui.panel.footer.classList.add(panelStyles['footer']);

	// function (downEvent: MouseEvent) {
	// 	const onMouseMove = (moveEvent: MouseEvent) => {
	// 		if (!window.IRF.internal.ui.panel.dragging) return;
	// 		const { x, y } = window.IRF.internal.ui.panel.dragging;
	// 		const { clientX, clientY } = moveEvent;
	// 		const position = { top: 'auto', left: 'auto', right: 'auto', bottom: 'auto' };
	// 		const { clientWidth, clientHeight } = document.documentElement;
	// 		const width = window.IRF.internal.ui.panel.wrapper.offsetWidth;
	// 		const height = window.IRF.internal.ui.panel.wrapper.offsetHeight;
	// 		const left = Math.min(clientWidth - width, Math.max(0, clientX - x));
	// 		const top = Math.min(clientHeight - height, Math.max(0, clientY - y));
	// 		position.left = left + 'px';
	// 		position.top = top + 'px';
	// 		Object.assign(window.IRF.internal.ui.panel.wrapper.style, position);
	// 	};

	// 	const onMouseUp = () => {
	// 		Object.defineProperty(window.IRF.internal.ui.panel, 'dragging', {
	// 			configurable: !0,
	// 			enumerable: !1,
	// 			writable: !1,
	// 			value: null,
	// 		});
	// 		document.removeEventListener('mousemove', onMouseMove);
	// 		document.removeEventListener('mouseup', onMouseUp);
	// 		window.IRF.internal.ui.panel.wrapper.classList.remove(panelStyles['grabbing']);
	// 	};

	// 	downEvent.preventDefault();
	// 	downEvent.stopPropagation();
	// 	const { x, y } = window.IRF.internal.ui.panel.wrapper.getBoundingClientRect();
	// 	const { clientX, clientY } = downEvent;
	// 	Object.defineProperty(window.IRF.internal.ui.panel, 'dragging', {
	// 		configurable: !0,
	// 		enumerable: !1,
	// 		writable: !1,
	// 		value: { x: clientX - x, y: clientY - y },
	// 	});
	// 	window.IRF.internal.ui.panel.wrapper.classList.add(panelStyles['grabbing']);
	// 	document.addEventListener('mousemove', onMouseMove);
	// 	document.addEventListener('mouseup', onMouseUp);
	// };
	ui.panel.setDrag(
		`function(e){let n=e=>{if(!window.IRF.internal.ui.panel.dragging)return;let{x:n,y:a}=window.IRF.internal.ui.panel.dragging,{clientX:t,clientY:r}=e,i={top:"auto",left:"auto",right:"auto",bottom:"auto"},{clientWidth:l,clientHeight:p}=document.documentElement,u=window.IRF.internal.ui.panel.wrapper.offsetWidth,o=window.IRF.internal.ui.panel.wrapper.offsetHeight;i.left=Math.min(l-u,Math.max(0,t-n))+"px",i.top=Math.min(p-o,Math.max(0,r-a))+"px",Object.assign(window.IRF.internal.ui.panel.wrapper.style,i)},a=()=>{Object.defineProperty(window.IRF.internal.ui.panel,"dragging",{configurable:!0,enumerable:!1,writable:!1,value:null}),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a),window.IRF.internal.ui.panel.wrapper.classList.remove('${panelStyles['grabbing']}')};e.preventDefault(),e.stopPropagation();let{x:t,y:r}=window.IRF.internal.ui.panel.wrapper.getBoundingClientRect(),{clientX:i,clientY:l}=e;Object.defineProperty(window.IRF.internal.ui.panel,"dragging",{configurable:!0,enumerable:!1,writable:!1,value:{x:i-t,y:l-r}}),window.IRF.internal.ui.panel.wrapper.classList.add('${panelStyles['grabbing']}'),document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}`,
	);

	// async function () {
	// 	const container = await window.IRF.dom.container;
	// 	const shouldCreateTabs = !container.contains(window.IRF.internal.ui.panel.host);
	// 	container.append(window.IRF.internal.ui.panel.host);
	// 	const { width, height } = window.IRF.internal.ui.panel.body.getBoundingClientRect();
	// 	const x = window.innerWidth / 2 - width / 2;
	// 	const y = window.innerHeight / 2 - height / 2;
	// 	window.IRF.internal.ui.panel.wrapper.style.inset = `${y}px auto auto ${x}px`;
	// 	if (shouldCreateTabs) {
	//		window.IRF.internal.ui.panel.container.createContainer(containerStyles);
	//		window.IRF.internal.ui.panel.createFooter(panelStyles);
	// 		window.IRF.internal.ui.panel.createTabs(panelStyles);
	// 	}
	// };
	ui.panel.setShow(
		`async function(){let n=await window.IRF.dom.container,e=!n.contains(window.IRF.internal.ui.panel.host);n.append(window.IRF.internal.ui.panel.host);let{width:t,height:a}=window.IRF.internal.ui.panel.body.getBoundingClientRect(),i=window.innerWidth/2-t/2,l=window.innerHeight/2-a/2;window.IRF.internal.ui.panel.wrapper.style.inset=l+'px auto auto '+i+'px',e&&(window.IRF.internal.ui.panel.container.createContainer(${JSON.stringify(containerStyles)}),window.IRF.internal.ui.panel.createFooter(${JSON.stringify(panelStyles)}),window.IRF.internal.ui.panel.createTabs(${JSON.stringify(panelStyles)}))}`,
	);

	// function () {
	// 	window.IRF.internal.ui.panel.container.shadowRoot.innerHTML = '';
	// 	window.IRF.internal.ui.panel.footer.innerHTML = '';
	// 	window.IRF.internal.ui.panel.body.innerHTML = '';
	// 	window.IRF.internal.ui.panel.body.append(window.IRF.internal.ui.panel.container.host);
	// 	window.IRF.internal.ui.panel.body.append(window.IRF.internal.ui.panel.footer);
	// 	window.IRF.internal.ui.panel.host.remove();
	// };
	ui.panel.setHide(
		'function(){window.IRF.internal.ui.panel.container.shadowRoot.innerHTML="",window.IRF.internal.ui.panel.footer.innerHTML="",window.IRF.internal.ui.panel.body.innerHTML="",window.IRF.internal.ui.panel.body.append(window.IRF.internal.ui.panel.container.host),window.IRF.internal.ui.panel.body.append(window.IRF.internal.ui.panel.footer),window.IRF.internal.ui.panel.host.remove()}',
	);
}

function createTabs(styles: { [key: string]: string }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const panel = ((window as any).IRF.internal.ui as typeof ui).panel;
	const header = document.createElement('irf-' + Math.random().toString(36).slice(2, 8));
	header.classList.add(styles['header']);

	const chevronIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	chevronIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	chevronIcon.setAttribute('viewBox', '0 0 24 24');
	chevronIcon.setAttribute('fill', 'none');
	chevronIcon.setAttribute('stroke-width', '1.5');
	chevronIcon.setAttribute('stroke', 'currentColor');
	chevronIcon.classList.add(styles['header-icon']);
	const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	chevronPath.setAttribute('stroke-linecap', 'round');
	chevronPath.setAttribute('stroke-linejoin', 'round');
	chevronPath.setAttribute('d', 'm19.5 8.25-7.5 7.5-7.5-7.5');
	chevronIcon.appendChild(chevronPath);

	const closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	closeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	closeIcon.setAttribute('viewBox', '0 0 24 24');
	closeIcon.setAttribute('fill', 'none');
	closeIcon.setAttribute('stroke-width', '1.5');
	closeIcon.setAttribute('stroke', 'currentColor');
	closeIcon.classList.add(styles['header-icon']);
	const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	closePath.setAttribute('stroke-linecap', 'round');
	closePath.setAttribute('stroke-linejoin', 'round');
	closePath.setAttribute('d', 'M6 18 18 6M6 6l12 12');
	closeIcon.appendChild(closePath);

	const leftButton = document.createElement('button');
	leftButton.classList.add(styles['tabs-left']);
	leftButton.appendChild(chevronIcon);
	const tabs = document.createElement('irf-' + Math.random().toString(36).slice(2, 8));
	tabs.classList.add(styles['tabs']);
	const rightButton = document.createElement('button');
	rightButton.classList.add(styles['tabs-right']);
	rightButton.appendChild(chevronIcon.cloneNode(true));
	const closeButton = document.createElement('button');
	closeButton.classList.add(styles['panel-close']);
	closeButton.appendChild(closeIcon);

	leftButton.addEventListener('click', () => {
		tabs.scrollBy({ left: -150, behavior: 'smooth' });
	});

	rightButton.addEventListener('click', () => {
		tabs.scrollBy({ left: 150, behavior: 'smooth' });
	});

	closeButton.addEventListener('click', () => panel.hide());

	header.append(leftButton);
	header.append(tabs);
	header.append(rightButton);
	header.append(closeButton);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const puzzleIcon = ((window as any).IRF.internal.ui as typeof ui).panelIcon.cloneNode(true) as SVGSVGElement;
	puzzleIcon.setAttribute('class', `${styles['header-icon']} ${styles['puzzle-icon']}`);
	header.appendChild(puzzleIcon);

	panel.container.host.before(header);

	const tabNames = panel.tabMeta.map((tabs) => tabs.info.tabName);
	tabNames.forEach((title, index) => {
		const tab = document.createElement('button');
		tab.classList.add(styles['tab']);
		tab.textContent = title;
		if (index === 0) {
			tab.classList.add(styles['active']);

			panel.container.shadowRoot.innerHTML = '';
			panel.container.shadowRoot.append(panel.container.styles);
			if (panel.tabMeta[index].styles !== '') {
				const tabStyles = document.createElement('style');
				tabStyles.setAttribute('type', 'text/css');
				tabStyles.textContent = panel.tabMeta[index].styles;
				panel.container.shadowRoot.append(tabStyles);
			}
			panel.container.shadowRoot.append(panel.tabMeta[index].container);

			let footerText = panel.tabMeta[index].info.name;
			if (panel.tabMeta[index].info.version !== null) footerText += ` v${panel.tabMeta[index].info.version}`;
			if (panel.tabMeta[index].info.author !== null) footerText += ` by ${panel.tabMeta[index].info.author}`;
			panel.footer.innerHTML = '';
			const tabInfo = document.createElement('span');
			tabInfo.classList.add(styles['footer-left']);
			tabInfo.textContent = footerText;
			const irfInfo = document.createElement('span');
			irfInfo.classList.add(styles['footer-right']);
			irfInfo.textContent = 'IRF v' + 'process.env.VERSION'.split('-')[0];
			panel.footer.append(tabInfo);
			panel.footer.append(irfInfo);
		}
		tab.addEventListener('click', () => {
			tabs.querySelectorAll(`.${styles['tab']}`).forEach((t) => t.classList.remove(styles['active']));
			tab.classList.add(styles['active']);

			panel.container.shadowRoot.innerHTML = '';
			panel.container.shadowRoot.append(panel.container.styles);
			if (panel.tabMeta[index].styles !== '') {
				const tabStyles = document.createElement('style');
				tabStyles.setAttribute('type', 'text/css');
				tabStyles.textContent = panel.tabMeta[index].styles;
				panel.container.shadowRoot.append(tabStyles);
			}
			panel.container.shadowRoot.append(panel.tabMeta[index].container);

			let footerText = panel.tabMeta[index].info.name;
			if (panel.tabMeta[index].info.version !== null) footerText += ` v${panel.tabMeta[index].info.version}`;
			if (panel.tabMeta[index].info.author !== null) footerText += ` by ${panel.tabMeta[index].info.author}`;
			panel.footer.innerHTML = '';
			const tabInfo = document.createElement('span');
			tabInfo.classList.add(styles['footer-left']);
			tabInfo.textContent = footerText;
			const irfInfo = document.createElement('span');
			irfInfo.classList.add(styles['footer-right']);
			irfInfo.textContent = 'IRF v' + 'process.env.VERSION'.split('-')[0];
			panel.footer.append(tabInfo);
			panel.footer.append(irfInfo);
		});
		tabs.appendChild(tab);
	});

	const updateArrows = () => {
		const scrollLeft = tabs.scrollLeft;
		const scrollRight = tabs.scrollWidth - tabs.clientWidth - scrollLeft;
		leftButton.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
		rightButton.style.visibility = scrollRight > 1 ? 'visible' : 'hidden';
	};
	tabs.addEventListener('scroll', updateArrows);
	window.addEventListener('resize', updateArrows);
	updateArrows();
}

function createContainer(styles: { [key: string]: string }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const panel = ((window as any).IRF.internal.ui as typeof ui).panel;

	const container = document.createElement('irf-' + Math.random().toString(36).slice(2, 8));
	container.classList.add(styles['container']);
	panel.container.shadowRoot.append(container);

	const empty = document.createElement('span');
	empty.classList.add(styles['empty']);
	empty.textContent = "There's nothing to see here :(";
	container.append(empty);
}

function createFooter(styles: { [key: string]: string }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const panel = ((window as any).IRF.internal.ui as typeof ui).panel;

	const tabInfo = document.createElement('span');
	tabInfo.classList.add(styles['footer-left']);
	tabInfo.textContent = '';

	const irfInfo = document.createElement('span');
	irfInfo.classList.add(styles['footer-right']);
	irfInfo.textContent = 'IRF v' + 'process.env.VERSION'.split('-')[0];

	panel.footer.append(tabInfo);
	panel.footer.append(irfInfo);
}

if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
	if (ifExistingVersionLessThan('process.env.VERSION')) {
		if (document.readyState === 'complete') {
			createPanelButton();
			createPanel();
			ui.panel.container.setCreateContainer(createContainer.toString());
			ui.panel.setCreateFooter(createFooter.toString());
			ui.panel.setCreateTabs(createTabs.toString());
		} else {
			window.addEventListener(
				'load',
				() => {
					createPanelButton();
					createPanel();
					ui.panel.container.setCreateContainer(createContainer.toString());
					ui.panel.setCreateFooter(createFooter.toString());
					ui.panel.setCreateTabs(createTabs.toString());
				},
				{ once: true },
			);
		}
	}
}

function createTabForGlobal(
	styles: { [key: string]: string },
	info: string | { script: ScriptMeta; scriptMetaStr: string },
	options?: { tabName?: string; className?: string; style?: string },
) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const panel = ((window as any).IRF.internal.ui as typeof ui).panel;

	let parsedMeta: ParsedMeta;
	if (typeof info === 'string') {
		if (info === '') {
			throw new Error('`info` must be a non-empty string.');
		}
		parsedMeta = {
			name: info,
			tabName: typeof options?.tabName === 'string' && options?.tabName !== '' ? options?.tabName : info,
			namespace: null,
			description: null,
			version: null,
			author: null,
			icon: null,
			license: null,
			homepage: null,
			supportURL: null,
			downloadURL: null,
			updateURL: null,
			contributionURL: null,
		};
	} else {
		if (typeof info.scriptMetaStr !== 'string') {
			throw new Error('`info.scriptMetaStr` must be a userscript meta block.');
		}

		const getStringFromInfo = (key: string, regex: RegExp): string | null => {
			return info.script[key]?.trim() || (info.scriptMetaStr.match(regex)?.[1].trim() ?? null);
		};
		const getURLFromInfo = (key: string, regex: RegExp): URL | null => {
			try {
				const url = new URL(getStringFromInfo(key, regex));
				return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
			} catch {
				return null;
			}
		};
		const getImageFromInfo = (key: string, regex: RegExp) => {
			const url = getURLFromInfo(key, regex);
			if (url === null) return null;
			const img = new Image();
			img.src = url.href;
			return img;
		};

		const name = getStringFromInfo('name', /^\/\/[ \t\f\v]+@name[ \t\f\v]+(.+)$/m);
		parsedMeta = {
			name: name,
			tabName: typeof options?.tabName === 'string' && options?.tabName !== '' ? options?.tabName : name,
			namespace: getStringFromInfo('namespace', /^\/\/[ \t\f\v]+@namespace[ \t\f\v]+(.+)$/m),
			description: getStringFromInfo('description', /^\/\/[ \t\f\v]+@description[ \t\f\v]+(.+)$/m),
			version: getStringFromInfo('version', /^\/\/[ \t\f\v]+@version[ \t\f\v]+(.+)$/m),
			author: getStringFromInfo('author', /^\/\/[ \t\f\v]+@author[ \t\f\v]+(.+)$/m),
			icon: getImageFromInfo('icon', /^\/\/[ \t\f\v]+@(?:icon|iconURL|defaulticon|icon64|icon64URL)[ \t\f\v]+(.+)$/m),
			license: getStringFromInfo('license', /^\/\/[ \t\f\v]+@license[ \t\f\v]+(.+)$/m),
			homepage: getURLFromInfo('homepage', /^\/\/[ \t\f\v]+@(?:homepage|homepageURL|website|source)[ \t\f\v]+(.+)$/m),
			supportURL: getURLFromInfo('supportURL', /^\/\/[ \t\f\v]+@(?:support|supportURL)[ \t\f\v]+(.+)$/m),
			downloadURL: getURLFromInfo('downloadURL', /^\/\/[ \t\f\v]+@(?:downloadURL|installURL)[ \t\f\v]+(.+)$/m),
			updateURL: getURLFromInfo('updateURL', /^\/\/[ \t\f\v]+@updateURL[ \t\f\v]+(.+)$/m),
			contributionURL: getURLFromInfo('contributionURL', /^\/\/[ \t\f\v]+@contributionURL[ \t\f\v]+(.+)$/m),
		};

		if (parsedMeta.name === null || parsedMeta.name === '') {
			throw new Error('Your script must have a valid name!');
		}
	}

	const container = document.createElement('irf-' + Math.random().toString(36).slice(2, 8));
	container.classList.add(styles['container']);
	container.addEventListener('mousedown', (event) => {
		if (event.button !== 1) event.stopPropagation();
	});
	if (options?.className) container.classList.add(options.className);
	panel.tabMeta.push({ info: parsedMeta, container, styles: options?.style ?? '' });
	return { container };
}

content(getOrSet('window.IRF', 'ui', '{}'));
content(getOrSet('window.IRF.ui', 'panel', '{}'));
content(
	getOrSet(
		'window.IRF.ui.panel',
		'createTabFor',
		`function(i,o){return (${createTabForGlobal.toString()})(${JSON.stringify(containerStyles)},i,o)}`,
	),
);
type OmitStyles<F> = F extends (...args: [infer _styles, ...infer rest]) => infer R ? (...args: rest) => R : never;
export const createTabFor: OmitStyles<typeof createTabForGlobal> = (
	info: string | { script: ScriptMeta; scriptMetaStr: string },
	options?: { tabName?: string; className?: string; style?: string },
) => {
	if (typeof info === 'string') {
		return content(`window.IRF.ui.panel.createTabFor(\`${info}\`, ${JSON.stringify(options)});`);
	} else {
		return content(
			`window.IRF.ui.panel.createTabFor(${JSON.stringify({ script: info.script, scriptMetaStr: info.scriptMetaStr })}, ${JSON.stringify(options)});`,
		);
	}
};

export const styles: {
	toggle: string;
	slider: string;
} = content(
	getOrSet(
		'window.IRF.ui.panel',
		'styles',
		`${JSON.stringify(Object.fromEntries(Object.entries(containerStyles).filter(([key]) => !['container', 'empty'].includes(key))))}`,
	),
);
