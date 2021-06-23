import {useETHPrice} from '../graphql/uniQueries';
import assert from 'assert'
import {uniClient} from '../graphql/clients';
import {gql} from 'graphql-request';
import {parsePriceToFixedNumber} from '../utils';

describe('useETHPrice', () => {
    it('fetches data from Uniswap Subgraph',async () => {
        const query = gql`
            query bundles {
                bundles(where: { id: 1 }) {
                    ethPrice
                }
            }
        `
        const {bundles} = await uniClient.request(query)
        const ethPrice:number = parsePriceToFixedNumber(bundles[0].ethPrice)
        assert.equal(ethPrice,2400,'Current eth Price is 2400')
    })
})


