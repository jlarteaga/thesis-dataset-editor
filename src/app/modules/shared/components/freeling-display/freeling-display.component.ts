import { Component, Input } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';
import { FreelingDocument } from './models';
import { parseDocumentFromObject } from './parsers/document-from-object.parser';

const INVALID_FORMAT_MSG = 'Invalid format';

@Component({
	selector: 'app-freeling-display',
	templateUrl: './freeling-display.component.html',
	styleUrls: ['./freeling-display.component.scss']
})
export class FreelingDisplayComponent {

	errorMessage: string | null = null;
	document: FreelingDocument | null = null;

	private parser: XMLParser;

	@Input()
	set xml(xmlString: string | undefined) {
		this.errorMessage = null;
		this.document = null;
		if (xmlString) {
			const parsedElement = this.parser.parse(xmlString || '');
			try {
				this.document = parseDocumentFromObject(parsedElement);
			} catch (e) {
				console.error(e);
				this.errorMessage = INVALID_FORMAT_MSG;
			}
		} else {
			this.errorMessage = INVALID_FORMAT_MSG;
		}
	}

	constructor() {
		this.parser = new XMLParser({
			allowBooleanAttributes: false,
			alwaysCreateTextNode: false,
			ignoreAttributes: false
		});
	}

}
