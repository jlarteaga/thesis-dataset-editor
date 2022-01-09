import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, Observable } from 'rxjs';
import { SupportedLanguage } from '../../../../utils/global-types';
import { Question } from '../../../questions/models/question';
import { QuestionsService } from '../../../questions/services/questions.service';
import { TranslationNodesActions } from '../actions';
import { QuestionTranslationNode, TranslationNode } from '../translations.state';

@Injectable()
export class TranslationNodesEffects {

	loadTranslations$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.loadTranslationNodes),
			exhaustMap(() =>
				this.retrieveTranslationNodes().pipe(
					map(translationNodes => TranslationNodesActions.setTranslationNodes({
						translationNodes
					}))
				)
			)
		)
	);

	setTranslationNodes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.setTranslationNodes),
			map(() => TranslationNodesActions.translationNodesLoaded())
		));

	constructor(
		private actions$: Actions,
		private questionsService: QuestionsService
	) {
	}

	private retrieveTranslationNodes(): Observable<TranslationNode[]> {
		return this.questionsService.getAll().pipe(
			map(getAllQuestionDTOs => getAllQuestionDTOs.map(getAllQuestionDTO => Question.fromDto(getAllQuestionDTO))),
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
						children: []
					});
				});
				nodes.sort((node1, node2) => (node1.testNumber - node2.testNumber) || (node1.questionNumber - node2.questionNumber));
				return nodes;
			})
		);
	}
}