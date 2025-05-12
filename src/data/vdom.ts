import { LatLng, Map, Marker, NamedLocation, RadioStation, TravelOption, VirtualDOM } from './types';
import * as dom from './dom';

export const container: Promise<{
	state: any;
	methods: {
		changeStop: (
			stop: number,
			chosen: number,
			pano: string,
			heading: number,
			location: NamedLocation,
			options: TravelOption[],
		) => void;
		connectWebSocket: () => void;
		updateData: (data: {
			chosen: number;
			distance: number;
			endTime: number;
			heading: number;
			lat: number;
			lng: number;
			location: NamedLocation;
			options: TravelOption[];
			pano: string;
			station: RadioStation;
			stop: number;
			totalUsers: string;
			voteCounts: {
				[key: number]: number;
			};
		}) => void;
		vote: (option: number) => void;
	};
	data: {
		currentChosen: number;
		currentCoords: LatLng;
		currentHeading: number;
		currentLocation: NamedLocation;
		currentMiles: number;
		currentOptions: TravelOption[];
		currentPano: string;
		currentStation: RadioStation;
		currentStopNum: number;
		destroyed: boolean;
		endTime: number;
		honkLongSound: Howl;
		honkSound: Howl;
		isChangingStop: boolean;
		loaded: boolean;
		milesDriven: number;
		moveSound: Howl;
		showAlreadyVoted: boolean;
		showVotedAnim: boolean;
		totalUsers: string;
		voteCounts: {
			[key: number]: number;
		};
		voted: boolean;
		ws: WebSocket;
	};
	watchers: {
		panoUrl: {
			getter: () => string;
			value: string;
		};
	};
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.container.then((container) => {
			const vContainer = (container as VirtualDOM<HTMLDivElement>).__vue__;
			if (vContainer === undefined) return reject('Could not find virtual DOM.');
			const state =
				vContainer.ws === undefined ? vContainer.$children.find((child) => child.ws !== undefined) : vContainer;

			resolve({
				state,
				methods: {
					get changeStop() {
						return state.changeStop;
					},
					get connectWebSocket() {
						return state.connectWebSocket;
					},
					get updateData() {
						return state.updateData;
					},
					get vote() {
						return state.vote;
					},
				},
				data: {
					get currentChosen() {
						return state.currentChosen;
					},
					get currentCoords() {
						return state.currentCoords;
					},
					get currentHeading() {
						return state.currentHeading;
					},
					get currentLocation() {
						return state.currentLocation;
					},
					get currentMiles() {
						return state.currentMiles;
					},
					get currentOptions() {
						return state.currentOptions;
					},
					get currentPano() {
						return state.currentPano;
					},
					get currentStation() {
						return state.currentStation;
					},
					get currentStopNum() {
						return state.currentStopNum;
					},
					get destroyed() {
						return state.destroyed;
					},
					get endTime() {
						return state.endTime;
					},
					get honkLongSound() {
						return state.honkLongSound;
					},
					get honkSound() {
						return state.honkSound;
					},
					get isChangingStop() {
						return state.isChangingStop;
					},
					get loaded() {
						return state.loaded;
					},
					get milesDriven() {
						return state.milesDriven;
					},
					get moveSound() {
						return state.moveSound;
					},
					get showAlreadyVoted() {
						return state.showAlreadyVoted;
					},
					get showVotedAnim() {
						return state.showVotedAnim;
					},
					get totalUsers() {
						return state.totalUsers;
					},
					get voteCounts() {
						return state.voteCounts;
					},
					get voted() {
						return state.voted;
					},
					get ws() {
						return state.ws;
					},
				},
				watchers: {
					get panoUrl() {
						return state._computedWatchers.panoUrl;
					},
				},
			});
		});
	}
	if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
		if (document.readyState === 'complete') {
			getStateAndData(resolve, reject);
		} else {
			window.addEventListener(
				'load',
				() => {
					getStateAndData(resolve, reject);
				},
				{ once: true },
			);
		}
	} else {
		resolve(null);
	}
});

export const map: Promise<{
	state: any;
	methods: {
		createMap: () => Promise<unknown>;
		flyTo: (lat: number, lng: number) => void;
		getInitialData: () => Promise<unknown>;
		handleUserInteraction: () => void;
		setMarkerPosition: (lat: number, lng: number) => void;
		setMarkerRotation: (rotation: number) => void;
		toggleAttribution: () => void;
		toggleExpand: () => void;
	};
	data: {
		coordinates: [number, number][];
		isExpanded: boolean;
		lastUserInteraction: number;
		map: Map;
		mapSound: Howl;
		marker: Marker;
		showAttribution: boolean;
	};
	watchers: {};
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.map.then((map) => {
			const vMap = (map as VirtualDOM<HTMLDivElement>).__vue__;
			if (vMap === undefined) return reject('Could not find virtual DOM.');
			const state = vMap.map === undefined ? vMap.$children.find((child) => child.map !== undefined) : vMap;

			resolve({
				state,
				methods: {
					get createMap() {
						return state.createMap;
					},
					get flyTo() {
						return state.flyTo;
					},
					get getInitialData() {
						return state.getInitialData;
					},
					get handleUserInteraction() {
						return state.handleUserInteraction;
					},
					get setMarkerPosition() {
						return state.setMarkerPosition;
					},
					get setMarkerRotation() {
						return state.setMarkerRotation;
					},
					get toggleAttribution() {
						return state.toggleAttribution;
					},
					get toggleExpand() {
						return state.toggleExpand;
					},
				},
				data: {
					get coordinates() {
						return state.coordinates;
					},
					get isExpanded() {
						return state.isExpanded;
					},
					get lastUserInteraction() {
						return state.lastUserInteraction;
					},
					get map() {
						return state.map;
					},
					get mapSound() {
						return state.mapSound;
					},
					get marker() {
						return state.marker;
					},
					get showAttribution() {
						return state.showAttribution;
					},
				},
				watchers: {},
			});
		});
	}
	if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
		if (document.readyState === 'complete') {
			getStateAndData(resolve, reject);
		} else {
			window.addEventListener(
				'load',
				() => {
					getStateAndData(resolve, reject);
				},
				{ once: true },
			);
		}
	} else {
		resolve(null);
	}
});

export const options: Promise<{
	state: any;
	methods: {
		angleDifference: (angle1: number, angle2: number) => number;
		getRotation: (option: number) => number;
		playBlink: () => void;
		vote: (option: number) => void;
	};
	data: {
		blinkRate: number;
		blinkSound: Howl;
		selectedIndex: number;
		voteSound: Howl;
	};
	watchers: {};
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.options.then((options) => {
			const vOptions = (options as VirtualDOM<HTMLDivElement>).__vue__;
			if (vOptions === undefined) return reject('Could not find virtual DOM.');
			const state =
				vOptions.blinkRate === undefined ? vOptions.$children.find((child) => child.blinkRate !== undefined) : vOptions;

			resolve({
				state,
				methods: {
					get angleDifference() {
						return state.angleDifference;
					},
					get getRotation() {
						return state.getRotation;
					},
					get playBlink() {
						return state.playBlink;
					},
					get vote() {
						return state.vote;
					},
				},
				data: {
					get blinkRate() {
						return state.blinkRate;
					},
					get blinkSound() {
						return state.blinkSound;
					},
					get selectedIndex() {
						return state.selectedIndex;
					},
					get voteSound() {
						return state.voteSound;
					},
				},
				watchers: {},
			});
		});
	}
	if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
		if (document.readyState === 'complete') {
			getStateAndData(resolve, reject);
		} else {
			window.addEventListener(
				'load',
				() => {
					getStateAndData(resolve, reject);
				},
				{ once: true },
			);
		}
	} else {
		resolve(null);
	}
});
