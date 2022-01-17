import { FreelingDocument } from '../models';
import { parseParagraphFromDocument } from './paragraph-from-document.parser';

export const parseDocumentFromObject = (object: any): FreelingDocument => {
	if (!object) {
		throw new Error('Empty object');
	}
	if (!object.document) {
		throw new Error('Object doesn\'t contain a document tag');
	}

	const document = new FreelingDocument();
	parseParagraphFromDocument(object.document, document);
	return document;
};