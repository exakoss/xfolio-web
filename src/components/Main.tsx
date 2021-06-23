import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import theme from '../theme';
import AuthorizationSwitch from './navigation/AuthorizationSwitch'
import MainSwitch from './navigation/MainSwitch'

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
                <Route path='/authorization'>
                    <AuthorizationSwitch/>
                </Route>
                <Route path='/main'>
                    <MainSwitch/>
                </Route>
            </Switch>
            <Redirect exact from='/' to='/authorization'/>
        </div>
    )
}

export default Main
