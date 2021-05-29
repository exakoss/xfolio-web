

//Parsing and calculating functions
export const parsePriceToFixedNumber = (stringPrice: string):number => {
    return Number(parseFloat(stringPrice).toFixed(2))
}

export const calculateETHPrice = (derivedETH:string,ethPriceInUSD:number):number => {
    return Number((parseFloat(derivedETH) * ethPriceInUSD).toFixed(4))
}

export const toMoney = (value:number,position:number):string => {
    return '$' + value.toFixed(position).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
