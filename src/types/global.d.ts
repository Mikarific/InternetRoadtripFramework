import type { ParsedMeta } from '../data/types';

declare global {
	const IRF: {
		internal: {
			flags: {
				refreshOnStateChange: boolean;
			};
			ui: {
				globalStyles: HTMLStyleElement;
				moduleStyles: HTMLStyleElement;
				panelButton: HTMLButtonElement;
				panel: {
					host: HTMLElement;
					body: HTMLElement;
					show: () => void;
					hide: () => void;
					styles: HTMLStyleElement;
					tabMeta: { info: ParsedMeta; container: HTMLDivElement; styles: string }[];
				};
			};
		};
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const webpackJsonp: any;
}
