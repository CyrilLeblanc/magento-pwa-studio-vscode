import * as vscode from "vscode";
import retrieveReference from "../lib/retrieveReference";

/**
 * Go to reference of the current file.
 * A reference is a file that has the same path as the current file,
 * in ./src/overrides and ./node_modules
 */
export default async () => {
	const referenceFilePath = await retrieveReference();

	if (!referenceFilePath) {
		return;
	}

	// open the reference file
	vscode.workspace.openTextDocument(referenceFilePath).then((doc) => {
		vscode.window.showTextDocument(doc);
	});
};
