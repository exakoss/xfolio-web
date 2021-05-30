import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter as Router} from 'react-router-dom';
import { Provider as ReduxProvider} from 'react-redux'
import Main from './components/Main';
import store from './store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from 'dotenv'

ReactDOM.render(
    <ReduxProvider store={store}>
        <Router>
            <Main/>
        </Router>
    </ReduxProvider>,
  document.getElementById('root')
);
