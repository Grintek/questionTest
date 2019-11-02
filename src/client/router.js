import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './components/App'
export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" name="home" component={App}/>
            </Switch>
        </BrowserRouter>
    );
}