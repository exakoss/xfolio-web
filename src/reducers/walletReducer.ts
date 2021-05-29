import {WalletAction, WalletState} from '../types';
import {Wallet} from 'ethers'

const initialState:WalletState = {
    wallet: undefined
}

//Reducer
const walletReducer= (state:WalletState = initialState, action:WalletAction) => {
    switch (action.type) {
        case 'SET_WALLET':
            return {
                wallet: action.data
            }
        default:
            return state
    }
}

//Actions
export const setWallet = (wallet:Wallet):WalletAction => {
    return {
        type: 'SET_WALLET',
        data: wallet
    }
}

export default walletReducer
