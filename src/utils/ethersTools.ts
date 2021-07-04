import {ethers, Wallet} from 'ethers'
import {
    KOVAN_API_KEY,
    MAINNET_API_KEY,
    ARBITRUM_API_KEY,
    RINKEBY_API_KEY,
    ARBITRUM_RINKEBY_API_KEY
} from '../constants';
import {Network} from '../types';

export const createRandomWallet = ():Wallet => {
    return ethers.Wallet.createRandom()
}

export const createProvider = (networkName:Network) => {
    switch (networkName) {
        case 'KOVAN':
            return new ethers.providers.JsonRpcProvider(KOVAN_API_KEY)
        case 'MAINNET':
            return new ethers.providers.JsonRpcProvider(MAINNET_API_KEY)
        case 'ARBITRUM':
            return new ethers.providers.JsonRpcProvider(ARBITRUM_API_KEY)
        case 'RINKEBY':
            return new ethers.providers.JsonRpcProvider(RINKEBY_API_KEY)
        case 'ARB_RINKEBY':
            return new ethers.providers.JsonRpcProvider(ARBITRUM_RINKEBY_API_KEY)
    }
}

export const createConnectedWallet = (networkName:Network):Wallet => {
    const newWallet = createRandomWallet()
    const newProvider = createProvider(networkName)
    return newWallet.connect(newProvider)
}

export const createWalletFromMnemonic = (mnemonic:string,network:Network):Wallet => {
    const newProvider = createProvider(network)
    return ethers.Wallet.fromMnemonic(mnemonic).connect(newProvider)
}

export const connectWalletToNetwork = (wallet:Wallet,network:Network):Wallet => {
    const newProvider = createProvider(network)
    return wallet.connect(newProvider)
}


export const getCurrentBalance = async (wallet:Wallet):Promise<number> => {
    const bigNumberishBalance = await wallet.getBalance()
    return Number(ethers.utils.formatEther(bigNumberishBalance))
}
