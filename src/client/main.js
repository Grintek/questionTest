import React from 'react';
import App from './components/App.js';
import { Provider } from 'react-redux';
import configStore from './api/configStore';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './theme'

const store = configStore();
function Main() {

       return( <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </Provider>
       );

}
export default Main;
//module.hot.accept();
