import React, {useEffect, useRef, useState} from 'react'
import {Formik,Form,Field} from 'formik'
import {generateUniTrade} from '../../utils/simpleUniTools'
import theme, {commonStyles} from '../../theme'
import TokenDropdown from './TokenDropdown'
import {Button} from 'react-bootstrap'
import {ArrowDownUp} from 'react-bootstrap-icons'
import {TokenListEntry} from '../../types'
import {ChainId, TradeContext} from 'simple-uniswap-sdk'
import {Wallet} from 'ethers'
import {RootStateOrAny, useSelector} from 'react-redux'

const mainnetGRT:TokenListEntry = {
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    description: 'Uniswap',
    dataSource: 'UNI',
    name: 'UNI',
    asset: 'UNI',
    formattedRate: 10,
    formattedRateDaily: 8,
    category: 'crypto',
    sign:''
}

const mainnetWETH:TokenListEntry = {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    description: 'Wrapped Ether',
    dataSource: 'UNI',
    name: 'WETH',
    asset: 'WETH',
    formattedRate: 10,
    formattedRateDaily: 8,
    category: 'crypto',
    sign:''
}

const styles = {
    arrowIcon: {
        cursor: 'pointer',
        alignSelf: 'center',
        height: '30px',
        width: '30px',
        borderRadius: '25px',
        padding: theme.distance.tiny,
        // position:'absolute',
        // top:'200px',
        // right:'130px'

    }
}

const TokenSwap:React.FC = () => {
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)
    const [fromQuantity,setFromQuantity] = useState<number>(1)
    const [fromToken,setFromToken] = useState<TokenListEntry>(mainnetGRT)
    const [toToken,setToToken] = useState<TokenListEntry>(mainnetWETH)
    const [uniTrade,setUniTrade] = useState<null | TradeContext>(null)
    const formikRef = useRef(null)
    console.log(uniTrade)
    const handleChange = async (e:React.ChangeEvent<HTMLTextAreaElement>): Promise<void> => {
        setFromQuantity(Number(e.target.value))
    }

    useEffect(() => {
        const asyncFunction = async () => {
            const newTrade = await generateUniTrade({
                fromAddress:fromToken.address as string,
                toAddress:toToken.address as string,
                quantity:fromQuantity,
                chainId:ChainId['MAINNET'],
                walletAddress: wallet.address,
            })
            setUniTrade(newTrade)
            // @ts-ignore
            formikRef.current.setFieldValue('toQuantity',Number(newTrade.expectedConvertQuote).toFixed(4).toString())
        }
        asyncFunction()
    },[fromToken,fromQuantity,toToken,wallet])

    const changeTokens = () => {
        const fromToken1 = fromToken
        setFromToken(toToken)
        setToToken(fromToken1)
        // @ts-ignore
        console.log(Number(formikRef.current.values.toQuantity))
        // @ts-ignore
        setFromQuantity(Number(formikRef.current.values.toQuantity))
        // @ts-ignore
        formikRef.current.setFieldValue('fromQuantity',Number(formikRef.current.values.toQuantity).toFixed(4).toString())
    }

    return(
        <Formik initialValues={{fromQuantity:'1',toQuantity:'1'}} onSubmit={() => {}} innerRef={formikRef}>
            <Form style={{...commonStyles.innerContainer as React.CSSProperties}}>

                    <div style={{...commonStyles.tokenSwapDrop as React.CSSProperties, position:'fixed', top:'100px', left:'60px', zIndex:4}}>
                       <TokenDropdown token={fromToken} setToken={setFromToken}/>
                    </div>
                    <Field name='fromQuantity' style={{width:'200px' as React.CSSProperties, position:'fixed', top:'160px',left:'100px'}}
                        placeholder='Input the amount you want to switch here...' type='number' onKeyUp={handleChange} onInput={handleChange}/>
                    <ArrowDownUp color='white' onClick={() => changeTokens()} style={{...styles.arrowIcon, position:'fixed', top:'195px', left:'190px'}}/>
                    <div style={{...commonStyles.tokenSwapDrop as React.CSSProperties, position:'fixed', top:'230px', left:'60px', zIndex:3}}>
                        <TokenDropdown token={toToken} setToken={setToToken}/>
                    </div>
                    <Field name='toQuantity' style={{width:'200px' as React.CSSProperties, position:'fixed', top:'290px',left:'100px'}}
                        placeholder='Input the amount you want to switch here...' type='number' readOnly={true}/>
                     {uniTrade?.routeText && <div style={commonStyles.whiteCenteredText as React.CSSProperties}>{uniTrade.routeText}</div>}
                <div style={{...commonStyles.flexColumn as React.CSSProperties, height: '150px', justifyContent:'space-evenly'}}>
                    <Button style={{...commonStyles.largeButton as React.CSSProperties, marginBottom: theme.distance.small, fontSize:'25px', width:'230px'}} variant={'success'} disabled={true}>Approve</Button>
                    <Button style={{...commonStyles.largeButton as React.CSSProperties, fontSize:'25px', width:'230px'}} disabled={true} variant={'success'}>Swap</Button>
                </div>
            </Form>
        </Formik>
    )
}

export default TokenSwap
