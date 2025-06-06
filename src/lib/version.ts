import { getOrSet, getOrSetWithOverrideVersion, content } from '../lib/util';

export const isInternetRoadtrip: () => boolean = content(
	getOrSet(
		'window.IRF',
		'isInternetRoadtrip',
		"()=>'neal.fun'===window.location.hostname&&'/internet-roadtrip/'===window.location.pathname",
	),
);

export const version: string = content(
	getOrSetWithOverrideVersion('window.IRF', 'version', "'process.env.VERSION'", 'process.env.VERSION'),
);
