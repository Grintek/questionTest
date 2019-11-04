import {QUESTION, QUESTIONS, ADD_ANSWER, CREATE_QUESTION, DELETE_QUESTION, UPDATE_QUESTION} from "../constants/QuestionConstants"

export const fetchQuestions = (questions) => {
    return{
        type: QUESTIONS,
        questions: questions
    }
};
export const fetchQuestion = (question) => {
    return{
        type: QUESTION,
        question
    }
};
export const addAnswer = (answer) => {
    return{
        type: ADD_ANSWER,
        answer
    }
};
export const createQuestion = (question) => {
    return{
        type: CREATE_QUESTION,
        question
    }
};
export const deleteQuestions = () => {
    return{
        type: DELETE_QUESTION,
    }
};
export const updateQuestion = (question) => {
    return{
        type: UPDATE_QUESTION,
        question
    }
};