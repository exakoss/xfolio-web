import {WatchlistAction, WatchlistEntry, WatchlistState} from '../types';

const initialState:WatchlistState = {
    watchlistEntries: []
}

//Reducer
const watchlistReducer = (state:WatchlistState = initialState, action:WatchlistAction) => {
    switch (action.type) {
        case 'ADD_WATCHLIST_ENTRY':
            return {
                watchlistEntries: [...state.watchlistEntries,action.data]
            }
        case 'REMOVE_WATCHLIST_ENTRY':
            return {
                watchlistEntries: state.watchlistEntries.filter(e => e.id !== action.data.id)
            }
        default:
            return state
    }
}

//Actions
export const addWatchlistEntry = (entry:WatchlistEntry):WatchlistAction => {
    return {
        type: 'ADD_WATCHLIST_ENTRY',
        data: entry
    }
}

export const removeWatchlistEntry = (entry:WatchlistEntry):WatchlistAction => {
    return {
        type: 'REMOVE_WATCHLIST_ENTRY',
        data: entry
    }
}

export default watchlistReducer
