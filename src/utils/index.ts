import {TokenListEntry, BasicToken, TokenEntry, Bundle, WatchlistEntry} from '../types';
import {GetBlockProp} from '../types'
import dayjs from 'dayjs';

export const getTimestamp = (period:GetBlockProp):number => {
    const utcCurrentTime = dayjs()
    let day: number = 0;
    if (period === 'ONE_DAY') {
        day = utcCurrentTime
            .subtract(1,'day')
            .startOf('minute')
            .unix()
    } else if (period === 'TWO_DAYS') {
        day = utcCurrentTime
            .subtract(2,'day')
            .startOf('minute')
            .unix()
    } else if (period === 'CURRENT_DAY') {
        day = utcCurrentTime
            .subtract(30,'seconds')
            .startOf('minute')
            .unix()
    }
    return day
}

export const transformUNIQuotesToTokenListEntry = (tokensNow:BasicToken[],tokensPast:TokenEntry[],bundles:Bundle[],currentETHPrice:number):TokenListEntry[] => {
    const dailyETHPriceInUSD:number = parsePriceToFixedNumber(bundles[0].ethPrice)
    return tokensNow.map(t1 => {
        const t2 = tokensPast.find(t => t.id === t1.id)
        return {
            dataSource: 'UNI',
            formattedRate: calculateETHPrice(t1.derivedETH, currentETHPrice),
            name: t1.symbol,
            asset: t1.symbol,
            description: t1.name,
            category: 'crypto',
            sign: '',
            address: t1.id,
            // @ts-ignore
            formattedRateDaily: calculateETHPrice(t2.derivedETH,dailyETHPriceInUSD),
        }
    })
}

export const isTokenListEntryIncluded = (entry:TokenListEntry, watchlistEntries:WatchlistEntry[]):boolean => {
    // const watchlistEntries = store.getState().watchlist.watchlistEntries
    switch (entry.dataSource) {
        case 'SYNTH':
            return watchlistEntries.some((e) => e.id === entry.name)
        case 'UNI':
            return watchlistEntries.some((e) => e.id === entry.address)
        default:
            return false
    }
}

export const transformTokenListEntryToWatchlistEntry = (tokenListEntry:TokenListEntry):WatchlistEntry => {
    switch (tokenListEntry.dataSource) {
        case 'UNI':
            return {
                dataSource: 'UNI',
                id: tokenListEntry.address as string
            }
        case 'SYNTH':
            return {
                dataSource: 'SYNTH',
                id: tokenListEntry.name
            }
    }
}

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
