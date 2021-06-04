import {SeedAction, SeedState} from '../types';

const initialState:SeedState = {
    seed: ''
}

//Reducer
const seedReducer= (state:SeedState = initialState, action:SeedAction) => {
    switch (action.type) {
        case 'SET_SEED':
            return {
                seed: action.data
            }
        default:
            return state
    }
}

//Actions
export const setSeed = (seed:string):SeedAction => {
    return {
        type: 'SET_SEED',
        data: seed
    }
}

export default seedReducer
