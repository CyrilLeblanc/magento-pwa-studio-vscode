import * as vscode from "vscode";
import retrieveReference from "../lib/retrieveReference";

let statusBarItem = vscode.window.createStatusBarItem(
	vscode.StatusBarAlignment.Left,
	100
);

statusBarItem.command = "magento-pwa-studio.goToReference";

const update = () => {
	statusBarItem.text = `$(search) Checking reference...`;
	retrieveReference()
		.then((referenceFilePath) => {
			statusBarItem.text = `$(search) Go to reference`;
		})
		.catch(() => {
			statusBarItem.text = `$(search) No reference found`;
		})
		.finally(() => {
			statusBarItem.show();
		});
};

vscode.window.onDidChangeActiveTextEditor(update);

export default {
	statusBarItem,
	update,
};
