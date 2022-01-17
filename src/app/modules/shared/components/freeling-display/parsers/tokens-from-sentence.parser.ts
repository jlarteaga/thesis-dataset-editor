import { FreelingDocument, FreelingToken } from '../models';

const FREELING_TOKEN_REQUIRED_PROPERTIES = [
	'@_id',
	'@_begin',
	'@_end',
	'@_form',
	'@_lemma',
	'@_tag',
	'@_ctag'
];

export const parseTokensFromSentence = (sentence: any, freelingDocument: FreelingDocument): FreelingToken[] => {
	const sourceTokens = sentence.token;
	if (!sourceTokens || !Array.isArray(sourceTokens)) {
		return [];
	}
	return sourceTokens.map(sourceToken => {
		FREELING_TOKEN_REQUIRED_PROPERTIES.forEach(requiredProperty => {
			if (!sourceToken[requiredProperty]) {
				throw new Error(`This token does not have the attribute ${requiredProperty}`);
			}
		});
		const parsedToken: FreelingToken = {
			id: sourceToken['@_id'],
			begin: parseInt(sourceToken['@_begin'], 10),
			end: parseInt(sourceToken['@_end'], 10),
			form: sourceToken['@_form'],
			lemma: sourceToken['@_lemma'],
			tag: sourceToken['@_tag'],
			ctag: sourceToken['@_ctag'],
			type: sourceToken['@_type'],
			mood: sourceToken['@_mood']
		};
		if (sourceToken['@_wn']) {
			parsedToken.wn = sourceToken['@_wn'];
		}
		if (sourceToken['@_mood']) {
			parsedToken.mood = sourceToken['@_mood'];
		}
		if (sourceToken['@_type']) {
			parsedToken.type = sourceToken['@_type'];
		}
		if (sourceToken['@_pos']) {
			parsedToken.pos = sourceToken['@_pos'];
		}
		freelingDocument.addToken(parsedToken);
		return parsedToken;
	});
};