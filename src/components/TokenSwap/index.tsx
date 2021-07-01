import React, {useState} from 'react'
import {Formik,Form,Field} from 'formik'
import {generateUniTrade} from '../../utils/simpleUniTools'
import theme, {commonStyles} from '../../theme'
import TokenDropdown from './TokenDropdown'
import PopupMenu from '../PopupMenu'
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
        height: '40px',
        width: '40px',
        borderRadius: '25px',
        padding: theme.distance.tiny
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
            <Form style={{...commonStyles.flexColumn as React.CSSProperties, height:'100%', justifyContent:'space-around'}}>
                <PopupMenu/>
                <div style={commonStyles.flexColumn as React.CSSProperties}>
                    <TokenDropdown token={fromToken} setToken={setFromToken}/>
                    <Field name='fromQuantity' placeholder='Input the amount you want to switch here...' type='number' onKeyUp={handleChange}/>
                </div>
                {/*<Button onClick={() => changeTokens()}>*/}
                {/*    <ArrowDownUp color='black'/>*/}
                {/*</Button>*/}
                <ArrowDownUp color='black' onClick={() => changeTokens()} style={styles.arrowIcon}/>
                <div style={commonStyles.flexColumn as React.CSSProperties}>
                    <TokenDropdown token={toToken} setToken={setToToken}/>
                    <Field name='toQuantity' placeholder='Input the amount you want to switch here...' type='number' readonly={true}/>
                </div>
                <div style={commonStyles.flexColumn as React.CSSProperties}>
                    <Button style={{marginBottom: theme.distance.small}} variant={'success'}>Approve</Button>
                    <Button disabled={true} variant={'success'}>Swap</Button>
                </div>
            </Form>
        </Formik>
    )
}

export default TokenSwap
