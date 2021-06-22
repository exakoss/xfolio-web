import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import Registration from '../Portfolio/Registration'
import Login from '../Portfolio/Login'
import SetPassword from '../Portfolio/SetPassword'
import MnemonicImport from '../Portfolio/MnemonicImport'
import Mnemonic from '../Portfolio/Mnemonic'

const AuthorizationSwitch:React.FC = () => {
    const {path} = useRouteMatch()
    console.log(path)
    return(
        <Switch>
            <Route exact path={path}>
                <Registration/>
            </Route>
            <Route path={`${path}/login`}>
                <Login/>
            </Route>
            <Route path={`${path}/setPassword`}>
                <SetPassword/>
            </Route>
            <Route path={`${path}/mnemonic`}>
                <Mnemonic/>
            </Route>
            <Route path={`${path}/mnemonicImport`}>
                <MnemonicImport/>
            </Route>
        </Switch>
    )
}

export default AuthorizationSwitch
