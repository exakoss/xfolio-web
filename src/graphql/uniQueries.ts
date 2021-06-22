import {useQuery} from 'react-query';
import {gql} from 'graphql-request';
import {uniClient} from './clients';
import {parsePriceToFixedNumber, transformUNIQuotesToTokenListEntry} from '../utils';
import {Id, BasicToken, GetBlockProp} from '../types'
import {getBlockNumber} from './blockQueries';

//Fetching functions
const getETHPrice = async (blockNumber?: number):Promise<number> => {
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
}

//Queries
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

export const useUniTokensByNameForTokenlist = (contains:string,period:GetBlockProp) => {
    return useQuery(['uniTokensByNameForTokenlist',contains,period], async () => {
        const blockNumber = await getBlockNumber(period)
        const currentEthPrice = await getETHPrice()
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
        const idTokenPricesQuery = gql`
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
        const {tokens:tokensPast, bundles} = await uniClient.request(idTokenPricesQuery, {tokenIds:tokenIds})
        console.log(tokensPast)
        return transformUNIQuotesToTokenListEntry(nameTokens,tokensPast,bundles,currentEthPrice)
    },{
        initialData: []
    })
}

export const useUniTokensByIDsForTokenList = (tokenIds:Id[],period:GetBlockProp) => {
    return useQuery(['uniTokensByIDsForTokenList',tokenIds,period], async () => {
        const blockNumber = await getBlockNumber(period)
        const currentEthPrice = await getETHPrice()
        if (tokenIds.length === 0) return []
        const idTokensQuery = gql`
            query uniTokensById($tokenIds: [String!]) {
                tokens(
                    where: {id_in: $tokenIds},
                    orderBy: txCount,
                    orderDirection: desc)
                {
                    symbol,
                    name,
                    id,
                    derivedETH
                }
            }
        `
        const {tokens: idTokens} = await uniClient.request(idTokensQuery,{tokenIds:tokenIds})
        const idTokenPricesQuery = gql`
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
        const {tokens:tokensPast, bundles} = await uniClient.request(idTokenPricesQuery, {tokenIds:tokenIds})
        return transformUNIQuotesToTokenListEntry(idTokens,tokensPast,bundles,currentEthPrice)
    },{
        initialData: []
    })
}
