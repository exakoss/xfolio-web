import React, {useState,useEffect} from 'react'
import MnemonicPhraseView from './MnemonicPhraseView';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../LoadingScreen';
import {setWallet} from '../../reducers/walletReducer';
import {createConnectedWallet} from '../../utils/ethersTools';
import TouchableLink from '../common/TouchableLink';
import theme from '../../theme';

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}

const Mnemonic:React.FC = () => {
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const connectedWallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)

    useEffect(() => {
        const asyncHook = async () => {
            const newWallet = createConnectedWallet('KOVAN')
            dispatch(setWallet(newWallet))
            setIsLoading(false)
        }
        asyncHook()
    },[])

    if (isLoading) return <LoadingScreen placeholder='Generating a wallet...'/>
    return(
        <div style={styles.container}>
            <h2 style={{textAlign:'center',color:theme.colors.textWhite}}>Your mnemonic phrase:</h2>
            <MnemonicPhraseView phrase={connectedWallet?.mnemonic.phrase}/>
            <div style={styles.buttonContainer}>
                <TouchableLink text='Proceed to the wallet' link='/walletDisplay'/>
            </div>
        </div>
    )
}

export default Mnemonic
