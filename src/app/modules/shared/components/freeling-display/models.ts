export class FreelingDocument {

	private _tokens: Map<string, FreelingToken> = new Map<string, FreelingToken>();

	get tokens(): FreelingToken[] {
		return Array.from(this._tokens.values());
	}

	private _paragraphs: Map<string, FreelingParagraph> = new Map<string, FreelingParagraph>();

	get paragraphs(): FreelingParagraph[] {
		return Array.from(this._paragraphs.values());
	}

	private _sentences: Map<string, FreelingSentence> = new Map<string, FreelingSentence>();

	get sentences(): FreelingSentence[] {
		return Array.from(this._sentences.values());
	}

	addParagraph(paragraph: FreelingParagraph) {
		this._paragraphs.set(paragraph.id, paragraph);
	}

	addSentence(sentence: FreelingSentence) {
		this._sentences.set(sentence.id, sentence);
	}

	addToken(token: FreelingToken) {
		this._tokens.set(token.id, token);
	}

	containsToken(tokenId: string) {
		return this._tokens.has(tokenId);
	}

	getToken(tokenId: any): FreelingToken | undefined {
		return this._tokens.get(tokenId);
	}

}

export interface FreelingParagraph {
	id: string;
	sentences: FreelingSentence[];
}

export interface FreelingSentence {
	id: string;
	tokens: FreelingToken[];
	dependencies: FreelingDepNode;
}

export interface FreelingDepNode {
	token: FreelingToken;
	function: string;
	word: string;
	children?: FreelingDepNode[];
}

export interface FreelingToken {
	id: string;
	begin: number;
	end: number;
	form: string;
	lemma: string;
	tag: string;
	ctag: string;
	pos?: string;
	type?: string;
	mood?: string;
	wn?: string;
}