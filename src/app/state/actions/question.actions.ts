import { GetAllQuestionDTO } from '../../modules/questions/models/question';
import { ResponseError } from '../../utils/http';
import { createHttpActions } from '../../utils/state';

const [
	getAllQuestions,
	getAllQuestionsSuccess,
	getAllQuestionsError
] = createHttpActions<void, Array<GetAllQuestionDTO>, ResponseError>('[Questions] Get All');

export const QuestionActions = {
	getAllQuestions,
	getAllQuestionsSuccess,
	getAllQuestionsError
};