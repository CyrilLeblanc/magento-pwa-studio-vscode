import * as vscode from "vscode";
import { extensionId } from "../constants";
import { getReferenceFilePath, isReferable } from "../lib/referenceFolder";

let statusBarItem = vscode.window.createStatusBarItem(
	vscode.StatusBarAlignment.Left,
	100
);

/**
 * Set the text of the status bar item
 *
 * @param text
 */
function setText(text: string) {
	statusBarItem.text = `$(search) ${vscode.l10n.t(text)}`;
}

function update() {
	const currentFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

	if (!currentFilePath || !isReferable(currentFilePath)) {
		statusBarItem.hide();
	} else if (currentFilePath && isReferable(currentFilePath)) {
		const referenceFilePath = getReferenceFilePath(currentFilePath);

		if (referenceFilePath) {
			setText("Go to reference");
		} else {
			setText("No reference found");
		}
		statusBarItem.show();
	}
}

// Handle click to show the reference file
statusBarItem.command = `${extensionId}.goToReference`;

// Update the status bar item when the active editor changes
vscode.window.onDidChangeActiveTextEditor(update);

export default {
	statusBarItem,
	update,
};
