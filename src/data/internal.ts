if (((typeof IRF !== 'undefined' && IRF) || {}).internal === undefined) {
	Object.defineProperty((typeof IRF !== 'undefined' && IRF) || {}, 'internal', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {
			flags: {
				refreshOnStateChange: false,
			},
			ui: {
				globalStyles: null,
				moduleStyles: null,
				panelButton: null,
				panel: {
					host: null,
					body: null,
					show: () => {},
					hide: () => {},
					styles: null,
					tabMeta: [],
				},
			},
		},
	});
}

export const flags: typeof IRF.internal.flags = ((typeof IRF !== 'undefined' && IRF) || {}).internal.flags;
export const ui: typeof IRF.internal.ui = ((typeof IRF !== 'undefined' && IRF) || {}).internal.ui;
