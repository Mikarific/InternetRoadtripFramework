import type maplibregl from 'maplibre-gl';
import HlsJs from 'hls.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VirtualDOM<T> = T & { __vue__: any };
export type ParsedMeta = {
	name: string;
	tabName: string;
	namespace: string | null;
	description: string | null;
	version: string | null;
	author: string | null;
	icon: HTMLImageElement | null;
	license: string | null;
	homepage: URL | null;
	supportURL: URL | null;
	downloadURL: URL | null;
	updateURL: URL | null;
	contributionURL: URL | null;
};
export type ScriptMeta = {
	name: string;
	namespace?: string | null;
	description?: string | null;
	version?: string | null;
	author?: string | null;
	icon?: string | null;
	license?: string | null;
	homepage?: string | null;
	supportURL?: string | null;
	downloadURL?: string | null;
	updateURL?: string | null;
	contributionURL?: string | null;
};

export type NamedLocation = {
	country: string;
	county: string;
	neighborhood: string;
	road: string;
	state: string;
};
export type LatLng = { lat: number; lng: number };
export type TravelOption = {
	description: string;
	heading: number;
	pano: string;
	lat?: number;
	lng?: number;
};
export type RadioStation = {
	distance: number;
	name: string;
	url: string;
};

export type Map = maplibregl.Map;
export type Marker = maplibregl.Marker;
export type Hls = InstanceType<typeof HlsJs>;

export type ChatEvent = {
	type: string;
	id: number;
	author: string;
	color: string;
	content: string;
	timestamp: number;
};
export type ChatMessage = {
	id: number;
	author: string;
	color: string;
	content: string;
	timestamp: number;
};
