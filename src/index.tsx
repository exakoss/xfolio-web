import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter as Router} from 'react-router-dom';
import { Provider as ReduxProvider} from 'react-redux'
import Main from './components/Main';
import store, {persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from "react-query"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from 'dotenv'

const queryClient = new QueryClient()

ReactDOM.render(
    <ReduxProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Main/>
                </Router>   
            </QueryClientProvider>
        </PersistGate>
    </ReduxProvider>,
  document.getElementById('root')
);
