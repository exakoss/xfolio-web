import {GraphQLClient} from 'graphql-request';

export const uniClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',{ headers: {} })
