import React, {useState} from 'react'
import TouchableLink from '../common/TouchableLink'
import {TradeContext} from 'simple-uniswap-sdk'
import {generateUniTrade} from '../../utils/simpleUniTools'
import {commonStyles} from '../../theme'
import TokenDropdown from './TokenDropdown'

const TokenSwap:React.FC = () => {

    return(
        <div style={commonStyles.flexColumn as React.CSSProperties}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <TokenDropdown/>
                <input/>
            </div>
        </div>
    )
}

export default TokenSwap
