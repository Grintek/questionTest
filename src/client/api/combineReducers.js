import React from 'react';
import {combineReducers} from 'redux';
import booksState from './redusers/booksReducer';
import question from './redusers/questionReducer';

export default combineReducers({
    booksState,
    question
})