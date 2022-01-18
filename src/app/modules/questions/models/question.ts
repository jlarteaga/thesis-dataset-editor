import { Text } from '../../student-answers/models/text';
import { GetAllQuestionDTO } from '../dtos/get-all-question.dto';

export const LABEL_REGEX = /^(\d+)\.(\d+)/;

export class Question {

	uuid: string;
	rawStatement: string;
	sentStatement: string;
	lang: string;
	label: string;
	answer: Text;

	static fromDTO(
		{
			uuid,
			lang,
			answer,
			label,
			sentStatement,
			rawStatement
		}: GetAllQuestionDTO
	): Question {
		return new Question({
			uuid,
			lang,
			answer,
			label,
			sentStatement,
			rawStatement
		});
	}

	static getTestAndQuestionNumber(label: string): [number, number] {
		const results = LABEL_REGEX.exec(label);
		if (results === null) {
			return [NaN, NaN];
		}
		return [parseInt(results[1], 10), parseInt(results[2], 10)];
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
