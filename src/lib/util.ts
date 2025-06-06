export function page(script: string) {
	const elem = document.createElement('script');
	elem.textContent = script;
	document.documentElement.appendChild(elem);
	elem.remove();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function content(script: string): any {
	return window.eval(script);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrapProp(obj: object, prop: string): any {
	return ('wrappedJSObject' in obj ? obj.wrappedJSObject : obj)[prop];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFromPageWindow(prop: string): any {
	return unwrapProp(window, prop);
}

export function getOrSet(obj: string, prop: string, value: string): string {
	// obj.prop === undefined ? (obj.prop = value) : obj.prop;
	return `void 0===${obj}.${prop}?(${obj}.${prop}=${value}):${obj}.${prop}`;
}

function versionCompare(current: string, latest: string) {
	if (current === undefined) return true;
	if (current.startsWith(latest + '-')) return true;
	if (latest.startsWith(current + '-')) return false;
	return current.localeCompare(latest, undefined, { numeric: true, sensitivity: 'case', caseFirst: 'upper' }) === -1;
}
export function ifExistingVersionLessThan(version: string): boolean {
	// existingVersion < version
	return content(`(${versionCompare.toString()})(window.IRF.version,'${version}')`);
}
export function getOrSetWithOverrideVersion(obj: string, prop: string, value: string, version: string): string {
	// (existingVersion < version || obj.prop === undefined) ? (obj.prop = value) : obj.prop;
	return `((${versionCompare.toString()})(window.IRF.version,'${version}')||void 0===${obj}.${prop})?(${obj}.${prop}=${value}):${obj}.${prop}`;
}
