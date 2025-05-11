function domPromise<T>(elem: () => T): Promise<T> {
	return new Promise((resolve) => {
		if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
			if (document.readyState === 'interactive') {
				resolve(elem());
			} else {
				window.addEventListener(
					'DOMContentLoaded',
					() => {
						resolve(elem());
					},
					{ once: true },
				);
			}
		} else {
			resolve(null);
		}
	});
}

export const container: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.container'));
export const map: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.map-container'));
