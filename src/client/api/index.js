import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { apiPrefix } from '../../etc/config.json';
import { prefixApi } from '../../etc/configTest.json';
import {fetchBooks, fetchBookId} from '../actions/BookActions';
import {addAnswer, createQuestion, deleteQuestions, fetchQuestion, fetchQuestions, updateQuestion} from "../actions/QuestionActions";
/**
 * Получить книги
 */
export const fetchAllBooks = () => {
    return (dispatch) => {
       return axios.get(`${apiPrefix}/api/books`)
            .then(response => {
                dispatch(fetchBooks(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

/**
 * Получить книгу
 */
export const fetchBook = (id) => {
    return (dispatch) => {
       return axios.get(`${apiPrefix}/api/book/${id}`)
            .then(response => {
                console.log(id);
                dispatch(fetchBookId(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

//получить все вопросы
export const fetchAllQuestions = () => {
    return (dispatch) => {
        return axios.get(`${prefixApi}/questions`)
            .then(response => {
                dispatch(fetchQuestions(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//получить вопрос по id
export const frtchOneQuestion = (id) => {
    return (dispatch) => {
        return axios.get(`${prefixApi}/questions/${id}`)
            .then(response => {
                dispatch(fetchQuestion(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//удаление по id
export const deleteQuestion = (id) => {
    return (dispatch) => {
        return axios.delete(`${prefixApi}/questions/${id}`)
            .then(response => {
                dispatch(deleteQuestions(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//обновление Question
export const updateOnehQuestion = (id) => {
    return (dispatch) => {
        return axios.put(`${prefixApi}/questions/${id}`)
            .then(response => {
                dispatch(updateQuestion(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//создание Question
export const createOneQuestion = (description) => {
    return (dispatch) => {
        return axios.post(`${prefixApi}/question`,{
            description: description
        })
            .then(response => {
                dispatch(createQuestion(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//добавление Answer
export const addOneAnswer = () => {
    return (dispatch) => {
        return axios.post(`${prefixApi}/question`)
            .then(response => {
                dispatch(addAnswer(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};
