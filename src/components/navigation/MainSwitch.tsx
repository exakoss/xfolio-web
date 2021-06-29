import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import BridgeETH from '../BridgeETH'
import WalletDisplay from '../Portfolio/WalletDisplay'
import Watchlist from '../Watchlist'
import Search from '../Search'
import Header from '../Header'


const MainSwitch:React.FC = () => {
    const {path} = useRouteMatch()
    console.log(path)

    return(
        <React.Fragment>
            <Header/>
            <Switch>
                <Route exact path={path}>
                    <WalletDisplay/>
                </Route>
                <Route path={`${path}/watchlist`}>
                    <Watchlist/>
                </Route>
                <Route path={`${path}/search`}>
                    <Search/>
                </Route>
                <Route path={`${path}/bridgeETH`}>
                    <BridgeETH/>
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default MainSwitch
