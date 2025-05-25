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

export const container: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('container');
export const wheel: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('wheel-container');
export const radio: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('car-radio');
export const freshener: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('freshener-container');
export const title: Promise<HTMLAnchorElement> = domPromise<HTMLAnchorElement>('nuxt-link-active');
export const map: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('map-container');
export const chat: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('chat-container');
export const options: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('options');
export const odometer: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('odometer-container');
export const results: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('results');

export const place: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('place');
export const drivers: Promise<HTMLDivElement> = domPromise<HTMLDivElement>('drivers', siblingExists('place'));
