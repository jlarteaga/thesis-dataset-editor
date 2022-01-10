const stopTagRegex = / ?<STOP>/g;
export const removeStopTags = (value: string): string =>
	value.replace(stopTagRegex, '');

const lrbRegex = /-LRB- ?/g;
export const replaceLRB = (value: string): string =>
	value.replace(lrbRegex, '(');

const rrbRegex = / ?-RRB-/g;
export const replaceRRB = (value: string): string =>
	value.replace(rrbRegex, ')');

export const trim = (value: string): string => value.trim();

const sanitizationOperations: Array<(value: string) => string> = [
	removeStopTags,
	replaceLRB,
	replaceRRB,
	trim
];

export const sanitizeText = (value: string): string => {
	return sanitizationOperations.reduce((sanitized, operation) => {
		return operation(sanitized);
	}, value);
};