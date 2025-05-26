import { Buffer } from 'node:buffer';

/** @return {import('rollup').Plugin} */
export default function debugLibraryUserScriptOutputPlugin() {
	const renderUserscript = ({ libraryUrl }) => `
// ==UserScript==
// @name         Internet Roadtrip Framework debugging
// @match        https://*/*
// @run-at       document-start
// @require      ${libraryUrl}
// ==/UserScript==

(async () => {
	debugger;
})();
	`.trim() + '\n';

  return {
    name: 'debug-library-userscript-output',

    generateBundle(_outputOptions, bundle) {
			let fileName = 'test.user.js';
			let outputSourceCode = '';

			for (const assetOrChunk of Object.values(bundle)) {
				if (assetOrChunk.type === 'asset') {
					continue;
				}

				const chunk = /** @type {import('rollup').OutputChunk} */ (assetOrChunk);
				if (!chunk.isEntry) {
					continue;
				}

				fileName = chunk.fileName;
				outputSourceCode += chunk.code + '\n';
			}

			const outputBase64Data = Buffer.from(outputSourceCode).toString('base64');
			const outputBase64Url = `data:text/javascript;base64,${outputBase64Data}`;

			this.emitFile({
				type: 'asset',
				fileName,
				source: renderUserscript({ libraryUrl: outputBase64Url })
			});
    }
  };
}
