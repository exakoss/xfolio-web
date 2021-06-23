import React, {useState,useEffect} from 'react'
import {Wallet} from 'ethers';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {connectWalletToNetwork, getCurrentBalance} from '../utils/ethersTools';
import {setWallet} from '../reducers/walletReducer';
import {Network} from '../types';
import PopupMenu from './PopupMenu';
import theme from '../theme';

const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    width: '100%',
    height:'15%',
    borderBottom: '1px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colors.white,
    zIndex: '2',

    dropdownContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}

const Header:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const dispatch = useDispatch()
    const [currentNetwork,setCurrentNetwork] = useState<Network>('KOVAN')

    useEffect(() => {
        if (wallet === undefined) {
        const updateWalletNetwork = () => {
            const updatedWallet = connectWalletToNetwork(wallet,currentNetwork)
            dispatch(setWallet(updatedWallet))
        }
        updateWalletNetwork()
    }
    },[currentNetwork])
    
//    style={{transform:'translate(-38px, 40px)'}}  moving the dropdown menu 
    
        return (
            <div style={headerStyle as React.CSSProperties} id='headerContainer'> 
                <div>
                    <DropdownButton title={currentNetwork} style={headerStyle.dropdownContainer} drop='up'>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('KOVAN')}>Kovan</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('ARBITRUM_KOVAN')}>Arbitrum Kovan</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        )
    
}

export default Header