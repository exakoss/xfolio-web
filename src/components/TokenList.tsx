import React from 'react'
import {TokenListEntry} from '../types';
import LoadingScreen from './LoadingScreen';
import theme, {commonStyles} from '../theme';
import {toMoney, isTokenListEntryIncluded, transformTokenListEntryToWatchlistEntry, getTokenLogoURL} from '../utils';
import PercentageChange from './common/PercentageChange';
import {useDispatch, useSelector,RootStateOrAny} from 'react-redux';
import {removeWatchlistEntry,addWatchlistEntry} from '../reducers/watchlistReducer';
import {Image} from 'react-bootstrap'

interface Props {
    tokens: TokenListEntry[],
    placeholder: string,
    isLoading: boolean
}

const AddDeleteButton:React.FC<{token: TokenListEntry,isIncluded:boolean}> = ({token,isIncluded}) => {
    const dispatch = useDispatch()
    if (isIncluded) {
        return (
            <button style={{backgroundColor: 'red'}} onClick={() => dispatch(removeWatchlistEntry(transformTokenListEntryToWatchlistEntry(token)))}>X</button>
        )
    } else {
        return (
            <button style={{backgroundColor: 'green'}} onClick={() => dispatch(addWatchlistEntry(transformTokenListEntryToWatchlistEntry(token)))}>+</button>
        )
    }
}

export const CurrencyLogo:React.FC<{token: TokenListEntry}> = ({token}) => {
    const src = getTokenLogoURL(token.address as string)
    return <Image src={src} alt='token logo' style={{height:"24px",width:"24px"}}/>
}

const TokenListTile:React.FC<{token: TokenListEntry}> = ({token}) => {
    const watchlistEntries = useSelector((state:RootStateOrAny) => state.watchlist.watchlistEntries)
    const isIncluded:boolean = isTokenListEntryIncluded(token,watchlistEntries)
    return (
        <div style={commonStyles.tile as React.CSSProperties}>
            <CurrencyLogo token={token}/>
            <div style={commonStyles.nameContainer as React.CSSProperties}>
                <div style={commonStyles.tileText}>{token.name}</div>
                <div style={commonStyles.nameText}>{token.description}</div>
            </div>
            <div style={commonStyles.tileText}> {toMoney(token.formattedRate,3)}</div>
            {(token.quantity) ? <div style={commonStyles.tileText}>{token.quantity.toFixed(3)}</div> : null}
            <PercentageChange currentValue={token.formattedRate} previousValue={token.formattedRateDaily}/>
            <AddDeleteButton token={token} isIncluded={isIncluded}/>
        </div>
    )
}

const TokenList:React.FC<Props> = ({tokens,placeholder,isLoading}) => {
    //If data is loading we return the loading screen
    if (isLoading) return <LoadingScreen placeholder='Loading data...'/>
    //If the array of tokens empty, e.g. the searchbar is clean, we display a placeholder
    if (tokens.length === 0) return <div style={commonStyles.flexColumn as React.CSSProperties}>
        <div style={{color:theme.colors.textWhite, textAlign: 'center', fontSize: theme.fontsize.large}}>
            {placeholder}
        </div>
    </div>
    return(
        <div style={{overflowY:"auto", width:"380px"}}>
            {tokens.map(token => {
                // Since keys have to be unique, we concat a random float to the token.description to ensure the uniqueness
                // If a cheaper method is available, change it
                return <TokenListTile token={token} key={token.description.concat(String(Math.random()))}/>
            })}
        </div>
    )
}

export default TokenList
