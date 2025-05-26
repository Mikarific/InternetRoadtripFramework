export function runInPageContext(script: string) {
	const elem = document.createElement('script');
	elem.textContent = script;
	document.documentElement.appendChild(elem);
	elem.remove();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runInContentContext(script: string): any {
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
