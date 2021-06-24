import {generateUniTrade} from '../utils/simpleUniTools'
import {ChainId} from 'simple-uniswap-sdk'

describe('generateUniTrade',() => {
    it('outputs an UniswapTrade', async () => {
        const fromAddress = '0xc944e90c64b2c07662a292be6244bdf05cda44a7' //GRT
        const toAddress = '0x514910771af9ca656af840dff83e8264ecf986ca' //LINK
        const quantity = 200
        const chainId:number = ChainId['MAINNET']
        const walletAddress = "0xD1E8fd37E062B2337Dac47e823115d3810F9F55a"
        const newTrade = await generateUniTrade({
            fromAddress:fromAddress,
            toAddress:toAddress,
            quantity:quantity,
            chainId:chainId,
            walletAddress:walletAddress
        })
        console.log(newTrade)
    })
})
