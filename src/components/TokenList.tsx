import React from 'react'
import {TokenListEntry} from '../types';
import LoadingScreen from './LoadingScreen';
import theme, {commonStyles} from '../theme';
import {toMoney} from '../utils';
import PercentageChange from './common/PercentageChange';

interface Props {
    tokens: TokenListEntry[],
    placeholder: string,
    isLoading: boolean
}



const TokenListTile:React.FC<{token: TokenListEntry}> = ({token}) => {

    return (
        <div style={commonStyles.tile as React.CSSProperties}>
            <div style={commonStyles.nameContainer as React.CSSProperties}>
                <div style={commonStyles.tileText}>{token.name}</div>
                <div style={commonStyles.nameText}>{token.description}</div>
            </div>
            <div style={commonStyles.tileText}> {toMoney(token.formattedRate,3)}</div>
            {(token.quantity) ? <div style={commonStyles.tileText}>{token.quantity.toFixed(3)}</div> : null}
            <PercentageChange currentValue={token.formattedRate} previousValue={token.formattedRateDaily}/>
        </div>
    )
}

const TokenList:React.FC<Props> = ({tokens,placeholder,isLoading}) => {
    //If data is loading we return the loading screen
    if (isLoading) return <LoadingScreen placeholder='Loading token data...'/>
    //If the array of tokens empty, e.g. the searchbar is clean, we display a placeholder
    if (tokens.length === 0) return <div style={commonStyles.flexColumn as React.CSSProperties}>
        <div style={{color:theme.colors.textWhite, textAlign: 'center', fontSize: theme.fontsize.large}}>
            {placeholder}
        </div>
    </div>
    return(
        <div style={{overflowY:"auto"}}>
            {tokens.map(token => {
                // Since keys have to be unique, we concat a random float to the token.description to ensure the uniqueness
                // If a cheaper method is available, change it
                return <TokenListTile token={token} key={token.description.concat(String(Math.random()))}/>
            })}
        </div>
    )
}

export default TokenList
