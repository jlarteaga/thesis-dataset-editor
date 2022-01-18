import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, Observable, zip } from 'rxjs';
import { SupportedLanguage } from '../../../../utils/global-types';
import { Question } from '../../../questions/models/question';
import { QuestionsService } from '../../../questions/services/questions.service';
import { GetStudentAnswerSummarizedDTO } from '../../../student-answers/dtos/get-student-answer-summarized.dto';
import { StudentAnswer } from '../../../student-answers/models/student-answer';
import { StudentAnswersService } from '../../../student-answers/services/student-answers.service';
import { TranslationNodesActions } from '../actions';
import { QuestionTranslationNode, StudentAnswerTranslationNode } from '../translations.state';

@Injectable()
export class TranslationNodesEffects {

	loadQuestionNodes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.loadQuestionTranslationNodes),
			exhaustMap(() =>
				this.retrieveQuestionTranslationNodes().pipe(
					map(translationNodes => TranslationNodesActions.setQuestionTranslationNodes({
						translationNodes
					}))
				)
			)
		)
	);

	setQuestionNodes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.setQuestionTranslationNodes),
			map(() => {
				return TranslationNodesActions.questionTranslationNodesLoaded();
			})
		));

	loadStudentAnswerNodes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.loadStudentAnswerNodes),
			exhaustMap(({ parentNode }) =>
				this.retrieveStudentAnswerTranslationNodes(parentNode).pipe(
					map((studentAnswerTranslationNodes: StudentAnswerTranslationNode[]) => TranslationNodesActions.setStudentAnswerNodes({
						parentNode,
						nodes: studentAnswerTranslationNodes
					}))
				))
		)
	);

	setStudentAnswerNodes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.setStudentAnswerNodes),
			map(() => TranslationNodesActions.studentAnswerNodesLoaded())
		));

	unloadStudentAnswerNodes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.unloadStudentAnswerNodes),
			map(() => TranslationNodesActions.studentAnswerNodesUnloaded())
		));

	constructor(
		private actions$: Actions,
		private questionsService: QuestionsService,
		private studentAnswersService: StudentAnswersService
	) {
	}

	private retrieveQuestionTranslationNodes(): Observable<QuestionTranslationNode[]> {
		return this.questionsService.getAll().pipe(
			map(getAllQuestionDTOs => getAllQuestionDTOs.map(getAllQuestionDTO => Question.fromDTO(getAllQuestionDTO))),
			map(questions => {
				const questionsMap = new Map<string, Partial<Record<SupportedLanguage, Question>>>();
				questions.forEach(question => {
					if (!questionsMap.has(question.label)) {
						questionsMap.set(question.label, {});
					}
					// @ts-ignore
					questionsMap.get(question.label)[question.lang] = question;
				});
				const nodes: QuestionTranslationNode[] = [];
				questionsMap.forEach((questionPair) => {
					// @ts-ignore
					const referenceQuestion: Question = questionPair.es || questionPair.en;
					const [testNumber, questionNumber] = Question.getTestAndQuestionNumber(referenceQuestion.label);
					nodes.push({
						type: 'question',
						testNumber,
						questionNumber,
						label: referenceQuestion.label,
						element: questionPair,
						children: [],
						isLoading: false
					});
				});
				nodes.sort((node1, node2) => (node1.testNumber - node2.testNumber) || (node1.questionNumber - node2.questionNumber));
				return nodes;
			})
		);
	}

	private retrieveStudentAnswerTranslationNodes(parentNode: QuestionTranslationNode): Observable<StudentAnswerTranslationNode[]> {
		return zip(
			this.studentAnswersService.getAllByQuestionUuid(parentNode.element?.es?.uuid),
			this.studentAnswersService.getAllByQuestionUuid(parentNode.element?.en?.uuid)
		).pipe(
			map(([esStudentAnswerDTOs, enStudentAnswerDTOs]) => [...esStudentAnswerDTOs, ...enStudentAnswerDTOs]),
			map((studentAnswerDTOs: GetStudentAnswerSummarizedDTO[]) => {
				const children: Array<StudentAnswerTranslationNode> = [];
				studentAnswerDTOs.forEach(studentAnswerDTO => {
					if (!children[studentAnswerDTO.student]) {
						children[studentAnswerDTO.student] = {
							type: 'student-answer',
							questionLabel: parentNode.label,
							index: studentAnswerDTO.student,
							element: {}
						};
					}
					children[studentAnswerDTO.student].element[studentAnswerDTO.text.lang] = StudentAnswer.fromSummarizedDTO(studentAnswerDTO);
				});
				return children;
			})
		);
	}
}