import {blockClient} from './clients';
import {gql} from 'graphql-request';
import {useQuery} from 'react-query';
import {TIMESTAMP_INTERVAL} from '../constants';
import {GetBlockProp} from '../types';
import {getTimestamp} from '../utils';

export const getBlockNumber = async (period:GetBlockProp):Promise<number> => {
    const timestamp = getTimestamp(period)
    const timestampTo = timestamp + TIMESTAMP_INTERVAL
      const query = gql`
          query blocks {
              blocks(
                  first: 1
                  orderBy: timestamp
                  where: { timestamp_gt: ${timestamp}, timestamp_lt: ${timestampTo} }
              ) {
                  id
                  number
                  timestamp
              }
          }
      `
    const {blocks} = await blockClient.request(query)
    return Number(blocks[0].number)
}
export const useBlockNumber = (period:GetBlockProp) => {
    const timestamp = getTimestamp(period)
    return useQuery(['block',timestamp], async () => {
        const timestampTo = timestamp + TIMESTAMP_INTERVAL
        const query = gql`
            query blocks {
                blocks(
                    first: 1
                    orderBy: timestamp
                    where: { timestamp_gt: ${timestamp}, timestamp_lt: ${timestampTo} }
                ) {
                    id
                    number
                    timestamp
                }
            }
        `
        const {blocks} = await blockClient.request(query)
        return Number(blocks[0].number)
    })
}
