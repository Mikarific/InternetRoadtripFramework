/*! internet-roadtrip-framework@0.1.0-beta | MIT License */
var _IRF, _IRF2;
Object.defineProperty(typeof IRF !== 'undefined' && IRF || {}, 'internal', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {
    refreshOnStateChange: false
  }
});
const flags = {
  refreshOnStateChange: typeof ((_IRF = IRF) == null || (_IRF = _IRF.internal) == null ? void 0 : _IRF.refreshOnStateChange) !== 'undefined' && ((_IRF2 = IRF) == null || (_IRF2 = _IRF2.internal) == null ? void 0 : _IRF2.refreshOnStateChange) || false
};

if (window.location.hostname === 'neal.fun' && !flags.refreshOnStateChange) {
  let finishedLoading = false;
  window.history.pushState = new Proxy(history.pushState, {
    apply: (target, thisArg, argsList) => {
      if (argsList[2] !== undefined && finishedLoading) {
        const newURL = new URL(argsList[2], document.baseURI);
        const isInternetRoadtrip = newURL.hostname === 'neal.fun' && newURL.pathname === '/internet-roadtrip/';
        Object.assign(typeof IRF !== 'undefined' && IRF || {}, {
          isInternetRoadtrip
        });
        if (isInternetRoadtrip) location.replace(newURL);
      }
      return Reflect.apply(target, thisArg, argsList);
    }
  });
  window.history.replaceState = new Proxy(history.replaceState, {
    apply: (target, thisArg, argsList) => {
      if (argsList[2] !== undefined && finishedLoading) {
        const newURL = new URL(argsList[2], document.baseURI);
        const isInternetRoadtrip = newURL.hostname === 'neal.fun' && newURL.pathname === '/internet-roadtrip/';
        Object.assign(typeof IRF !== 'undefined' && IRF || {}, {
          isInternetRoadtrip
        });
        if (isInternetRoadtrip) location.replace(newURL);
      }
      return Reflect.apply(target, thisArg, argsList);
    }
  });
  window.addEventListener('popstate', () => {
    if (finishedLoading) {
      const newURL = new URL(window.location.href);
      const isInternetRoadtrip = newURL.hostname === 'neal.fun' && newURL.pathname === '/internet-roadtrip/';
      Object.assign(typeof IRF !== 'undefined' && IRF || {}, {
        isInternetRoadtrip
      });
      if (isInternetRoadtrip) location.replace(newURL);
    }
  });
  if (document.readyState === 'interactive') {
    finishedLoading = true;
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      finishedLoading = true;
    }, {
      once: true
    });
  }
  flags.refreshOnStateChange = true;
}

function domPromise(elem) {
  return new Promise(resolve => {
    if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
      if (document.readyState === 'interactive') {
        resolve(elem());
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          resolve(elem());
        }, {
          once: true
        });
      }
    } else {
      resolve(null);
    }
  });
}
const container$1 = domPromise(() => document.querySelector('.container'));

var dom = /*#__PURE__*/Object.freeze({
__proto__: null,
container: container$1
});

const container = new Promise((resolve, reject) => {
  function getStateAndData(resolve, reject) {
    container$1.then(container => {
      const vContainer = container.__vue__;
      if (vContainer === undefined) return reject(new Error('Could not find virtual DOM.'));
      const state = vContainer.ws === undefined ? vContainer.$children.find(child => child.ws !== undefined) : vContainer;
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
          }
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
          }
        },
        watchers: {
          get panoUrl() {
            return state._computedWatchers.panoUrl;
          }
        }
      });
    });
  }
  if (window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/') {
    if (document.readyState === 'complete') {
      getStateAndData(resolve, reject);
    } else {
      window.addEventListener('load', () => {
        getStateAndData(resolve, reject);
      }, {
        once: true
      });
    }
  } else {
    resolve(null);
  }
});

var vdom = /*#__PURE__*/Object.freeze({
__proto__: null,
container: container
});

const version = '0.1.0-beta';
const isInternetRoadtrip = window.location.hostname === 'neal.fun' && window.location.pathname === '/internet-roadtrip/';

export { dom, isInternetRoadtrip, vdom, version };
