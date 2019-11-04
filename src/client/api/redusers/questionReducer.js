
import {UPDATE_QUESTION, DELETE_QUESTION, CREATE_QUESTION, ADD_ANSWER, QUESTIONS, QUESTION} from '../../constants/QuestionConstants';
const initialState = {
    question: { id: 0, description: '', answers: [
        ] },
    questions: [],
    answer: { correct: '',
        id: 0,
        name: ''}
};

export default function questionState(state = initialState, action) {
    switch (action.type) {
        case QUESTION:
            return { ...state, question: action.question };
        case QUESTIONS:
            return { ...state, questions: action.questions };
        case ADD_ANSWER:
            return { ...state, answer: action.answer };
        case CREATE_QUESTION:
            return { ...state, question: action.question};
        case DELETE_QUESTION:
            return { ...state, question: action.question};
        case UPDATE_QUESTION:
            return { ...state, question: action.question};
            default:
            return state;
    }
}