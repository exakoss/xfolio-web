import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap';
import theme from '../theme';
import {Bridge} from 'arb-ts';
import {Formik, Form, Field} from 'formik';
import {useHistory} from 'react-router';
import TouchableLink from './common/TouchableLink';
import {RootStateOrAny, useSelector} from 'react-redux';
import {Wallet} from 'ethers';
import {ETH_ERC20_BRIDGE, ARB_TOKEN_BRIDGE} from '../constants';
import {connectWalletToNetwork, getCurrentBalance} from '../utils/ethersTools';
import {parseEther} from 'ethers/lib/utils';

const styles = {
    container: {
        display: 'flex',
        position: 'absolute',
        height: '100%',
        flexDirection:'column',
        justifyContent:'space-around',
    },
}

const BridgeETH:React.FC = () => {
    const history = useHistory()
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const [currentBalance,setCurrentBalance] = useState<number>(0)

    useEffect(() => {
        const updateCurrentBalance = async () => {
            const newBalance:number = await getCurrentBalance(wallet)
            setCurrentBalance(newBalance)
        }
        updateCurrentBalance()
    },[])

    const handleSubmit = async (values: { quantity: string }) => {
        console.log(values.quantity)
        const l2Wallet:Wallet = connectWalletToNetwork(wallet,'ARBITRUM_KOVAN')
        const l2WalletAddress = await l2Wallet.getAddress()
        const bridge = new Bridge(
            ETH_ERC20_BRIDGE,
            ARB_TOKEN_BRIDGE,
            wallet,
            l2Wallet
        )
        const result = await bridge.depositETH(parseEther(String(values.quantity)),l2WalletAddress)
        console.log(result)
        history.push('/walletDisplay')
    }

    return(
            <Formik initialValues={{quantity:'0.1'}} onSubmit={handleSubmit}>
                <Form style ={styles.container as React.CSSProperties}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <h2 style={{textAlign:'center',color:theme.colors.textWhite}}>Your are about to bridge:</h2>
                        <Field name='quantity' placeholder='Input ETH amount here' type='number' step='0.1' style={{fontSize: theme.fontsize.large}}/>
                        <h4 style={{color:theme.colors.textSecondary}}>You have: {currentBalance} ETH</h4>
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <TouchableLink text='Reject' link='/walletDisplay' style={{backgroundColor:theme.colors.warning}}/>
                        <Button type='submit' style={{backgroundColor:theme.colors.green, fontSize: theme.fontsize.large,}}>Confirm</Button>
                    </div>
                </Form>
            </Formik>
    )
}

export default BridgeETH
