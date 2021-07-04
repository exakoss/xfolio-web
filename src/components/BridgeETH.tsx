import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap';
import theme, {commonStyles} from '../theme';
import {Bridge} from 'arb-ts';
import {Formik, Form, Field} from 'formik';
import {useHistory} from 'react-router';
import TouchableLink from './common/TouchableLink';
import {RootStateOrAny, useSelector} from 'react-redux';
import {Wallet} from 'ethers';
import {L1_GATEWAY_ROUTER,L2_GATEWAY_ROUTER} from '../constants';
import {connectWalletToNetwork, getCurrentBalance} from '../utils/ethersTools';
import {parseEther} from 'ethers/lib/utils';


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
    },[wallet])

    const handleSubmit = async (values: { quantity: string }) => {
        console.log(values.quantity)
        const l1Wallet = connectWalletToNetwork(wallet,'RINKEBY')
        const l2Wallet:Wallet = connectWalletToNetwork(wallet,'ARB_RINKEBY')
        // const l2WalletAddress = await l2Wallet.getAddress()
        const bridge = new Bridge(
            L1_GATEWAY_ROUTER,
            L2_GATEWAY_ROUTER,
            l1Wallet,
            l2Wallet
        )
        const result = await bridge.depositETH(parseEther(String(values.quantity)))
        console.log(result)
        history.goBack()
    }

    return(
                <Formik initialValues={{quantity:'0.1'}} onSubmit={handleSubmit}>
                    <Form style ={{...commonStyles.innerContainer as React.CSSProperties, justifyContent: 'space-around'}}>
                        <div style={{display:'flex',flexDirection:'column', textAlign:'center'}}>
                            <h2 style={{color:theme.colors.textWhite, fontFamily:theme.fontLink.fontFamilyText,
                                fontSize:theme.fontsize.normal}}>Your are about to bridge:
                            </h2>
                            <Field name='quantity' placeholder='Input ETH amount here' type='number'
                                step='0.1' style={{...commonStyles.textBox as React.CSSProperties, width: '300px'}}
                            />
                            <h4 style={{color:theme.colors.textSecondary, fontFamily:theme.fontLink.fontFamilyText,
                                fontSize:theme.fontsize.normal}}>Total ETH Avalible: {currentBalance}
                            </h4>
                        </div>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <TouchableLink text='Reject' link='/main' style={{...commonStyles.largeButton as React.CSSProperties, background: theme.colors.rejectColor, borderWidth: '0px', boxShadow:'none'}}/>
                            <Button type='submit' style={commonStyles.largeButton as React.CSSProperties}>Confirm</Button>
                        </div>
                    </Form>
                </Formik>
    )
}

export default BridgeETH
