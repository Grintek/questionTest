import axios from 'axios';
import React from 'react';
import { prefixApi } from '../../etc/configTest.json';
import {addAnswer, createQuestion, deleteQuestions, fetchQuestion, fetchQuestions, updateQuestion, testQuestions} from "../actions/QuestionActions";
/**
 * Получить книги
 */

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

export const testAllQuestions = () => {
    return (dispatch) => {
        return axios.get(`${prefixApi}/test`)
            .then(response => {
                dispatch(testQuestions(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//получить вопрос по id
export const fetchOneQuestion = (id) => {
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
                dispatch(fetchQuestions(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//обновление Question
export const updateOneQuestion = (id, description, answer) => {
    return (dispatch) => {
        return axios.put(`${prefixApi}/questions/${id}`,{
            description: description,
            answers: answer
        })
            .then(response => {
                dispatch(fetchQuestion(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};

//создание Question
export const createOneQuestion = (description) => {
    return (dispatch) => {
        return axios.post(`${prefixApi}/questions`,{description: description},
            {headers: {"Content-Type": "application/json"}})
            .then(response => {
                console.log(response.status);
                dispatch(fetchQuestions(response.data))
            })
            .catch(error => {
                console.log(error);
                throw(error);
            })
    }
};

//добавление Answer
export const addOneAnswer = (name, correct , id) => {
    return (dispatch) => {
        return axios.post(`${prefixApi}/questions/${id}/answer`, { name: name, correct: correct })
            .then(response => {
                dispatch(fetchQuestion(response.data))
            })
            .catch(error => {
                throw(error);
            })
    }
};
