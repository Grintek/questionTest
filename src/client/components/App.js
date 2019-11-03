import React from 'react';
import './App.scss';
import {Redirect, Router} from '@reach/router';
import Paper from '@material-ui/core/Paper';
import NotFound from '../NotFound';
import Navigation from '../container/Navigation';
import ListQuestion from './ManagerQusestion/ListQuestion';
import EditQuestion from './EditQuestion/EditQuestion';
import AddQuestion from './ManagerQusestion/AddQuestion';
import AddAnswer from './ManagerQusestion/AddAnswer';
import Home from './Home/Home'
function App(){

    const styl = {position: 'fixed', width: '100%', marginLeft: -8, marginTop: -8};
    let Play;
            Play =
                <Router>
                <Redirect from="/" to="/home"/>
                <Home path="/home"/>
                <ListQuestion path="/manager"/>
                <EditQuestion path="/manager/:id" />
                <AddQuestion path="/manager/question" />
                <AddAnswer path="/manager/:id/answer" />
                <NotFound default />
                </Router>;
    return (
                <section>
                    <Paper elevation={1} style={styl}>
                        <Navigation />
                    </Paper>
                    <section style={{paddingTop: 100}}>
                        <div>
                            {Play}
                        </div>
                    </section>
                </section>
        );
}

export default App;
