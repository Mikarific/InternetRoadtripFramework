function domPromise<T>(elem: () => T): Promise<T> {
	return new Promise((resolve) => {
		if (elem()) return resolve(elem());

		const observer = new MutationObserver(() => {
			if (elem()) {
				observer.disconnect();
				resolve(elem());
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

export const container: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.container'));
export const wheel: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.wheel-container'));
export const radio: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.car-radio'));
export const title: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.nuxt-link-active'));
export const map: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.map-container'));
export const chat: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.chat-container'));
export const options: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.options'));
export const odometer: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.odometer-container'));
export const results: Promise<HTMLDivElement> = domPromise(() => document.querySelector('.results'));
