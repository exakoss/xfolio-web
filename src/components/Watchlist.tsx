import React from 'react'
import TokenList from './TokenList';
import {useSelector,RootStateOrAny} from 'react-redux';
import {Id, TokenListEntry, WatchlistEntry} from '../types';
import {useUniTokensByIDsForTokenList} from '../graphql/uniQueries';
import PopupMenu from './PopupMenu';

const Watchlist:React.FC = () => {

    const watchlistEntries:WatchlistEntry[] = useSelector((state:RootStateOrAny) => state.watchlist.watchlistEntries)
    const tokenIds: Id[] = watchlistEntries.map(e => e.id)
    const {data: tokensByIDsData, isFetching} = useUniTokensByIDsForTokenList(tokenIds,'ONE_DAY')

    return (
        <div>
            <PopupMenu/>
            <TokenList tokens={tokensByIDsData as TokenListEntry[]} placeholder={'Token list is empty'} isLoading={isFetching}/>
        </div>
    )
}

export default Watchlist
