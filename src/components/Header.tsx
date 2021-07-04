import React, {useState,useEffect} from 'react'
import {Wallet} from 'ethers';
import {RootStateOrAny, useSelector, useDispatch} from 'react-redux';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {connectWalletToNetwork} from '../utils/ethersTools';
import {setWallet} from '../reducers/walletReducer';
import {Network} from '../types';
import PopupMenu from './PopupMenu';
import {headerStyle} from '../theme';


const Header:React.FC = () => {
    const [currentNetwork,setCurrentNetwork] = useState<Network>('MAINNET')
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const dispatch = useDispatch()

    useEffect(() => {
        const updateWalletNetwork = () => {
            const updatedWallet = connectWalletToNetwork(wallet,currentNetwork)
            dispatch(setWallet(updatedWallet))
        }
        updateWalletNetwork()
    },[currentNetwork])

    return (
            <div style={headerStyle as React.CSSProperties} id='headerContainer'>
                <PopupMenu/>
                <div>
                    <DropdownButton title={currentNetwork} style={headerStyle.dropdownContainer} drop='down'>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('MAINNET')}>Mainnet</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('ARBITRUM')}>Arbitrum</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('KOVAN')}>Kovan</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('RINKEBY')}>Rinkeby</Dropdown.Item>
                        <Dropdown.Item as="button"  onClick={() => setCurrentNetwork('ARB_RINKEBY')}>ARB_Rinkeby</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        )

}

export default Header
