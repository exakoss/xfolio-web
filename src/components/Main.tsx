import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Registration from './Portfolio/Registration';
import Mnemonic from './Portfolio/Mnemonic';
import WalletDisplay from './Portfolio/WalletDisplay';
import MnemonicImport from './Portfolio/MnemonicImport';
import theme from '../theme';
import BridgeETH from './BridgeETH';

const mainStyle = {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
    width: '400px',
    backgroundColor: theme.colors.background,
}

const Main:React.FC = () => {
    return (
        <div style={mainStyle as React.CSSProperties}>
            <Switch>
                <Route path='/mnemonic'>
                    <Mnemonic/>
                </Route>
                <Route path='/bridgeETH'>
                    <BridgeETH/>
                </Route>
                <Route path='/walletDisplay'>
                    <WalletDisplay/>
                </Route>
                <Route path='/mnemonicImport'>
                    <MnemonicImport/>
                </Route>
                <Route path='/login'>

                </Route>
                <Route path='/passwordInput'>

                </Route>
                <Route exact path='/'>
                    <Registration/>
                </Route>
            </Switch>
        </div>
    )
}

export default Main
