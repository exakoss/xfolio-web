import {ChainId, TradeContext, UniswapPair, WETH} from 'simple-uniswap-sdk'

interface TradeProps {
    fromAddress:string,
    toAddress:string,
    walletAddress:string,
    chainId:number,
    quantity:number
}

export const generateUniTrade = async (props:TradeProps):Promise<TradeContext> => {
        // const fromAddress = (props.fromAddress === 'WETH') ? WETH.MAINNET().contractAddress : props.fromAddress
        // const toAddress = (props.toAddress === 'WETH') ? WETH.MAINNET().contractAddress : props.toAddress
        const uniswapPair = new UniswapPair({
            fromTokenContractAddress:props.fromAddress,
            toTokenContractAddress:props.toAddress,
            ethereumAddress:props.walletAddress,
            chainId: props.chainId
        })
        const uniswapPairFactory = await uniswapPair.createFactory()
        return await uniswapPairFactory.trade(String(props.quantity))
}
