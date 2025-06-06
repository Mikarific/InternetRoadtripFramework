import { getOrSet, content, getOrSetWithOverrideVersion } from '../lib/util';

function domPromise<T extends Element = Element>(className: string, check?: (elem: T) => boolean): Promise<T> {
	return new Promise((resolve) => {
		const elem = document.querySelector(`.${className}`);
		if (elem && elem.classList.contains(className) && (!check || check(elem as T))) {
			resolve(elem as T);
		} else {
			const observer = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					for (const node of mutation.addedNodes) {
						if (!(node instanceof Element)) continue;

						if (node.classList.contains(className) && (!check || check(node as T))) {
							observer.disconnect();
							return resolve(node as T);
						}

						const match = node.querySelector(`.${className}`);
						if (match && match.classList.contains(className) && (!check || check(match as T))) {
							observer.disconnect();
							return resolve(match as T);
						}

						const fallback = document.querySelector(`.${className}`);
						if (fallback && fallback.classList.contains(className) && (!check || check(fallback as T))) {
							observer.disconnect();
							return resolve(fallback as T);
						}
					}
				}
			});

			observer.observe(document.documentElement, {
				childList: true,
				subtree: true,
			});
		}
	});
}

function siblingExists(className: string) {
	return (el: Element): boolean => {
		return el.parentElement.querySelector(`.${className}`) !== null;
	};
}

const getDomElement = (name: string, className: string, version: string = null, check?: string) => {
	if (version === null) {
		return content(
			getOrSet('window.IRF.dom', name, `(${domPromise.toString()})('${className}'${check ? `,${check}` : ''})`),
		);
	} else {
		return content(
			getOrSetWithOverrideVersion(
				'window.IRF.dom',
				name,
				`(${domPromise.toString()})('${className}'${check ? `,${check}` : ''})`,
				version,
			),
		);
	}
};

content(getOrSet('window.IRF', 'dom', '{}'));
export const container: Promise<HTMLDivElement> = getDomElement('container', 'container');
export const wheel: Promise<HTMLDivElement> = getDomElement('wheel', 'wheel-container');
export const radio: Promise<HTMLDivElement> = getDomElement('radio', 'car-radio');
export const freshener: Promise<HTMLDivElement> = getDomElement('freshener', 'freshener-container');
export const title: Promise<HTMLDivElement> = getDomElement('title', 'nuxt-link-active');
export const map: Promise<HTMLDivElement> = getDomElement('map', 'map-container');
export const chat: Promise<HTMLDivElement> = getDomElement('chat', 'chat-container');
export const options: Promise<HTMLDivElement> = getDomElement('options', 'options');
export const odometer: Promise<HTMLDivElement> = getDomElement('odometer', 'odometer-container');
export const results: Promise<HTMLDivElement> = getDomElement('results', 'results');

export const place: Promise<HTMLDivElement> = getDomElement('place', 'place');
export const drivers: Promise<HTMLDivElement> = getDomElement(
	'drivers',
	'drivers',
	null,
	`(${siblingExists.toString()})('place')`,
);
