import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import walletReducer from './reducers/walletReducer';

const reducer = combineReducers({
    wallet: walletReducer,
})

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(reducer,composeEnhancers())

export default store
