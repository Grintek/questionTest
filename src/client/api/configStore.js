import {applyMiddleware, createStore} from 'redux';
import combineReducers from './combineReducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'


export default function configStore () {
    return createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));
}