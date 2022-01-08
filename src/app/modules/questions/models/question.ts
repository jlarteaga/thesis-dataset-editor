import { Text } from '../../student-answers/models/text';

export interface BaseQuestionDTO {
	uuid: string;
	rawStatement: string;
	sentStatement: string;
	lang: string;
	label: string;
	answer: Text;

}

export interface GetAllQuestionDTO extends BaseQuestionDTO {

}

export class Question {

	uuid: string;
	rawStatement: string;
	sentStatement: string;
	lang: string;
	label: string;
	answer: Text;

	static fromDto({ uuid, lang, answer, label, sentStatement, rawStatement }: GetAllQuestionDTO): Question {
		return new Question({
			uuid,
			lang,
			answer,
			label,
			sentStatement,
			rawStatement
		});
	}

	constructor(question: Question) {
		this.uuid = question.uuid;
		this.rawStatement = question.rawStatement;
		this.sentStatement = question.sentStatement;
		this.lang = question.lang;
		this.label = question.label;
		this.answer = question.answer;
	}
}
