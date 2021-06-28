import React, {useState} from 'react'
import TouchableLink from '../common/TouchableLink'
import {TradeContext} from 'simple-uniswap-sdk'
import {generateUniTrade} from '../../utils/simpleUniTools'
import theme, {commonStyles} from '../../theme'
import TokenDropdown from './TokenDropdown'
import PopupMenu from '../PopupMenu'
import {Button} from 'react-bootstrap'

const TokenSwap:React.FC = () => {

    return(
        <div style={{...commonStyles.flexColumn as React.CSSProperties, height:'100%'}}>
            <PopupMenu/>
            <div style={commonStyles.flexColumn as React.CSSProperties}>
                <TokenDropdown/>
                <input/>
            </div>
            <div style={commonStyles.flexColumn as React.CSSProperties}>
                <TokenDropdown/>
                <input/>
            </div>
            <div style={commonStyles.flexColumn as React.CSSProperties}>
                <Button style={{marginBottom: theme.distance.small}} variant={'success'}>Approve</Button>
                <Button disabled={true} variant={'success'}>Swap</Button>
            </div>
        </div>
    )
}

export default TokenSwap
