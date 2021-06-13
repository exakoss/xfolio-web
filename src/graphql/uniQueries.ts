import {useQuery} from 'react-query';
import {gql} from 'graphql-request';
import {uniClient} from './clients';
import {parsePriceToFixedNumber} from '../utils';

export const useETHPrice = (blockNumber?: number) => {
    return useQuery('ethPrice', async () => {
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
        console.log(query)
        const {bundles} = await uniClient.request(query)
        return parsePriceToFixedNumber(bundles[0].ethPrice)
    })
}
