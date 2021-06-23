import React, {useState,useEffect} from 'react'
import {Wallet} from 'ethers'
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import LoadingScreen from '../LoadingScreen';
import {connectWalletToNetwork, getCurrentBalance} from '../../utils/ethersTools';
import theme from '../../theme';
import {Network} from '../../types';
import {setWallet} from '../../reducers/walletReducer';
import TouchableLink from '../common/TouchableLink';
import PopupMenu from '../PopupMenu';
import {useETHPrice} from '../../graphql/uniQueries';
import {toMoney} from '../../utils'

const styles = {
    container: {
      display: 'flex',
      position: 'absolute',
      height: '100%',
      flexDirection:'column',
      justifyContent:'space-around',
    },
    dropdownContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    mainText: {
        color:theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: 'center'
    },
    secondaryText: {
        color:theme.colors.textSecondary,
        fontSize: theme.fontsize.big,
        textAlign: 'center'
    }
}

const WalletDisplay:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const dispatch = useDispatch()
    const [currentBalance,setCurrentBalance] = useState<number>(0)
    const [currentNetwork,setCurrentNetwork] = useState<Network>('KOVAN')
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const {data:ethPriceData, isFetching} = useETHPrice()

    useEffect(() => {
        const updateWalletNetwork = () => {
            const updatedWallet = connectWalletToNetwork(wallet,currentNetwork)
            dispatch(setWallet(updatedWallet))
        }
        updateWalletNetwork()
    },[currentNetwork])

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
            <div style={styles.container as React.CSSProperties} id='innerContainer'>
                <PopupMenu/>
                <div>
                    <DropdownButton title={currentNetwork} style={styles.dropdownContainer} drop='up'>
                        <Dropdown.Item as="button" onClick={() => setCurrentNetwork('KOVAN')}>Kovan</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setCurrentNetwork('ARBITRUM_KOVAN')}>Arbitrum Kovan</Dropdown.Item>
                    </DropdownButton>
                    <div style={{...styles.mainText as React.CSSProperties,cursor:'pointer'}}
                         onClick={() => {
                            navigator.clipboard.writeText(wallet.address)
                            alert('Wallet address copied!')
                    }}>{wallet.address.slice(0,15) + '...'}</div>
                    <div style={styles.mainText as React.CSSProperties}>{currentBalance} ETH</div>
                    {/*//Displaying current Balance in USD*/}
                    { !isFetching ? (
                        //@ts-ignore
                        <div style={styles.secondaryText as React.CSSProperties}>{toMoney(currentBalance*ethPriceData,2)}</div>
                    ) : null
                    }
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <TouchableLink text='Bridge ETH' link='/main/bridgeETH' disabled={(currentNetwork !== 'KOVAN')}/>
                </div>
            </div>
    )
}

export default WalletDisplay
