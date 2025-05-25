import type {
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

function getState(elem: HTMLElement, className: string) {
	return new Promise((resolve) => {
		if ((elem as VirtualDOM<HTMLElement>).__vue__)
			return resolve(
				'wrappedJSObject' in elem ?
					(elem.wrappedJSObject as VirtualDOM<HTMLElement>).__vue__
				:	(elem as VirtualDOM<HTMLElement>).__vue__,
			);
		const script = document.createElement('script');
		script.textContent = `(function(){const e=document.querySelector('.${className}');if(e){let s;Object.defineProperty(e,'__vue__',{configurable:!0,enumerable:!0,get(){return s;},set(v){s=v;if(v?.$el.classList.contains('${className}'))window.dispatchEvent(new CustomEvent('irf-nuxt-${className}'));}});}})();`;
		document.documentElement.appendChild(script);
		script.remove();
		window.addEventListener(
			`irf-nuxt-${className}`,
			() => {
				resolve(
					'wrappedJSObject' in elem ?
						(elem.wrappedJSObject as VirtualDOM<HTMLElement>).__vue__
					:	(elem as VirtualDOM<HTMLElement>).__vue__,
				);
			},
			{ once: true },
		);
	});
}

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
	watchers: {
		locationName: {
			getter: () => string;
			value: string;
		};
	};
}> = new Promise((resolve) => {
	dom.container.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'container').then((state: any) => {
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
				watchers: {
					get locationName() {
						return state._computedWatchers.locationName;
					},
				},
			});
		});
	});
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
}> = new Promise((resolve) => {
	dom.wheel.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'wheel-container').then((state: any) => {
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
	});
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
}> = new Promise((resolve) => {
	dom.radio.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'car-radio').then((state: any) => {
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
						return state.station;
					},
					get nowPlaying() {
						return state.nowPlaying;
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
	});
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
}> = new Promise((resolve) => {
	dom.freshener.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'freshener-container').then((state: any) => {
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
	});
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
}> = new Promise((resolve) => {
	dom.map.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'map-container').then((state: any) => {
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
	});
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
	watchers: {
		messagesToShow: {
			getter: () => ChatMessage[];
			value: ChatMessage[];
		};
	};
}> = new Promise((resolve) => {
	dom.chat.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'chat-container').then((state: any) => {
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
				watchers: {
					get messagesToShow() {
						return state._computedWatchers.messagesToShow;
					},
				},
			});
		});
	});
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
}> = new Promise((resolve) => {
	dom.options.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'options').then((state: any) => {
			resolve({
				state,
				$refs: {},
				props: {
					get chosen() {
						return state.chosen;
					},
					get heading() {
						return state.heading;
					},
					get options() {
						return state.options;
					},
					get stopNum() {
						return state.stopNum;
					},
					get voted() {
						return state.voted;
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
	});
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
}> = new Promise((resolve) => {
	dom.odometer.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'odometer-container').then((state: any) => {
			resolve({
				state,
				$refs: {},
				props: {
					get miles() {
						return state.miles;
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
	});
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
}> = new Promise((resolve) => {
	dom.results.then((elem) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getState(elem, 'results').then((state: any) => {
			resolve({
				state,
				$refs: {},
				props: {
					get endTime() {
						return state.endTime;
					},
					get heading() {
						return state.heading;
					},
					get stopNum() {
						return state.stopNum;
					},
					get voteCounts() {
						return state.voteCounts;
					},
					get voteOptions() {
						return state.voteOptions;
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
	});
});
