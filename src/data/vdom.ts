import {
	ChatEvent,
	ChatMessage,
	LatLng,
	Map,
	Marker,
	NamedLocation,
	RadioStation,
	TravelOption,
	VirtualDOM,
} from './types';
import * as dom from './dom';

export const container: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: {
		pano0: HTMLIFrameElement;
		pano1: HTMLIFrameElement;
	};
	props: Record<string, never>;
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
		getPanoUrl: () => string;
		switchFrameOrder: () => void;
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
		currFrame: number;
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
		nowPlaying: string;
		showAlreadyVoted: boolean;
		showVotedAnim: boolean;
		totalUsers: string;
		voteCounts: {
			[key: number]: number;
		};
		voted: boolean;
		ws: WebSocket;
	};
	watchers: Record<string, never>;
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.container.then((container) => {
			const vContainer = (container as VirtualDOM<HTMLDivElement>).__vue__;
			if (vContainer === undefined) return reject('Could not find virtual DOM.');
			const state =
				vContainer.ws === undefined ? vContainer.$children.find((child) => child.ws !== undefined) : vContainer;

			resolve({
				state,
				$refs: {
					get pano0() {
						return state.$refs.pano0;
					},
					get pano1() {
						return state.$refs.pano1;
					},
				},
				props: {},
				methods: {
					get changeStop() {
						return state.changeStop;
					},
					get connectWebSocket() {
						return state.connectWebSocket;
					},
					get getPanoUrl() {
						return state.getPanoUrl;
					},
					get switchFrameOrder() {
						return state.switchFrameOrder;
					},
					get updateData() {
						return state.updateData;
					},
					get vote() {
						return state.vote;
					},
				},
				data: {
					get currFrame() {
						return state.currFrame;
					},
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
					get nowPlaying() {
						return state.nowPlaying;
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

export const wheel: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: Record<string, never>;
	props: {
		currentOptions: TravelOption[];
		heading: number;
		voteCounts: string;
	};
	methods: { onHonkClick: () => void };
	data: { honkSound: Howl };
	watchers: {
		angle: {
			getter: () => number;
			value: number;
		};
	};
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.wheel.then((wheel) => {
			const vWheel = (wheel as VirtualDOM<HTMLDivElement>).__vue__;
			if (vWheel === undefined) return reject('Could not find virtual DOM.');
			const state =
				vWheel.honkSound === undefined ? vWheel.$children.find((child) => child.honkSound !== undefined) : vWheel;

			resolve({
				state,
				$refs: {},
				props: {
					get currentOptions() {
						return state._props.currentOptions;
					},
					get heading() {
						return state._props.heading;
					},
					get voteCounts() {
						return state._props.voteCounts;
					},
				},
				methods: {
					get onHonkClick() {
						return state.onHonkClick;
					},
				},
				data: {
					get honkSound() {
						return state.honkSound;
					},
				},
				watchers: {
					get angle() {
						return state._computedWatchers.angle;
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

export const radio: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: {
		equalizerCanvas: HTMLCanvasElement;
		volumeKnob: HTMLDivElement;
	};
	props: {
		station: RadioStation;
		nowPlaying: string;
	};
	methods: {
		changeVolume: (mouseEvent: MouseEvent) => void;
		changeVolumeTouch: (touchEvent: TouchEvent) => void;
		playCoffeeSound: () => void;
		resizeCanvas: () => void;
		seek: () => void;
		setupAudioAnalyzer: () => void;
		startVisualization: () => void;
		startVolumeChange: (mouseEvent: MouseEvent) => void;
		stopVolumeChange: () => void;
		switchStation: (station: RadioStation) => void;
		togglePower: () => void;
		updateVolumeFromAngle: (angle: number) => void;
	};
	data: {
		animationFrameId: number;
		audioAnalyser: AnalyserNode;
		audioContext: AudioContext;
		audioSource: MediaElementAudioSourceNode;
		buttonSound: Howl;
		coffeeSound: Howl;
		currentFrequency: number;
		dataArray: Uint8Array;
		hideMobile: boolean;
		isChangingVolume: boolean;
		isPoweredOn: boolean;
		knobSound: Howl;
		radioStream: HTMLAudioElement;
		staticSound: Howl;
		stationInfo: string;
		stationName: string;
		tuningRotation: number;
		volume: number;
		volumeRotation: number;
	};
	watchers: Record<string, never>;
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.radio.then((radio) => {
			const vRadio = (radio as VirtualDOM<HTMLDivElement>).__vue__;
			if (vRadio === undefined) return reject('Could not find virtual DOM.');
			const state =
				vRadio.radioStream === undefined ? vRadio.$children.find((child) => child.radioStream !== undefined) : vRadio;

			resolve({
				state,
				$refs: {
					get equalizerCanvas() {
						return state.$refs.equalizerCanvas;
					},
					get volumeKnob() {
						return state.$refs.volumeKnob;
					},
				},
				props: {
					get station() {
						return state._props.station;
					},
					get nowPlaying() {
						return state._props.nowPlaying;
					},
				},
				methods: {
					get changeVolume() {
						return state.changeVolume;
					},
					get changeVolumeTouch() {
						return state.changeVolumeTouch;
					},
					get playCoffeeSound() {
						return state.playCoffeeSound;
					},
					get resizeCanvas() {
						return state.resizeCanvas;
					},
					get seek() {
						return state.seek;
					},
					get setupAudioAnalyzer() {
						return state.setupAudioAnalyzer;
					},
					get startVisualization() {
						return state.startVisualization;
					},
					get startVolumeChange() {
						return state.startVolumeChange;
					},
					get stopVolumeChange() {
						return state.stopVolumeChange;
					},
					get switchStation() {
						return state.switchStation;
					},
					get togglePower() {
						return state.togglePower;
					},
					get updateVolumeFromAngle() {
						return state.updateVolumeFromAngle;
					},
				},
				data: {
					get animationFrameId() {
						return state.animationFrameId;
					},
					get audioAnalyser() {
						return state.audioAnalyser;
					},
					get audioContext() {
						return state.audioContext;
					},
					get audioSource() {
						return state.audioSource;
					},
					get buttonSound() {
						return state.buttonSound;
					},
					get coffeeSound() {
						return state.coffeeSound;
					},
					get currentFrequency() {
						return state.currentFrequency;
					},
					get dataArray() {
						return state.dataArray;
					},
					get hideMobile() {
						return state.hideMobile;
					},
					get isChangingVolume() {
						return state.isChangingVolume;
					},
					get isPoweredOn() {
						return state.isPoweredOn;
					},
					get knobSound() {
						return state.knobSound;
					},
					get radioStream() {
						return state.radioStream;
					},
					get staticSound() {
						return state.staticSound;
					},
					get stationInfo() {
						return state.stationInfo;
					},
					get stationName() {
						return state.stationName;
					},
					get tuningRotation() {
						return state.tuningRotation;
					},
					get volume() {
						return state.volume;
					},
					get volumeRotation() {
						return state.volumeRotation;
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

export const freshener: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: {
		freshener: HTMLDivElement;
		leftString: HTMLDivElement;
		rightString: HTMLDivElement;
	};
	props: Record<string, never>;
	methods: {
		cleanupPhysics: () => void;
		endDrag: () => void;
		handleDrag: (mouseEvent: MouseEvent) => void;
		initPhysics: () => void;
		startDrag: (mouseEvent: MouseEvent) => void;
	};
	data: {
		anchors: unknown[];
		animationFrameId: number;
		clickSound: Howl;
		engine: Matter.Engine;
		freshenerBody: Matter.Body;
		height: number;
		idleTimeoutId: unknown;
		isDragging: boolean;
		leftConstraint: Matter.Constraint;
		mouse: unknown;
		mouseConstraint: Matter.Constraint;
		render: unknown;
		rightConstraint: Matter.Constraint;
		runner: Matter.Runner;
		sleepCounter: number;
		stringSpacing: number;
		width: number;
		xPosition: number;
	};
	watchers: Record<string, never>;
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.freshener.then((freshener) => {
			const vFreshener = (freshener as VirtualDOM<HTMLDivElement>).__vue__;
			if (vFreshener === undefined) return reject('Could not find virtual DOM.');
			const state =
				vFreshener.freshenerBody === undefined ?
					vFreshener.$children.find((child) => child.freshenerBody !== undefined)
				:	vFreshener;

			resolve({
				state,
				$refs: {
					get freshener() {
						return state.$refs.freshener;
					},
					get leftString() {
						return state.$refs.leftString;
					},
					get rightString() {
						return state.$refs.rightString;
					},
				},
				props: {},
				methods: {
					get cleanupPhysics() {
						return state.cleanupPhysics;
					},
					get endDrag() {
						return state.endDrag;
					},
					get handleDrag() {
						return state.handleDrag;
					},
					get initPhysics() {
						return state.initPhysics;
					},
					get startDrag() {
						return state.startDrag;
					},
				},
				data: {
					get anchors() {
						return state.anchors;
					},
					get animationFrameId() {
						return state.animationFrameId;
					},
					get clickSound() {
						return state.clickSound;
					},
					get engine() {
						return state.engine;
					},
					get freshenerBody() {
						return state.freshenerBody;
					},
					get height() {
						return state.height;
					},
					get idleTimeoutId() {
						return state.idleTimeoutId;
					},
					get isDragging() {
						return state.isDragging;
					},
					get leftConstraint() {
						return state.leftConstraint;
					},
					get mouse() {
						return state.mouse;
					},
					get mouseConstraint() {
						return state.mouseConstraint;
					},
					get render() {
						return state.render;
					},
					get rightConstraint() {
						return state.rightConstraint;
					},
					get runner() {
						return state.runner;
					},
					get sleepCounter() {
						return state.sleepCounter;
					},
					get stringSpacing() {
						return state.stringSpacing;
					},
					get width() {
						return state.width;
					},
					get xPosition() {
						return state.xPosition;
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

export const map: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: Record<string, never>;
	props: Record<string, never>;
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
	watchers: Record<string, never>;
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.map.then((map) => {
			const vMap = (map as VirtualDOM<HTMLDivElement>).__vue__;
			if (vMap === undefined) return reject('Could not find virtual DOM.');
			const state = vMap.map === undefined ? vMap.$children.find((child) => child.map !== undefined) : vMap;

			resolve({
				state,
				$refs: {},
				props: {},
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

export const chat: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: {
		chatContainer: HTMLDivElement;
	};
	props: Record<string, never>;
	methods: {
		escapeHTML: (text: string) => string;
		fetchChatEvents: () => Promise<unknown>;
		formatMessage: (text: string) => string;
		getRandomColor: () => string;
		getTime: (timestamp: number) => string;
		handleEvents: (events: ChatEvent[]) => void;
		openDiscord: () => void;
		scrollToBottom: () => void;
		toggleChat: () => void;
		trimMessage: (text: string) => string;
	};
	data: {
		hideChat: boolean;
		messages: ChatMessage[];
		nameColors: string[];
		userColorMap: {
			[key: string]: string;
		};
	};
	watchers: Record<string, never>;
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.chat.then((chat) => {
			const vChat = (chat as VirtualDOM<HTMLDivElement>).__vue__;
			if (vChat === undefined) return reject('Could not find virtual DOM.');
			const state =
				vChat.messages === undefined ? vChat.$children.find((child) => child.messages !== undefined) : vChat;

			resolve({
				state,
				$refs: {
					get chatContainer() {
						return state.$refs.chatContainer;
					},
				},
				props: {},
				methods: {
					get escapeHTML() {
						return state.escapeHTML;
					},
					get fetchChatEvents() {
						return state.fetchChatEvents;
					},
					get formatMessage() {
						return state.formatMessage;
					},
					get getRandomColor() {
						return state.getRandomColor;
					},
					get getTime() {
						return state.getTime;
					},
					get handleEvents() {
						return state.handleEvents;
					},
					get openDiscord() {
						return state.openDiscord;
					},
					get scrollToBottom() {
						return state.scrollToBottom;
					},
					get toggleChat() {
						return state.toggleChat;
					},
					get trimMessage() {
						return state.trimMessage;
					},
				},
				data: {
					get hideChat() {
						return state.hideChat;
					},
					get messages() {
						return state.messages;
					},
					get nameColors() {
						return state.nameColors;
					},
					get userColorMap() {
						return state.userColorMap;
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: Record<string, never>;
	props: {
		chosen: number;
		heading: number;
		options: TravelOption[];
		stopNum: number;
		voted: boolean;
	};
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
	watchers: Record<string, never>;
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.options.then((options) => {
			const vOptions = (options as VirtualDOM<HTMLDivElement>).__vue__;
			if (vOptions === undefined) return reject('Could not find virtual DOM.');
			const state =
				vOptions.blinkRate === undefined ? vOptions.$children.find((child) => child.blinkRate !== undefined) : vOptions;

			resolve({
				state,
				$refs: {},
				props: {
					get chosen() {
						return state._props.chosen;
					},
					get heading() {
						return state._props.heading;
					},
					get options() {
						return state._props.options;
					},
					get stopNum() {
						return state._props.stopNum;
					},
					get voted() {
						return state._props.voted;
					},
				},
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

export const odometer: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: Record<string, never>;
	props: {
		miles: number;
	};
	methods: {
		getDisplayValue: (miles: number) => number;
		toggleUnit: () => void;
		updateDisplay: (displayNum: number) => void;
	};
	data: {
		conversionFactor: number;
		currentValue: number;
		digits: string[];
		isKilometers: boolean;
	};
	watchers: {
		currentUnit: {
			getter: () => number;
			value: number;
		};
	};
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.odometer.then((odometer) => {
			const vOdometer = (odometer as VirtualDOM<HTMLDivElement>).__vue__;
			if (vOdometer === undefined) return reject('Could not find virtual DOM.');
			const state =
				vOdometer.digits === undefined ? vOdometer.$children.find((child) => child.digits !== undefined) : vOdometer;

			resolve({
				state,
				$refs: {},
				props: {
					get miles() {
						return state._props.miles;
					},
				},
				methods: {
					get getDisplayValue() {
						return state.getDisplayValue;
					},
					get toggleUnit() {
						return state.toggleUnit;
					},
					get updateDisplay() {
						return state.updateDisplay;
					},
				},
				data: {
					get conversionFactor() {
						return state.conversionFactor;
					},
					get currentValue() {
						return state.currentValue;
					},
					get digits() {
						return state.digits;
					},
					get isKilometers() {
						return state.isKilometers;
					},
				},
				watchers: {
					get currentUnit() {
						return state._computedWatchers.currentUnit;
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

export const results: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	$refs: Record<string, never>;
	props: {
		endTime: number;
		heading: number;
		stopNum: number;
		voteCounts: {
			[key: number]: number;
		};
		voteOptions: TravelOption[];
	};
	methods: {
		angleDifference: (angle1: number, angle2: number) => number;
		getRotation: (option: number) => number;
		setTimeRemaining: () => void;
		startTween: (voteCounts: { [key: number]: number }) => void;
	};
	data: {
		displayedVotes: {
			[key: number]: number;
		};
		otherOptions: number[];
		prevStopNum: number;
		timeRemaining: number;
		timeRemainingInterval: number;
		tweenInterval: number | null;
	};
	watchers: {
		displayedTotal: {
			getter: () => number;
			value: number;
		};
		topFourOptions: {
			getter: () => { id: number; type: 'direction' | 'skip' | 'honk'; votes: number; index?: number }[];
			value: { id: number; type: 'direction' | 'skip' | 'honk'; votes: number; index?: number }[];
		};
	};
}> = new Promise((resolve, reject) => {
	function getStateAndData(resolve, reject) {
		dom.results.then((results) => {
			const vResults = (results as VirtualDOM<HTMLDivElement>).__vue__;
			if (vResults === undefined) return reject('Could not find virtual DOM.');
			const state =
				vResults.timeRemaining === undefined ?
					vResults.$children.find((child) => child.timeRemaining !== undefined)
				:	vResults;

			resolve({
				state,
				$refs: {},
				props: {
					get endTime() {
						return state._props.endTime;
					},
					get heading() {
						return state._props.heading;
					},
					get stopNum() {
						return state._props.stopNum;
					},
					get voteCounts() {
						return state._props.voteCounts;
					},
					get voteOptions() {
						return state._props.voteOptions;
					},
				},
				methods: {
					get angleDifference() {
						return state.angleDifference;
					},
					get getRotation() {
						return state.getRotation;
					},
					get setTimeRemaining() {
						return state.setTimeRemaining;
					},
					get startTween() {
						return state.startTween;
					},
				},
				data: {
					get displayedVotes() {
						return state.displayedVotes;
					},
					get otherOptions() {
						return state.otherOptions;
					},
					get prevStopNum() {
						return state.prevStopNum;
					},
					get timeRemaining() {
						return state.timeRemaining;
					},
					get timeRemainingInterval() {
						return state.timeRemainingInterval;
					},
					get tweenInterval() {
						return state.tweenInterval;
					},
				},
				watchers: {
					get displayedTotal() {
						return state._computedWatchers.displayedTotal;
					},
					get topFourOptions() {
						return state._computedWatchers.topFourOptions;
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
