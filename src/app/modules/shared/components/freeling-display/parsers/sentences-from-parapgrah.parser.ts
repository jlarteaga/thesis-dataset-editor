import { FreelingDocument, FreelingSentence } from '../models';
import { parseDependenciesFromSentence } from './dependencies-from-sentence.parser';
import { parseTokensFromSentence } from './tokens-from-sentence.parser';

export const parseSentencesFromParagraph = (paragraph: any, freelingDocument: FreelingDocument): FreelingSentence[] => {
	if (!paragraph.sentence) {
		throw new Error('Paragraph doesn\'t contain a sentence');
	}
	const sentenceSources: any[] = Array.isArray(paragraph.sentence)
		? paragraph.sentence
		: [paragraph.sentence];
	return sentenceSources.map((sentenceSource) => {
		if (!sentenceSource['@_id']) {
			throw new Error('Sentence doesn\'t contain an id');
		}
		const sentence: FreelingSentence = {
			id: sentenceSource['@_id'],
			tokens: parseTokensFromSentence(sentenceSource, freelingDocument),
			dependencies: parseDependenciesFromSentence(sentenceSource, freelingDocument)
		};
		freelingDocument.addSentence(sentence);
		return sentence;
	});
};