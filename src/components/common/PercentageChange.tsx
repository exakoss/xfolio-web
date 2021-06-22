import React from 'react'
import {commonStyles} from '../../theme';

const PercentageChange:React.FC<{currentValue:number,previousValue:number}> = ({currentValue,previousValue}) => {
    if (previousValue === 0) return <div style={commonStyles.tileText}>-</div>
    const pricePercDiff = 100 * ((currentValue - previousValue) / ((currentValue + previousValue) / 2))
    const displayedDiff = Math.abs(pricePercDiff).toFixed(2)
    if (pricePercDiff > 0) {
        return <div style={commonStyles.positivePercentage}>{displayedDiff}%</div>
    } else {
        return <div style={commonStyles.negativePercentage}>{displayedDiff}%</div>
    }
}

export default PercentageChange
