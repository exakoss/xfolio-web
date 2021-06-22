import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Registration from './Portfolio/Registration';
import Mnemonic from './Portfolio/Mnemonic';
import WalletDisplay from './Portfolio/WalletDisplay';
import MnemonicImport from './Portfolio/MnemonicImport';
import theme from '../theme';
import BridgeETH from './BridgeETH';
import Login from './Portfolio/Login';
import SetPassword from './Portfolio/SetPassword';
import Search from './Search';
import LoadingScreen from './LoadingScreen';
import Watchlist from './Watchlist';


const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    // justifyContent: 'center',
    height: '500px',
    width: '400px',
    backgroundColor: theme.colors.background,
}

const Main:React.FC = () => {
    return (
        <div style={mainStyle as React.CSSProperties} id='mainContainer'>
        

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
                <Route path='/watchlist'>
                    <Watchlist/>
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/setPassword'>
                    <SetPassword/>
                </Route>
                <Route path='/search'>
                    <Search/>
                </Route>
                <Route path='/loadingScreen'>
                    <LoadingScreen placeholder={"sample"}/>
                </Route>
                <Route exact path='/'>
                    <Registration/>
                </Route>
            </Switch>
        </div>
    )
}

export default Main
