import React from 'react'
import Popup from 'reactjs-popup';
import theme from '../theme';
import {NavLink} from 'react-router-dom';

const styles = {
    contentStyle: {
        background: "rgba(51,51,51,1)",
        width: "100%",
        height: "100%",
        display: 'flex',
        alignItems: 'center'
    },
    menu: {
        width: "100%",
        display: "flex",
        textAlign: "center",
        justifyContent: "center"
    },
    menuList: {
        position: "relative",
        fontSize: theme.fontsize.normal,
        padding: "0px",
    },
    menuListPoint: {
        listStyle: "outside none none",
        margin: "10px 0px",
    },
    burgerMenu: {
        display: "inlineBlock",
        cursor: "pointer",
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 9999,
        background: theme.colors.background,
        padding: "10px",
        borderRadius: "25px",
        boxShadow: "0 1px 4px rgba(256, 256, 256, 0.3)"
    },
    burgerBar: {
        width: "25px",
        height: "3px",
        backgroundColor: theme.colors.textWhite,
        margin: "4px 0",
        transition: "0.4s"
    },
    openBar1: {
        transform: "rotate(-45deg) translate(-4px, 4px)",
    },
    openBar2: {
        opacity: 0,
    },
    openBar3: {
        transform: "rotate(45deg) translate(-6px, -6px)",
    }
}

const Menu:React.FC<{close:any}> = ({close}) => {
    return(
        <div style={styles.menu as React.CSSProperties}>
            <ul style = {styles.menuList as React.CSSProperties}>
                <li style = {styles.menuListPoint}>
                    <NavLink onClick={close} to="/walletDisplay">
                        Wallet
                    </NavLink>
                </li>
                <li style = {styles.menuListPoint}>
                    <NavLink onClick={close} to="/search">
                        Token Search
                    </NavLink>
                </li>
                <li style = {styles.menuListPoint}>
                    <NavLink onClick={close} to="/watchlist">
                        Watchlist
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

const PopupMenu:React.FC = () => {
    return(
        <Popup
            modal
            nested
            //No idea why but if you pass a React.FC to trigger it does not respond to a click
            //so had to built out a whole components inside of the Popup
            trigger={ (open) => {
                const b1Style = (open) ? {...styles.burgerBar,...styles.openBar1} : styles.burgerBar
                const b2Style = (open) ? {...styles.burgerBar,...styles.openBar2} : styles.burgerBar
                const b3Style = (open) ? {...styles.burgerBar,...styles.openBar3} : styles.burgerBar
                return (
                <div style={styles.burgerMenu as React.CSSProperties}>
                    <div key="b1" style={b1Style}/>
                    <div key="b2" style={b2Style}/>
                    <div key="b3" style={b3Style}/>
                </div>)
            }}
            closeOnDocumentClick={true}
            contentStyle={styles.contentStyle}
            overlayStyle={{ background: "rgba(51,51,51,0)", position: 'absolute', top:"0",width:"400px",height:"500px"}}
        >
            {(close: any) => <Menu close={close} />}
        </Popup>
    )

}

export default PopupMenu
