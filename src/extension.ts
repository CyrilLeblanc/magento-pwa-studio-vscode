import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerStatusBarItems } from "./statusBarItems";

export function activate(context: vscode.ExtensionContext) {
	registerCommands(context);
	registerStatusBarItems(context);
}

export function deactivate() {}
