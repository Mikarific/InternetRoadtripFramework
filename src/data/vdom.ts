import type {
	ChatEvent,
	ChatMessage,
	Hls,
	LatLng,
	Map,
	Marker,
	NamedLocation,
	RadioStation,
	TravelOption,
} from './types';
import { content, getOrSet, getOrSetWithOverrideVersion, page, unwrapProp } from '../lib/util';

function statePromise(elem: Promise<HTMLElement>, className: string, transformer: (state: unknown) => unknown) {
	return new Promise((resolve) => {
		elem.then((elem) => {
			window.addEventListener(`irf-vdom-${className}`, () => resolve(transformer(unwrapProp(elem, '__vue__'))), {
				once: true,
			});
			// (function () {
			// 	const elem = document.querySelector('.${className}');
			// 	if (elem) {
			// 		if ('__vue__' in elem && elem.__vue__?.$el === elem)
			// 			return window.dispatchEvent(new CustomEvent('irf-vdom-${className}'));
			// 		let state;
			// 		Object.defineProperty(elem, '__vue__', {
			// 			configurable: true,
			// 			enumerable: true,
			// 			get() {
			// 				return state;
			// 			},
			// 			set(value) {
			// 				state = value;
			// 				if (value?.$el === elem) {
			// 					window.dispatchEvent(new CustomEvent('irf-vdom-${className}'));
			// 					Object.defineProperty(elem, '__vue__', {
			// 						configurable: !0,
			// 						enumerable: !0,
			// 						writable: !0,
			// 						value: value,
			// 					});
			// 				}
			// 			},
			// 		});
			// 	}
			// })();
			page(
				`!function(){let e=document.querySelector(".${className}");if(e){if("__vue__"in e&&e.__vue__?.$el===e)return window.dispatchEvent(new CustomEvent("irf-vdom-${className}"));let r;Object.defineProperty(e,"__vue__",{configurable:!0,enumerable:!0,get:()=>r,set(a){r=a,a?.$el===e&&(window.dispatchEvent(new CustomEvent("irf-vdom-${className}")),Object.defineProperty(e,"__vue__",{configurable:!0,enumerable:!0,writable:!0,value:a}))}})}}();`,
			);
		});
	});
}

const getState = <T>(
	name: string,
	className: string,
	transformer: (state: unknown) => T,
	version: string = null,
): Promise<T> => {
	if (version === null) {
		return content(
			`${getOrSet(
				'window.IRF.vdom',
				name,
				`(${statePromise.toString()})(window.IRF.dom.${name},'${className}',${transformer.toString()})`,
			)}\n${page.toString()}\n${unwrapProp.toString()}`,
		);
	} else {
		return content(
			`${getOrSetWithOverrideVersion(
				'window.IRF.vdom',
				name,
				`(${statePromise.toString()})(window.IRF.dom.${name},'${className}',${transformer.toString()})`,
				version,
			)}\n${page.toString()}\n${unwrapProp.toString()}`,
		);
	}
};

content(getOrSet('window.IRF', 'vdom', '{}'));
export const container: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: {
		readonly pano0: HTMLIFrameElement;
		readonly pano1: HTMLIFrameElement;
	};
	props: Record<string, never>;
	methods: {
		readonly changeStop: (
			stop: number,
			chosen: number,
			pano: string,
			heading: number,
			location: NamedLocation,
			options: TravelOption[],
		) => void;
		readonly connectWebSocket: () => void;
		readonly getPanoUrl: () => string;
		readonly switchFrameOrder: () => void;
		readonly updateData: (data: {
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
		readonly vote: (option: number) => void;
	};
	computed: {
		locationName: {
			readonly getter: () => string;
			readonly value: string;
		};
	};
	data: {
		readonly currFrame: number;
		readonly currentChosen: number;
		readonly currentCoords: LatLng;
		readonly currentHeading: number;
		readonly currentLocation: NamedLocation;
		readonly currentMiles: number;
		readonly currentOptions: TravelOption[];
		readonly currentPano: string;
		readonly currentStation: RadioStation;
		readonly currentStopNum: number;
		readonly destroyed: boolean;
		readonly endTime: number;
		readonly honkLongSound: Howl;
		readonly honkSound: Howl;
		readonly isChangingStop: boolean;
		readonly loaded: boolean;
		readonly milesDriven: number;
		readonly moveSound: Howl;
		readonly nowPlaying: string;
		readonly showAlreadyVoted: boolean;
		readonly showVotedAnim: boolean;
		readonly totalUsers: string;
		readonly voteCounts: {
			[key: number]: number;
		};
		readonly voted: boolean;
		readonly ws: WebSocket;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('container', 'container', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {
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
		computed: {
			locationName: {
				get getter() {
					return state._computedWatchers.locationName.getter;
				},
				get value() {
					return state._computedWatchers.locationName.value;
				},
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
	};
});

export const wheel: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: Record<string, never>;
	props: {
		readonly currentOptions: TravelOption[];
		readonly heading: number;
		readonly voteCounts: string;
	};
	methods: { readonly onHonkClick: () => void };
	computed: {
		angle: {
			readonly getter: () => number;
			readonly value: number;
		};
	};
	data: { readonly honkSound: Howl };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('wheel', 'wheel-container', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {},
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
		computed: {
			angle: {
				get getter() {
					return state._computedWatchers.angle.getter;
				},
				get value() {
					return state._computedWatchers.angle.value;
				},
			},
		},
		data: {
			get honkSound() {
				return state.honkSound;
			},
		},
	};
});
export const radio: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: {
		readonly equalizerCanvas: HTMLCanvasElement;
		readonly volumeKnob: HTMLDivElement;
	};
	props: {
		readonly nowPlaying: string;
		readonly station: RadioStation;
	};
	methods: {
		readonly changeVolume: (mouseEvent: MouseEvent) => void;
		readonly changeVolumeTouch: (touchEvent: TouchEvent) => void;
		readonly playCoffeeSound: () => void;
		readonly resizeCanvas: () => void;
		readonly seek: () => void;
		readonly setupAudioAnalyzer: () => void;
		readonly startVisualization: () => void;
		readonly startVolumeChange: (mouseEvent: MouseEvent) => void;
		readonly stopVolumeChange: () => void;
		readonly switchStation: (station: RadioStation) => void;
		readonly togglePower: () => void;
		readonly updateVolumeFromAngle: (angle: number) => void;
	};
	computed: Record<string, never>;
	data: {
		readonly animationFrameId: number;
		readonly audioAnalyser: AnalyserNode;
		readonly audioContext: AudioContext;
		readonly audioSource: MediaElementAudioSourceNode;
		readonly buttonSound: Howl;
		readonly coffeeSound: Howl;
		readonly currentFrequency: number;
		readonly dataArray: Uint8Array;
		readonly hideMobile: boolean;
		readonly hls: Hls | null;
		readonly isChangingVolume: boolean;
		readonly isPoweredOn: boolean;
		readonly knobSound: Howl;
		readonly radioStream: HTMLAudioElement;
		readonly staticSound: Howl;
		readonly stationInfo: string;
		readonly stationName: string;
		readonly tuningRotation: number;
		readonly volume: number;
		readonly volumeRotation: number;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('radio', 'car-radio', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {
			get equalizerCanvas() {
				return state.$refs.equalizerCanvas;
			},
			get volumeKnob() {
				return state.$refs.volumeKnob;
			},
		},
		props: {
			get nowPlaying() {
				return state.nowPlaying;
			},
			get station() {
				return state.station;
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
		computed: {},
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
			get hls() {
				return state.hls;
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
	};
});

export const freshener: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: {
		readonly freshener: HTMLDivElement;
		readonly leftDice: HTMLDivElement;
		readonly rightDice: HTMLDivElement;
		readonly string0: [HTMLDivElement];
		readonly string1: [HTMLDivElement];
		readonly string2: [HTMLDivElement];
		readonly string3: [HTMLDivElement];
	};
	props: Record<string, never>;
	methods: {
		readonly addEventListeners: () => void;
		readonly addToWorld: () => void;
		readonly cleanup: () => void;
		readonly createBodies: () => void;
		readonly createConstraint: (
			pointA: { x: number; y: number },
			body: Matter.Body,
			pointB: { x: number; y: number },
			stiffness: number,
			damping: number,
			stringLength: number,
		) => Matter.Constraint;
		readonly createConstraints: () => void;
		readonly endDrag: () => void;
		readonly ensurePhysicsRunning: () => void;
		readonly getTargetBody: (target: EventTarget) => Matter.Body;
		readonly handleDrag: (mouseEvent: MouseEvent) => void;
		readonly hasMovement: () => boolean;
		readonly initPhysics: () => void;
		readonly removeEventListeners: () => void;
		readonly startAnimation: () => void;
		readonly startDrag: (mouseEvent: MouseEvent) => void;
		readonly updateElementPosition: (ref: string, body: Matter.Body, width: number, height: number) => void;
		readonly updateLastStates: () => void;
		readonly updateString: (id: number, constraint: Matter.Constraint, body: Matter.Body) => void;
		readonly updateVisuals: () => void;
	};
	computed: {
		xPosition: {
			readonly getter: () => number;
			readonly value: number;
		};
	};
	data: {
		CONFIG: {
			freshener: {
				readonly width: number;
				readonly height: number;
				readonly xPosition: number;
				readonly stringSpacing: number;
				readonly density: number;
				readonly frictionAir: number;
				readonly stringLength: number;
				readonly stiffness: number;
				readonly damping: number;
			};
			dice: {
				readonly size: number;
				readonly leftXOffset: number;
				readonly rightXOffset: number;
				readonly yPosition: number;
				readonly density: number;
				readonly frictionAir: number;
				readonly stringLength: number;
				readonly stiffness: number;
				readonly damping: number;
			};
			physics: {
				readonly movementThreshold: number;
				readonly angleThreshold: number;
				readonly idleFrames: number;
			};
		};
		readonly animationFrameId: number;
		bodies: {
			readonly freshener: Matter.Body;
			readonly leftDice: Matter.Body;
			readonly rightDice: Matter.Body;
		};
		readonly clickSound: Howl;
		constraints: {
			readonly diceLeft: Matter.Constraint;
			readonly diceRight: Matter.Constraint;
			readonly freshenerLeft: Matter.Constraint;
			readonly freshenerRight: Matter.Constraint;
		};
		readonly engine: Matter.Engine;
		readonly idleCounter: number;
		readonly isDragging: boolean;
		readonly isRunning: boolean;
		readonly lastStates: { [key: string]: { angle: number; position: { x: number; y: number } } };
		readonly mouseConstraint: Matter.Constraint;
		readonly runner: Matter.Runner;
		readonly strings: string[];
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('freshener', 'freshener-container', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {
			get freshener() {
				return state.$refs.freshener;
			},
			get leftDice() {
				return state.$refs.leftDice;
			},
			get rightDice() {
				return state.$refs.rightDice;
			},
			get string0() {
				return state.$refs.string0;
			},
			get string1() {
				return state.$refs.string1;
			},
			get string2() {
				return state.$refs.string2;
			},
			get string3() {
				return state.$refs.string3;
			},
		},
		props: {},
		methods: {
			get addEventListeners() {
				return state.addEventListeners;
			},
			get addToWorld() {
				return state.addToWorld;
			},
			get cleanup() {
				return state.cleanup;
			},
			get createBodies() {
				return state.createBodies;
			},
			get createConstraint() {
				return state.createConstraint;
			},
			get createConstraints() {
				return state.createConstraints;
			},
			get endDrag() {
				return state.endDrag;
			},
			get ensurePhysicsRunning() {
				return state.ensurePhysicsRunning;
			},
			get getTargetBody() {
				return state.getTargetBody;
			},
			get handleDrag() {
				return state.handleDrag;
			},
			get hasMovement() {
				return state.hasMovement;
			},
			get initPhysics() {
				return state.initPhysics;
			},
			get removeEventListeners() {
				return state.removeEventListeners;
			},
			get startAnimation() {
				return state.startAnimation;
			},
			get startDrag() {
				return state.startDrag;
			},
			get updateElementPosition() {
				return state.updateElementPosition;
			},
			get updateLastStates() {
				return state.updateLastStates;
			},
			get updateString() {
				return state.updateString;
			},
			get updateVisuals() {
				return state.updateVisuals;
			},
		},
		computed: {
			xPosition: {
				get getter() {
					return state._computedWatchers.xPosition.getter;
				},
				get value() {
					return state._computedWatchers.xPosition.value;
				},
			},
		},
		data: {
			CONFIG: {
				freshener: {
					get width() {
						return state.CONFIG.freshener.width;
					},
					get height() {
						return state.CONFIG.freshener.height;
					},
					get xPosition() {
						return state.CONFIG.freshener.xPosition;
					},
					get stringSpacing() {
						return state.CONFIG.freshener.stringSpacing;
					},
					get density() {
						return state.CONFIG.freshener.density;
					},
					get frictionAir() {
						return state.CONFIG.freshener.frictionAir;
					},
					get stringLength() {
						return state.CONFIG.freshener.stringLength;
					},
					get stiffness() {
						return state.CONFIG.freshener.stiffness;
					},
					get damping() {
						return state.CONFIG.freshener.damping;
					},
				},
				dice: {
					get size() {
						return state.CONFIG.dice.size;
					},
					get leftXOffset() {
						return state.CONFIG.dice.leftXOffset;
					},
					get rightXOffset() {
						return state.CONFIG.dice.rightXOffset;
					},
					get yPosition() {
						return state.CONFIG.dice.yPosition;
					},
					get density() {
						return state.CONFIG.dice.density;
					},
					get frictionAir() {
						return state.CONFIG.dice.frictionAir;
					},
					get stringLength() {
						return state.CONFIG.dice.stringLength;
					},
					get stiffness() {
						return state.CONFIG.dice.stiffness;
					},
					get damping() {
						return state.CONFIG.dice.damping;
					},
				},
				physics: {
					get movementThreshold() {
						return state.CONFIG.physics.movementThreshold;
					},
					get angleThreshold() {
						return state.CONFIG.physics.angleThreshold;
					},
					get idleFrames() {
						return state.CONFIG.physics.idleFrames;
					},
				},
			},
			get animationFrameId() {
				return state.animationFrameId;
			},
			bodies: {
				get freshener() {
					return state.bodies.freshener;
				},
				get leftDice() {
					return state.bodies.leftDice;
				},
				get rightDice() {
					return state.bodies.rightDice;
				},
			},
			get clickSound() {
				return state.clickSound;
			},
			constraints: {
				get diceLeft() {
					return state.constraints.diceLeft;
				},
				get diceRight() {
					return state.constraints.diceRight;
				},
				get freshenerLeft() {
					return state.constraints.freshenerLeft;
				},
				get freshenerRight() {
					return state.constraints.freshenerRight;
				},
			},
			get engine() {
				return state.engine;
			},
			get idleCounter() {
				return state.idleCounter;
			},
			get isDragging() {
				return state.isDragging;
			},
			get isRunning() {
				return state.isRunning;
			},
			get lastStates() {
				return state.lastStates;
			},
			get mouseConstraint() {
				return state.mouseConstraint;
			},
			get runner() {
				return state.runner;
			},
			get strings() {
				return state.strings;
			},
		},
	};
});
// export const title = getState('title', 'nuxt-link-active');
export const map: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: Record<string, never>;
	props: Record<string, never>;
	methods: {
		readonly createMap: () => Promise<unknown>;
		readonly flyTo: (lat: number, lng: number) => void;
		readonly getInitialData: () => Promise<unknown>;
		readonly handleUserInteraction: () => void;
		readonly setMarkerPosition: (lat: number, lng: number) => void;
		readonly setMarkerRotation: (rotation: number) => void;
		readonly toggleAttribution: () => void;
		readonly toggleExpand: () => void;
	};
	computed: Record<string, never>;
	data: {
		readonly coordinates: [number, number][];
		readonly isExpanded: boolean;
		readonly lastUserInteraction: number;
		readonly map: Map;
		readonly mapSound: Howl;
		readonly marker: Marker;
		readonly showAttribution: boolean;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('map', 'map-container', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {},
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
		computed: {},
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
	};
});
export const chat: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: {
		readonly chatContainer: HTMLDivElement;
	};
	props: Record<string, never>;
	methods: {
		readonly escapeHTML: (text: string) => string;
		readonly fetchChatEvents: () => Promise<unknown>;
		readonly formatMessage: (text: string) => string;
		readonly getRandomColor: () => string;
		readonly getTime: (timestamp: number) => string;
		readonly handleEvents: (events: ChatEvent[]) => void;
		readonly openDiscord: () => void;
		readonly scrollToBottom: () => void;
		readonly toggleChat: () => void;
		readonly trimMessage: (text: string) => string;
	};
	computed: {
		messagesToShow: {
			readonly getter: () => ChatMessage[];
			readonly value: ChatMessage[];
		};
	};
	data: {
		readonly hideChat: boolean;
		readonly messages: ChatMessage[];
		readonly nameColors: string[];
		readonly userColorMap: {
			[key: string]: string;
		};
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('chat', 'chat-container', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {
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
		computed: {
			messagesToShow: {
				get getter() {
					return state._computedWatchers.messagesToShow.getter;
				},
				get value() {
					return state._computedWatchers.messagesToShow.value;
				},
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
	};
});
export const options: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: Record<string, never>;
	props: {
		readonly chosen: number;
		readonly heading: number;
		readonly options: TravelOption[];
		readonly stopNum: number;
		readonly voted: boolean;
	};
	methods: {
		readonly angleDifference: (angle1: number, angle2: number) => number;
		readonly getRotation: (option: number) => number;
		readonly playBlink: () => void;
		readonly vote: (option: number) => void;
	};
	computed: Record<string, never>;
	data: {
		readonly blinkRate: number;
		readonly blinkSound: Howl;
		readonly selectedIndex: number;
		readonly voteSound: Howl;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('options', 'options', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {},
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
		computed: {},
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
	};
});
export const odometer: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: Record<string, never>;
	props: {
		readonly miles: number;
	};
	methods: {
		readonly getDisplayValue: (miles: number) => number;
		readonly toggleUnit: () => void;
		readonly updateDisplay: (displayNum: number) => void;
	};
	computed: {
		currentUnit: {
			readonly getter: () => number;
			readonly value: number;
		};
	};
	data: {
		readonly conversionFactor: number;
		readonly currentValue: number;
		readonly digits: string[];
		readonly isKilometers: boolean;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('odometer', 'odometer-container', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {},
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
		computed: {
			currentUnit: {
				get getter() {
					return state._computedWatchers.currentUnit.getter;
				},
				get value() {
					return state._computedWatchers.currentUnit.value;
				},
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
	};
});
export const results: Promise<{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state: any;
	elem: HTMLDivElement;
	refs: Record<string, never>;
	props: {
		readonly endTime: number;
		readonly heading: number;
		readonly stopNum: number;
		readonly voteCounts: {
			[key: number]: number;
		};
		readonly voteOptions: TravelOption[];
	};
	methods: {
		readonly angleDifference: (angle1: number, angle2: number) => number;
		readonly getRotation: (option: number) => number;
		readonly setTimeRemaining: () => void;
		readonly startTween: (voteCounts: { [key: number]: number }) => void;
	};
	computed: {
		displayedTotal: {
			readonly getter: () => number;
			readonly value: number;
		};
		topFourOptions: {
			readonly getter: () => { id: number; type: 'direction' | 'skip' | 'honk'; votes: number; index?: number }[];
			readonly value: { id: number; type: 'direction' | 'skip' | 'honk'; votes: number; index?: number }[];
		};
	};
	data: {
		readonly displayedVotes: {
			[key: number]: number;
		};
		readonly otherOptions: number[];
		readonly prevStopNum: number;
		readonly timeRemaining: number;
		readonly timeRemainingInterval: number;
		readonly tweenInterval: number | null;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = getState('results', 'results', (state: any) => {
	return {
		state,
		get elem() {
			return state.$el;
		},
		refs: {},
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
		computed: {
			displayedTotal: {
				get getter() {
					return state._computedWatchers.displayedTotal.getter;
				},
				get value() {
					return state._computedWatchers.displayedTotal.value;
				},
			},
			topFourOptions: {
				get getter() {
					return state._computedWatchers.topFourOptions.getter;
				},
				get value() {
					return state._computedWatchers.topFourOptions.value;
				},
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
	};
});
