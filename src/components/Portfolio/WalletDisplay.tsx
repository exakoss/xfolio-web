import React, {useState,useEffect} from 'react'
import {Wallet} from 'ethers'
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import LoadingScreen from '../LoadingScreen';
import {getCurrentBalance} from '../../utils/ethersTools';
import {commonStyles} from '../../theme';
import {Network} from '../../types';
import TouchableLink from '../common/TouchableLink';
import {useETHPrice} from '../../graphql/uniQueries';
import {toMoney} from '../../utils'


const WalletDisplay:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const dispatch = useDispatch()
    const [currentBalance,setCurrentBalance] = useState<number>(0)
    const [currentNetwork,setCurrentNetwork] = useState<Network>('MAINNET')
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
    },[wallet])

    if (isLoading) return <LoadingScreen placeholder='Loading wallet data...'/>
    return(
            <div style={{...commonStyles.innerContainer as React.CSSProperties, justifyContent: 'space-around'}} id='innerContainer'>
                <div>
                    <div style={{...commonStyles.mainText as React.CSSProperties,cursor:'pointer'}}
                         onClick={() => {
                            navigator.clipboard.writeText(wallet.address)
                            alert('Wallet address copied!')
                    }}>{wallet.address.slice(0,15) + '...'}</div>
                    <div style={commonStyles.mainText as React.CSSProperties}>{currentBalance} ETH</div>
                    {/*//Displaying current Balance in USD*/}
                    { !isFetching ? (
                        //@ts-ignore
                        <div style={commonStyles.secondaryText as React.CSSProperties}>{toMoney(currentBalance*ethPriceData,2)}</div>
                    ) : null
                    }
                </div>
                <div>
                    <TouchableLink style={commonStyles.largeButton as React.CSSProperties} text='BRIDGE ETH' link='/main/bridgeETH' disabled={false}/>
                </div>
            </div>
    )
}

export default WalletDisplay
