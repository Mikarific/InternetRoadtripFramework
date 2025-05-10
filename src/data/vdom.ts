import { LatLng, NamedLocation, RadioStation, TravelOption, VirtualDOM } from './types';
import * as dom from './dom';

function getVueState(container: HTMLElement, resolve: (value: unknown) => void) {
	if ((container as VirtualDOM<HTMLElement>).__vue__ !== undefined) {
		const vueState =
			(container as VirtualDOM<HTMLDivElement>).__vue__.ws === undefined ?
				(container as VirtualDOM<HTMLDivElement>).__vue__.$children.find((child) => child.ws !== undefined)
			:	(container as VirtualDOM<HTMLDivElement>).__vue__;
		resolve(vueState);
	} else {
		Object.defineProperty(container, '__vue__', {
			set(vueState) {
				if (vueState !== null) {
					resolve(vueState);
					Object.defineProperty(container, '__vue__', {
						value: vueState,
						writable: true,
						configurable: true,
						enumerable: true,
					});
				}
			},
			configurable: true,
			enumerable: true,
		});
	}
}

function statePromise(container: Promise<HTMLElement>): Promise<any> {
	return new Promise((resolve) => {
		if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
			if (document.readyState === 'complete') {
				container.then(async (container) => getVueState(await container, resolve));
			} else {
				window.addEventListener(
					'load',
					() => {
						container.then(async (container) => getVueState(await container, resolve));
					},
					{ once: true },
				);
			}
		} else {
			resolve(null);
		}
	});
}

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
			if (vContainer === undefined) return reject(new Error('Could not find virtual DOM.'));
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
