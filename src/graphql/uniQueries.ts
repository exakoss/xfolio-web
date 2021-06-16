import {useQuery} from 'react-query';
import {gql} from 'graphql-request';
import {uniClient} from './clients';
import {parsePriceToFixedNumber, transformUNIQuotesToTokenListEntry} from '../utils';
import {Id, BasicToken} from '../types'

export const useETHPrice = (blockNumber?: number) => {
    return useQuery(['ethPrice',blockNumber], async () => {
        const query = blockNumber
            ? gql`
                query bundles {
                  bundles(where: { id: 1 } block: {number: ${blockNumber}}) {
                    ethPrice
                  }
                }
              `
            : gql`
                    query bundles {
                      bundles(where: { id: 1 }) {
                        ethPrice
                      }
                    }
                `
        const {bundles} = await uniClient.request(query)
        return parsePriceToFixedNumber(bundles[0].ethPrice)
    })
}

export const useUniTokensByName = (contains:string) => {
    return useQuery(['uniTokensByName',contains], async () => {
        const query = gql`
            query findTokens {
                tokens(where: {symbol_contains: ${contains}, derivedETH_gt: 0.0000001, totalLiquidity_gt: 5}, first:50, orderBy: txCount, orderDirection: desc) {
                    symbol,
                    name,
                    id,
                    derivedETH
                }
            }
        `
        const {tokens} = await uniClient.request(query)
        return tokens
    })
}

export const useUniTokensBlockPricesById = (tokens:string[],blockNumber:number) => {
    return useQuery(['uniTokensBlockPricesById',tokens,blockNumber],async () => {
       const query = gql`
            query uniTokensBlockPricesById {
                tokens(
                    where: {id_in: $tokenIds},
                    block: {number: $blockNumber},
                    orderBy: txCount,
                    orderDirection: desc
                ) {
                    id,
                    derivedETH
                }
                bundles(
                    where: {id: "1"}
                    block: {number: $blockNumber}
                ) {
                    ethPrice
                }
            }
       `
      const {tokens, bundles} = await uniClient.request(query)
      return {tokens, bundles}
    })
}

export const useUniTokensByNameForTokenlist = (contains:string,blockNumber:number,currentEthPrice:number,enabled:boolean) => {
    return useQuery(['uniTokensByNameForTokenlist',contains,blockNumber], async () => {
        if (contains === '') return []
        const nameTokensQuery = gql`
            query findTokens {
                tokens(where: {symbol_contains: "${contains}", derivedETH_gt: 0.0000001, totalLiquidity_gt: 5}, first:50, orderBy: txCount, orderDirection: desc) {
                    symbol,
                    name,
                    id,
                    derivedETH
                }
            }
        `
        const {tokens: nameTokens} : {tokens: BasicToken[]} = await uniClient.request(nameTokensQuery)
        const tokenIds: Id[] = nameTokens.map(token => token.id)
        const idTokensQuery = gql`
            query uniTokensBlockPricesById($tokenIds: [String!]) {
                tokens(
                    where: {id_in: $tokenIds},
                    block: {number: ${blockNumber}},
                    orderBy: txCount,
                    orderDirection: desc
                ) {
                    id,
                    derivedETH
                }
                bundles(
                    where: {id: "1"}
                    block: {number: ${blockNumber}}
                ) {
                    ethPrice
                }
            }
        `
        const {tokens:tokensPast, bundles} = await uniClient.request(idTokensQuery, {tokenIds:tokenIds})
        console.log(tokensPast)
        return transformUNIQuotesToTokenListEntry(nameTokens,tokensPast,bundles,currentEthPrice)
    },{
        enabled: enabled,
        initialData: []
    })
}
