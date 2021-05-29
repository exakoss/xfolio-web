require('dotenv').config()

export const KOVAN_API_KEY:string = process.env['ALCHEMY_KOVAN_KEY'] as string
export const MAINNET_API_KEY:string = process.env['ALCHEMY_MAINNET_KEY'] as string
export const ARBITRUM_KOVAN_API_KEY:string = process.env['ARBITRUM_KOVAN_KEY'] as string
