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
import Header from '../Header';
import { useETHPrice } from '../../graphql/uniQueries';


const styles = {
    container: {
      display: 'flex',
      position: 'absolute',
      height: '100%',
      flexDirection:'column',
      justifyContent:'space-around',
    },
    headerContainer:{
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignContent: 'center',
        height: '15%'
    },
    walletContainer:{
        display:'flex',
        flexDirection:'column',
        height: '85%',
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
    }
}

const WalletDisplay:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const dispatch = useDispatch()
    const [currentBalance,setCurrentBalance] = useState<number>(0)
    const [currentNetwork,setCurrentNetwork] = useState<Network>('KOVAN')
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const {data, status, error} = useETHPrice()

    // useEffect(() => {
    //     const updateWalletNetwork = () => {
    //         const updatedWallet = connectWalletToNetwork(wallet,currentNetwork)
    //         dispatch(setWallet(updatedWallet))
    //     }
    //     updateWalletNetwork()
    // },[currentNetwork])

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
       // <div style={styles.container as React.CSSProperties} id='innerContainer'></div>
            <React.Fragment>
                <div style={styles.headerContainer as React.CSSProperties} id='innerHeader'> 
                    <PopupMenu/>
                    <Header/>
                 </div>
                <div style={styles.walletContainer as React.CSSProperties} id='walletContent'>
                    <div>
                        <div style={{...styles.mainText as React.CSSProperties,cursor:'pointer', marginTop: '10px'}}
                            onClick={() => {
                                navigator.clipboard.writeText(wallet.address)
                                alert('Wallet address copied!')
                        }}>{wallet.address.slice(0,6) + '..'}</div>
                        <div style={styles.mainText as React.CSSProperties}>{currentBalance} ETH</div>
                    </div>
                    <div style={{display:'flex',justifyContent:'center', fontFamily:theme.fontLink.fontFamilyLabel}}>
                        <TouchableLink style={{width:'170px', boxShadow: '0 0 50px rgba(255, 255, 255, 0.5)'}} 
                        text='Bridge ETH' link='/bridgeETH' disabled={(currentNetwork !== 'KOVAN')}/>
                    </div>
                </div>
            </React.Fragment>
    )
}

export default WalletDisplay
