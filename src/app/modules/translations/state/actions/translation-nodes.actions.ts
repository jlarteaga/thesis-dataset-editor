import { createAction, props } from '@ngrx/store';
import { GetQuestionDTO } from '../../../questions/dtos/get-question.dto';
import { PatchQuestionDto } from '../../../questions/dtos/patch-question.dto';
import { QuestionTranslationNode, StudentAnswerTranslationNode } from '../translations.state';

enum TranslationNodesAction {
	LoadQuestionNodes = '[Translations] Load question nodes',
	SetQuestionNodes = '[Translations] Set question nodes',
	QuestionNodesLoaded = '[Translations] Loaded question nodes',

	LoadStudentAnswerNodes = '[Translations] Load student answer nodes',
	SetStudentAnswerNodes = '[Translations] Set student answer nodes',
	StudentAnswerNodesLoaded = '[Translations] Loaded student answer nodes',
	UnloadStudentAnswerNodes = '[Translations] Unload student answer nodes',
	StudentAnswerNodesUnloaded = '[Translations] Unloaded student answer nodes',

	PatchQuestion = '[Translations] Patch question',
	QuestionPatched = '[Translations] Patched question',
}

export const loadQuestionTranslationNodes = createAction(
	TranslationNodesAction.LoadQuestionNodes
);

export const setQuestionTranslationNodes = createAction(
	TranslationNodesAction.SetQuestionNodes,
	props<{
		translationNodes: QuestionTranslationNode[]
	}>()
);

export const questionTranslationNodesLoaded = createAction(
	TranslationNodesAction.QuestionNodesLoaded
);

export const loadStudentAnswerNodes = createAction(
	TranslationNodesAction.LoadStudentAnswerNodes,
	props<{
		parentNode: QuestionTranslationNode
	}>()
);

export const setStudentAnswerNodes = createAction(
	TranslationNodesAction.SetStudentAnswerNodes,
	props<{
		parentNode: QuestionTranslationNode,
		nodes: StudentAnswerTranslationNode[]
	}>()
);

export const studentAnswerNodesLoaded = createAction(
	TranslationNodesAction.StudentAnswerNodesLoaded
);

export const unloadStudentAnswerNodes = createAction(
	TranslationNodesAction.UnloadStudentAnswerNodes,
	props<{
		parentNode: QuestionTranslationNode
	}>()
);

export const studentAnswerNodesUnloaded = createAction(
	TranslationNodesAction.StudentAnswerNodesUnloaded
);

export const patchQuestion = createAction(
	TranslationNodesAction.PatchQuestion,
	props<{
		uuid: string;
		patch: PatchQuestionDto;
	}>()
);

export const questionPatched = createAction(
	TranslationNodesAction.QuestionPatched,
	props<{
		uuid: string;
		question: GetQuestionDTO
	}>()
);
