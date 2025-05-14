import type maplibregl from 'maplibre-gl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VirtualDOM<T> = T & { __vue__: any };

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
