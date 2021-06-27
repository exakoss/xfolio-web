import React from 'react'
import {CurrencyLogo} from '../TokenList'
import {TokenListEntry} from '../../types'
import theme, {commonStyles} from '../../theme'
import LoadingScreen from '../LoadingScreen'
import {Dropdown} from 'react-bootstrap'

interface SimpleTokenListTileProps extends React.ComponentPropsWithoutRef<'div'> {
    token: TokenListEntry
}

interface SimpleTokenListProps extends React.ComponentPropsWithoutRef<'div'> {
    tokens: TokenListEntry[],
    placeholder: string,
    isLoading: boolean
}

//SimpleTokenList and its children are shortened TokenList components that are being used for Dropdown in TokenSwap
export const SimpleTokenListTile = React.forwardRef<HTMLDivElement, SimpleTokenListTileProps>(({token},ref) => {
    return(
        <div ref={ref} style={{...commonStyles.tile as React.CSSProperties,width:"200px", justifyContent: 'space-between'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <CurrencyLogo token={token}/>
                <div style={commonStyles.tileText}>{token.name}</div>
            </div>
            <div style={commonStyles.nameText}>{token.description}</div>
        </div>
    )
})

const SimpleTokenList = React.forwardRef<HTMLDivElement, SimpleTokenListProps>((props,ref) => {
    //If data is loading we return the loading screen
    if (props.isLoading) return <LoadingScreen placeholder='Loading data...'/>
    //If the array of tokens empty, e.g. the searchbar is clean, we display a placeholder
    if (props.tokens.length === 0) return <div style={commonStyles.flexColumn as React.CSSProperties}>
        <div style={{color:theme.colors.textWhite, textAlign: 'center', fontSize: theme.fontsize.normal}} ref={ref}>
            {props.placeholder}
        </div>
    </div>
    return(
        <div style={{overflowY:"auto", overflowX:'hidden', width:"220px", height:'250px'}} ref={ref}>
            {props.tokens.map(token => {
                const tokenKey = token.description.concat(String(Math.random()))
                // Since keys have to be unique, we concat a random float to the token.description to ensure the uniqueness
                // If a cheaper method is available, change it
                return (
                <>
                    <style type="text/css">
                        {`
                .dropdown-item {
                  padding: 0;
                }
                `}
                    </style>
                    <Dropdown.Item eventKey={tokenKey} onClick={() => console.log(token.name)}>
                    <SimpleTokenListTile token={token} key={tokenKey}/>
                    </Dropdown.Item>
                </>
                )
            })}
        </div>
    )
})

export default SimpleTokenList
