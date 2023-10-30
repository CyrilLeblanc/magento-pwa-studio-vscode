import * as fs from "fs";

export const referenceFolders = ["/src/overrides/", "/node_modules/"];

/**
 * Get the reference file path for a given path
 *
 * @param path
 * @returns {string|false}
 */
export function getReferenceFilePath(path: string): string|false
{
	if (path && isReferable(path)) {
		const referenceFolder = getReferenceFolder(path);

		if (referenceFolder) {
			const oppositeReferenceFolder = getOppositeReferenceFolder(referenceFolder);

			const referenceFilePath = path.replace(referenceFolder, oppositeReferenceFolder);

			if(fs.existsSync(referenceFilePath)) {
				return referenceFilePath;
			}
		}
	}

	return false;
}

/**
 * Return true if the given file path is referable.
 *
 * @param path
 * @returns {boolean}
 */
export function isReferable(path: string): boolean
{
	return !!getReferenceFolder(path);
}

/**
 * Give the referenceFolder for the given path
 *
 * @param path
 * @returns {string|undefined}
 */
export function getReferenceFolder(path: string): string|undefined
{
	return referenceFolders.find(folder => path.includes(folder));
}

/**
 * Get the opposite of the given referenceFolder
 *
 * @param path
 * @returns {string}
 */
export function getOppositeReferenceFolder(referenceFolder: string): string
{
	const index = getReferenceFolderIndex(referenceFolder);
	const newIndex = index ? 0 : 1;

	return referenceFolders[newIndex];
}

/**
 * Give the index of the given referenceFolder
 *
 * @param path
 * @returns {number}
 */
export function getReferenceFolderIndex(path: string): number
{
	return referenceFolders.findIndex(folder => path.includes(folder));
}
