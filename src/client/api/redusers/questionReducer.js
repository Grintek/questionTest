
import {UPDATE_QUESTION, DELETE_QUESTION, CREATE_QUESTION, ADD_ANSWER, QUESTIONS, QUESTION} from '../../constants/QuestionConstants';
const initialState = {
    questioner: { id: 0, description: '', answer: [] },
    questions: [],
    answer: { correct: '',
        id: 0,
        name: ''}
};

export default function questionState(state = initialState, action) {
    switch (action.type) {
        case QUESTION:
            return { ...state, questioner: action.questioner };
        case QUESTIONS:
            return { ...state, questions: action.questions };
        case ADD_ANSWER:
            return { ...state, answer: action.answer };
        case CREATE_QUESTION:
            return { ...state, questioner: action.questioner};
        case DELETE_QUESTION:
            return { ...state, questioner: action.questioner};
        case UPDATE_QUESTION:
            return { ...state, questioner: action.questioner};
            default:
            return state;
    }
}