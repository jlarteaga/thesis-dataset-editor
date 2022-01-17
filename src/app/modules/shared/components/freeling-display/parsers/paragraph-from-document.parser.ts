import { FreelingDocument, FreelingParagraph } from '../models';
import { parseSentencesFromParagraph } from './sentences-from-parapgrah.parser';

export const parseParagraphFromDocument = (document: any, freelingDocument: FreelingDocument): FreelingParagraph => {
	if (!document.paragraph) {
		throw new Error('Document doesn\'t contain a paragraph');
	}
	const paragraph: FreelingParagraph = {
		id: 'jl.1',
		sentences: parseSentencesFromParagraph(document.paragraph, freelingDocument)
	};
	freelingDocument.addParagraph(paragraph);
	return paragraph;
};
