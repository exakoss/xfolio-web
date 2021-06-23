import React from 'react'
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom'
import BridgeETH from '../BridgeETH'
import WalletDisplay from '../Portfolio/WalletDisplay'
import Watchlist from '../Watchlist'
import Search from '../Search'

const MainSwitch:React.FC = () => {
    const {path} = useRouteMatch()
    console.log(path)
    return(
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
    )
}

export default MainSwitch
