import * as vscode from "vscode";
import { getReferenceFilePath } from "../lib/referenceFolder";

/**
 * Open the given file path in the editor
 */
function openFileInEditor(path: string) {
	vscode.workspace.openTextDocument(path).then((doc) => {
		vscode.window.showTextDocument(doc);
	});
}

/**
 * Go to reference of the current file.
 *
 * A reference is a file that has a relative path from ./src/overrides
 * to ./node_modules
 */
export default () => {
	const currentFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

	if (currentFilePath) {
		const referenceFilePath = getReferenceFilePath(currentFilePath)

		if (referenceFilePath) {
			openFileInEditor(referenceFilePath);
		}
	}
};
