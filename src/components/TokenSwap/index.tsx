import React, {useState} from 'react'
import {Formik,Form,Field} from 'formik'
import {generateUniTrade} from '../../utils/simpleUniTools'
import theme, {commonStyles} from '../../theme'
import TokenDropdown from './TokenDropdown'
import {Button} from 'react-bootstrap'
import {ArrowDownUp} from 'react-bootstrap-icons'
import {TokenListEntry} from '../../types'

const mainnetGRT:TokenListEntry = {
    address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
    description: 'Graph Token',
    dataSource: 'UNI',
    name: 'GRT',
    asset: 'GRT',
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
    const [fromQuantity,setFromQuantity] = useState<number>(1)
    const [fromToken,setFromToken] = useState<TokenListEntry>(mainnetGRT)
    const [toToken,setToToken] = useState<TokenListEntry>(mainnetWETH)
    // const generatedTrade:TradeContext = await generateUniTrade({
    //     fromAddress:fromToken.address as string,
    //     toAddress:toToken.address as string,
    //     quantity:fromQuantity,
    //     chainId:1,
    //     walletAddress:''
    // })

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFromQuantity(Number(e.target.value))
    }

    const changeTokens = () => {
        const fromToken1 = fromToken
        setFromToken(toToken)
        setToToken(fromToken1)
    }

    return(
        <Formik initialValues={{fromQuantity:'1',toQuantity:'0'}} onSubmit={() => {}}>
            <Form style={{...commonStyles.innerContainer as React.CSSProperties}}>
             
                    <div style={{...commonStyles.tokenSwapDrop as React.CSSProperties, position:'fixed', top:'100px', left:'60px', zIndex:4}}>
                       <TokenDropdown token={fromToken} setToken={setFromToken}/>          
                    </div>
                    <Field name='fromQuantity' style={{width:'200px' as React.CSSProperties, position:'fixed', top:'160px',left:'100px'}} 
                        placeholder='Input the amount you want to switch here...' type='number' onKeyUp={handleChange}/>
                    <ArrowDownUp color='white' onClick={() => changeTokens()} style={{...styles.arrowIcon, position:'fixed', top:'195px', left:'190px'}}/>
                    <div style={{...commonStyles.tokenSwapDrop as React.CSSProperties, position:'fixed', top:'230px', left:'60px', zIndex:3}}>
                        <TokenDropdown token={toToken} setToken={setToToken}/>
                    </div>
                    <Field name='toQuantity' style={{width:'200px' as React.CSSProperties, position:'fixed', top:'290px',left:'100px'}}
                        placeholder='Input the amount you want to switch here...' type='number' readonly={true}/>
                <div style={{...commonStyles.flexColumn as React.CSSProperties, height: '150px', justifyContent:'space-evenly'}}>
                    <Button style={{...commonStyles.largeButton as React.CSSProperties, marginBottom: theme.distance.small, fontSize:'25px', width:'230px'}} variant={'success'}>Approve</Button>
                    <Button style={{...commonStyles.largeButton as React.CSSProperties, fontSize:'25px', width:'230px'}} disabled={true} variant={'success'}>Swap</Button>
                </div>
            </Form>
        </Formik>
    )
}

export default TokenSwap
