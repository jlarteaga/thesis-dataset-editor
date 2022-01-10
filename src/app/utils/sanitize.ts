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

export const finalDot = (value: string): string => (value.endsWith('.') ? value : value + '.');

export const firstLetterCapital = (value: string): string => {
	if (value[0].toUpperCase() === value[0]) {
		return value;
	} else {
		let parsedValue = value.split('');
		parsedValue[0] = parsedValue[0].toUpperCase();
		return parsedValue.join('');
	}
};

const sanitizationOperations: Array<(value: string) => string> = [
	removeStopTags,
	replaceLRB,
	replaceRRB,
	trim,
	finalDot,
	firstLetterCapital
];

export const sanitizeText = (value: string): string => {
	return sanitizationOperations.reduce((sanitized, operation) => {
		return operation(sanitized);
	}, value);
};