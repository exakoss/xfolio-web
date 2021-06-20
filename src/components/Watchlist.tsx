import React from 'react'
import TokenList from './TokenList';
import {useSelector,RootStateOrAny} from 'react-redux';
import {Id, TokenListEntry, WatchlistEntry} from '../types';
import {useUniTokensByIDsForTokenList} from '../graphql/uniQueries';
import PopupMenu from './PopupMenu';

const Watchlist:React.FC = () => {

    const watchlistEntries:WatchlistEntry[] = useSelector((state:RootStateOrAny) => state.watchlist.watchlistEntries)
    const tokenIds: Id[] = watchlistEntries.map(e => e.id)
    const {data: tokensByIDsData, status:tokensByIDsStatus} = useUniTokensByIDsForTokenList(tokenIds,'ONE_DAY')

    return (
        <div>
            <PopupMenu/>
            <TokenList tokens={tokensByIDsData as TokenListEntry[]} placeholder={'Token list is empty'} isLoading={(['idle','loading'].includes(tokensByIDsStatus))}/>
        </div>
    )
}

export default Watchlist
