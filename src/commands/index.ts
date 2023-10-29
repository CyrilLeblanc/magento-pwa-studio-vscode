import * as vscode from "vscode";
import { extensionId } from "../constants";

import goToReference from "./goToReference";

export const commands: { [index: string]: (...args: any[]) => any } = {
	goToReference
};

/**
 * Register all commands
 *
 * @param context {vscode.ExtensionContext}
 */
export const registerCommands = (context: vscode.ExtensionContext) => {
	const identifiers = Object.keys(commands);

	identifiers.forEach((identifier) => {
		const disposable = vscode.commands.registerCommand(
			`${extensionId}.${identifier}`,
			commands[identifier]
		);

		context.subscriptions.push(disposable);
	});
};
