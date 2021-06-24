import {TradeContext, UniswapPair, ChainId} from 'simple-uniswap-sdk'

interface TradeProps {
    fromAddress:string,
    toAddress:string,
    walletAddress:string,
    chainId:number,
    quantity:number
}

export const generateUniTrade = async (props:TradeProps):Promise<TradeContext> => {
    const uniswapPair = new UniswapPair({
        fromTokenContractAddress:props.fromAddress,
        toTokenContractAddress:props.toAddress,
        ethereumAddress:props.walletAddress,
        chainId: props.chainId
    })
    const uniswapPairFactory = await uniswapPair.createFactory()
    return await uniswapPairFactory.trade(String(props.quantity))
}
