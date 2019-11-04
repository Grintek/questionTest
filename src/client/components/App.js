import React from 'react';
import './App.scss';
import {Redirect, Router} from '@reach/router';
import Paper from '@material-ui/core/Paper';
import NotFound from '../NotFound';
import Navigation from '../container/Navigation';
import ListQuestion from './ManagerQusestion/ListQuestion/ListQuestion';
import EditQuestion from './ManagerQusestion/EditQuestion/EditQuestion';
import AddQuestion from './ManagerQusestion/AddQuestion';
import AddAnswer from './ManagerQusestion/AddAnswer';
import Home from './Home/Home'
import PerformTest from "./PerformTest/PerformTest";
function App(){

    const styl = {marginLeft: -8, marginTop: -8};
    let Play;
            Play =
                <Router>
                <Redirect from="/" to="/home"/>
                <Home path="/home"/>
                <ListQuestion path="/manager"/>
                <EditQuestion path="/manager/:id" />
                <AddQuestion path="/manager/question" />
                <AddAnswer path="/manager/:id/answer" />
                <PerformTest path="/test"/>
                <NotFound default />
                </Router>;
    return (
                <section>
                    <Paper elevation={1} style={styl}>
                        <Navigation />
                    </Paper>
                    <section>
                        <div>
                            {Play}
                        </div>
                    </section>
                </section>
        );
}

export default App;
