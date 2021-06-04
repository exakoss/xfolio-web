import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import walletReducer from './reducers/walletReducer';
import {persistStore, persistReducer} from 'redux-persist'
import seedReducer from './reducers/seedReducer';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    wallet: walletReducer,
    seed: seedReducer
})

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['seed'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(persistedReducer,composeEnhancers())
// @ts-ignore
export const persistor = persistStore(store)

export default store
