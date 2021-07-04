import React, {useState,useEffect} from 'react'
import {Wallet} from 'ethers'
import {RootStateOrAny, useSelector} from 'react-redux';
import LoadingScreen from '../LoadingScreen';
import {getCurrentBalance} from '../../utils/ethersTools';
import theme, {commonStyles} from '../../theme';
import TouchableLink from '../common/TouchableLink';
import {useETHPrice} from '../../graphql/uniQueries';
import {toMoney} from '../../utils'

const styles = {
    mainText: {
        color:theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: 'center',
        fontFamily: theme.fontLink.fontFamilyText
    },
    secondaryText: {
        color:theme.colors.textSecondary,
        fontSize: theme.fontsize.big,
        textAlign: 'center',
        fontFamily: theme.fontLink.fontFamilyText
    }
}

const WalletDisplay:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const [currentBalance,setCurrentBalance] = useState<number>(0)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const {data:ethPriceData, isFetching} = useETHPrice()

    useEffect(() => {
        const updateCurrentBalance = async () => {
            const newBalance:number = await getCurrentBalance(wallet)
            setCurrentBalance(newBalance)
        }
        setIsLoading(true)
        updateCurrentBalance()
        setIsLoading(false)
    },[wallet,ethPriceData])

    if (isLoading) return <LoadingScreen placeholder='Loading wallet data...'/>
    return(
            <div style={{...commonStyles.innerContainer as React.CSSProperties, justifyContent: 'space-around'}} id='innerContainer'>
                <div>
                    <div style={{...commonStyles.mainText as React.CSSProperties,cursor:'pointer'}}
                         onClick={() => {
                            navigator.clipboard.writeText(wallet.address)
                            alert('Wallet address copied!')
                    }}>{wallet.address.slice(0,15) + '...'}</div>
                    <div style={styles.mainText as React.CSSProperties}>{(currentBalance === 0) ? currentBalance : currentBalance.toFixed(5)} ETH</div>
                    {/*//Displaying current Balance in USD*/}
                    { ethPriceData && (
                        <div style={styles.secondaryText as React.CSSProperties}>{toMoney(currentBalance*ethPriceData,2)}</div>
                    )}
                </div>
                <div>
                    <TouchableLink style={commonStyles.largeButton as React.CSSProperties} text='BRIDGE ETH' link='/main/bridgeETH' disabled={false}/>
                </div>
            </div>
    )
}

export default WalletDisplay
