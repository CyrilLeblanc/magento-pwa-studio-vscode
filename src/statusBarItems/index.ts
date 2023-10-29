import * as vscode from 'vscode';

import indicator from './indicator';

export const statusBarItems = [indicator];

export const registerStatusBarItems = (context: vscode.ExtensionContext) => {
	statusBarItems.forEach(({statusBarItem, update}) => {
		context.subscriptions.push(statusBarItem);
		update();
	});
};
