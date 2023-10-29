import * as vscode from "vscode";

const referenceFolders = ["/src/overrides/", "/node_modules/"];

/**
 * Retrieve the override or source of the current file.
 * in ./src/overrides and ./node_modules
 */
function retrieveReference(): Promise<string | undefined> {
	return new Promise((resolve, reject) => {

		// current file path
		const currentFilePath =
			vscode.window.activeTextEditor?.document.uri.fsPath;

		if (!currentFilePath) {
			return reject();
		}

		// detect which reference folder the current file is in
		const referenceFolder = referenceFolders.find((folder) => {
			return currentFilePath.includes(folder);
		});

		if (!referenceFolder) {
			return reject();
		}

		const referenceFolderIndex = referenceFolders.indexOf(referenceFolder);

		// find the reference file path
		const referenceFilePath = currentFilePath.replace(
			referenceFolder,
			referenceFolders[referenceFolderIndex === 0 ? 1 : 0]
		);

		// detect if the reference file exists
		vscode.workspace.fs
			.stat(vscode.Uri.file(referenceFilePath))
			.then((stat) => {
				if (!stat) {
					return reject();
				}

				resolve(referenceFilePath);
			});
	});
};

export default retrieveReference;
