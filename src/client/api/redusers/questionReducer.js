import {
    UPDATE_QUESTION,
    DELETE_QUESTION,
    CREATE_QUESTION,
    ADD_ANSWER,
    QUESTIONS,
    QUESTION,
    QUESTIONS_TEST,
    RESULT_TEST
} from '../../constants/QuestionConstants';

const initialState = {
    question: {
        id: 0, description: '', answers: []
    },
    questions: [],
    answer: {
        correct: '',
        id: 0,
        name: ''
    },
    result: {
        correct: 0,
        incorrect: 0
    }
};

export default function questionState(state = initialState, action) {
    switch (action.type) {
        case QUESTION:
            return {...state, question: action.question};
        case QUESTIONS:
            return {...state, questions: action.questions};
        case ADD_ANSWER:
            return {...state, answer: action.answer};
        case CREATE_QUESTION:
            return {...state, question: action.question};
        case DELETE_QUESTION:
            return {...state, question: action.question};
        case UPDATE_QUESTION:
            return {...state, question: action.question};
        case QUESTIONS_TEST:
            return {...state, questions: action.questions};
        case RESULT_TEST:
            return {...state, result: action.result};
        default:
            return state;
    }
}