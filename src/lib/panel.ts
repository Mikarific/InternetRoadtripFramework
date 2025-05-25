import globalCss from '../style.css';
import moduleStyles, { stylesheet as moduleCss } from '../style.module.css';
import panelStyles, { stylesheet as panelCss } from './panel.module.css';

import { ui } from '../data/internal';
import { container } from '../data/dom';
import type { ParsedMeta, ScriptMeta } from '../data/types';

function addStyle(css: string, override: HTMLStyleElement = null) {
	const style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.textContent = css;

	const head = document.getElementsByTagName('head')[0];
	if (head) {
		if (override === null) {
			head.appendChild(style);
		} else {
			if (head.contains(override)) {
				override.replaceWith(style);
			} else {
				head.appendChild(style);
			}
		}
	}

	return style;
}

function createPanel() {
	if (ui.panel.host !== null) ui.panel.host.remove();
	const id = 'irf-' + Math.random().toString(36).slice(2, 8);
	ui.panel.host = document.createElement(id);
	ui.panel.host.id = id;
	const root = ui.panel.host.attachShadow({ mode: 'open' });
	const wrapper = document.createElement(id);
	wrapper.className = panelStyles.panel;
	ui.panel.body = document.createElement(id);
	ui.panel.body.className = panelStyles.body;
	wrapper.append(ui.panel.body);
	ui.panel.styles = document.createElement('style');
	ui.panel.styles.setAttribute('type', 'text/css');
	ui.panel.styles.textContent = [panelCss, ...ui.panel.tabMeta.map((tabs) => tabs.styles)].join('\n\n');
	root.append(ui.panel.styles);
	root.append(wrapper);

	let dragging: { x: number; y: number } = null;

	const onMouseMove = (e: MouseEvent) => {
		if (!dragging) return;
		const { x, y } = dragging;
		const { clientX, clientY } = e;
		const position = { top: 'auto', left: 'auto', right: 'auto', bottom: 'auto' };
		const { clientWidth, clientHeight } = document.documentElement;
		const width = wrapper.offsetWidth;
		const height = wrapper.offsetHeight;
		const left = Math.min(clientWidth - width, Math.max(0, clientX - x));
		const top = Math.min(clientHeight - height, Math.max(0, clientY - y));
		position.left = `${left}px`;
		position.top = `${top}px`;
		Object.assign(wrapper.style, position);
	};

	const onMouseUp = () => {
		dragging = null;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
		wrapper.classList.remove(panelStyles['grabbing']);
	};

	wrapper.addEventListener('mousedown', (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const { x, y } = wrapper.getBoundingClientRect();
		const { clientX, clientY } = e;
		dragging = { x: clientX - x, y: clientY - y };
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
		wrapper.classList.add(panelStyles['grabbing']);
	});

	ui.panel.show = async () => {
		(await container).append(ui.panel.host);
		const { width, height } = ui.panel.body.getBoundingClientRect();
		const x = window.innerWidth / 2 - width / 2;
		const y = window.innerHeight / 2 - height / 2;
		wrapper.style.inset = `${y}px auto auto ${x}px`;
	};

	ui.panel.hide = () => {
		ui.panel.host.remove();
	};
}

function createTabs() {
	const tabWrapper = document.createElement('div');
	tabWrapper.classList.add(panelStyles['tab-wrapper']);

	const chevronIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	chevronIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	chevronIcon.setAttribute('viewBox', '0 0 24 24');
	chevronIcon.setAttribute('fill', 'none');
	chevronIcon.setAttribute('stroke-width', '1.5');
	chevronIcon.setAttribute('stroke', 'currentColor');
	chevronIcon.classList.add(panelStyles['tab-chevron']);
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
	closeIcon.classList.add(panelStyles['close-icon']);
	const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	closePath.setAttribute('stroke-linecap', 'round');
	closePath.setAttribute('stroke-linejoin', 'round');
	closePath.setAttribute('d', 'M6 18 18 6M6 6l12 12');
	closeIcon.appendChild(closePath);

	const leftButton = document.createElement('button');
	leftButton.classList.add(panelStyles['tab-left']);
	leftButton.appendChild(chevronIcon);
	const tabContainer = document.createElement('div');
	tabContainer.classList.add(panelStyles['tabs']);
	const rightButton = document.createElement('button');
	rightButton.classList.add(panelStyles['tab-right']);
	rightButton.appendChild(chevronIcon.cloneNode(true));
	const closeButton = document.createElement('button');
	closeButton.classList.add(panelStyles['panel-close']);
	closeButton.appendChild(closeIcon);

	leftButton.addEventListener('click', () => {
		tabContainer.scrollBy({ left: -150, behavior: 'smooth' });
	});

	rightButton.addEventListener('click', () => {
		tabContainer.scrollBy({ left: 150, behavior: 'smooth' });
	});

	closeButton.addEventListener('click', () => {
		ui.panel.hide();
		tabWrapper.remove();
		ui.panel.body.querySelector(`.${panelStyles['panel-container']}`)?.remove();
		ui.panel.body.querySelector(`.${panelStyles['panel-footer']}`)?.remove();
	});

	tabWrapper.append(leftButton);
	tabWrapper.append(tabContainer);
	tabWrapper.append(rightButton);
	tabWrapper.append(closeButton);
	ui.panel.body.append(tabWrapper);

	const tabNames = ui.panel.tabMeta.map((tabs) => tabs.info.tabName);
	let tabContent = createContainer();
	const tabFooter = createFooter();
	tabNames.forEach((title, index) => {
		const tab = document.createElement('button');
		tab.classList.add(panelStyles['tab']);
		tab.textContent = title;
		if (index === 0) {
			tab.classList.add(panelStyles['active']);

			tabContent.replaceWith(ui.panel.tabMeta[0].container);
			tabContent = ui.panel.tabMeta[0].container;

			let footerText = ui.panel.tabMeta[0].info.name;
			if (ui.panel.tabMeta[0].info.version !== null) footerText += ` v${ui.panel.tabMeta[0].info.version}`;
			if (ui.panel.tabMeta[0].info.author !== null) footerText += ` by ${ui.panel.tabMeta[0].info.author}`;

			tabFooter.querySelector(`.${panelStyles['footer-tab-info']}`).textContent = footerText;
		}
		tab.addEventListener('click', () => {
			tabContainer.querySelectorAll(`.${panelStyles['tab']}`).forEach((t) => t.classList.remove(panelStyles['active']));
			tab.classList.add(panelStyles['active']);

			tabContent.replaceWith(ui.panel.tabMeta[index].container);
			tabContent = ui.panel.tabMeta[index].container;

			let footerText = ui.panel.tabMeta[index].info.name;
			if (ui.panel.tabMeta[index].info.version !== null) footerText += ` v${ui.panel.tabMeta[index].info.version}`;
			if (ui.panel.tabMeta[index].info.author !== null) footerText += ` by ${ui.panel.tabMeta[index].info.author}`;

			tabFooter.querySelector(`.${panelStyles['footer-tab-info']}`).textContent = footerText;
		});
		tabContainer.appendChild(tab);
	});

	const updateArrows = () => {
		const scrollLeft = tabContainer.scrollLeft;
		const scrollRight = tabContainer.scrollWidth - tabContainer.clientWidth - scrollLeft;
		leftButton.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
		rightButton.style.visibility = scrollRight > 1 ? 'visible' : 'hidden';
	};
	tabContainer.addEventListener('scroll', updateArrows);
	window.addEventListener('resize', updateArrows);
	return { updateArrows };
}

function createContainer() {
	const container = document.createElement('div');
	container.classList.add(panelStyles['panel-container']);

	const empty = document.createElement('span');
	empty.classList.add(panelStyles['panel-empty']);
	empty.textContent = "There's nothing to see here :(";

	container.append(empty);
	ui.panel.body.append(container);
	return container;
}

function createFooter() {
	const footer = document.createElement('div');
	footer.classList.add(panelStyles['panel-footer']);

	const tabInfo = document.createElement('span');
	tabInfo.classList.add(panelStyles['footer-tab-info']);
	tabInfo.textContent = '';

	const irfInfo = document.createElement('span');
	irfInfo.classList.add(panelStyles['footer-irf-info']);
	irfInfo.textContent = 'IRF v' + 'process.env.VERSION'.split('-')[0];

	footer.append(tabInfo);
	footer.append(irfInfo);
	ui.panel.body.append(footer);
	return footer;
}

function createPanelButton() {
	ui.globalStyles = addStyle(globalCss, ui.globalStyles);
	ui.moduleStyles = addStyle(moduleCss, ui.moduleStyles);

	if (ui.panelButton !== null) ui.panelButton.remove();
	ui.panelButton = document.createElement('button');
	ui.panelButton.classList.add(moduleStyles['panel-button']);

	const panelIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	panelIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	panelIcon.setAttribute('viewBox', '0 0 24 24');
	panelIcon.setAttribute('fill', 'currentColor');
	panelIcon.classList.add(moduleStyles['panel-icon']);
	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute(
		'd',
		'M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0Z',
	);
	panelIcon.appendChild(path);
	ui.panelButton.appendChild(panelIcon);
	createPanel();
	container.then((container) => {
		ui.panelButton.addEventListener('click', () => {
			if (!container.contains(ui.panel.host)) {
				const tabs = createTabs();
				tabs.updateArrows();
			}
			ui.panel.show();
		});
		container.appendChild(ui.panelButton);
	});
}

if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
	if (document.readyState === 'complete') {
		createPanelButton();
	} else {
		window.addEventListener('load', createPanelButton, { once: true });
	}
}

export function createTabFor(
	info: string | { script: ScriptMeta; scriptMetaStr: string },
	options?: { tabName?: string; className?: string; style?: string },
): {
	container: HTMLDivElement;
} {
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

	const container = document.createElement('div');
	container.classList.add(panelStyles['panel-container']);
	if (options?.className) container.classList.add(options.className);
	if (ui.panel.styles !== null) {
		ui.panel.styles.textContent = [panelCss, ...ui.panel.tabMeta.map((tabs) => tabs.styles)].join('\n\n');
	}
	ui.panel.tabMeta.push({ info: parsedMeta, container, styles: options?.style ?? '' });
	return { container };
}

export const styles = {
	toggle: panelStyles['toggle'],
	slider: panelStyles['slider'],
};
