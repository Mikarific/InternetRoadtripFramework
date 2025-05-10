Object.defineProperty((typeof IRF !== 'undefined' && IRF) || {}, 'internal', {
	configurable: false,
	enumerable: false,
	writable: false,
	value: {
		refreshOnStateChange: false,
	},
});

export const flags: {
	refreshOnStateChange: boolean;
} = {
	refreshOnStateChange:
		(typeof IRF?.internal?.refreshOnStateChange !== 'undefined' && IRF?.internal?.refreshOnStateChange) || false,
};
