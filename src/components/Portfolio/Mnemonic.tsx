import React, {useState,useEffect} from 'react'
import MnemonicPhraseView from './MnemonicPhraseView';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../LoadingScreen';
import {setWallet} from '../../reducers/walletReducer';
import {createConnectedWallet} from '../../utils/ethersTools';
import TouchableLink from '../common/TouchableLink';
import theme, {commonStyles} from '../../theme';
import BackButton from '../BackButton'

const Mnemonic:React.FC = () => {
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const connectedWallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)

    useEffect(() => {
        const asyncHook = async () => {
            const newWallet = createConnectedWallet('MAINNET')
            dispatch(setWallet(newWallet))
            setIsLoading(false)
        }
        asyncHook()
    },[])

    if (isLoading) return <LoadingScreen placeholder='Generating a wallet...'/>
    return(
        <div style={commonStyles.outerContainer as React.CSSProperties}>
           <BackButton/>
            <div style={{fontFamily:theme.fontLink.fontFamilyText}}>
                <h2 style={{textAlign:'center',color:theme.colors.textWhite, fontSize:theme.fontsize.extraLarge,
                    fontFamily:theme.fontLink.fontFamilyLabel}}>Your mnemonic phrase:
                    </h2>
                <MnemonicPhraseView phrase={connectedWallet?.mnemonic.phrase}/>
            </div>
                <TouchableLink style={commonStyles.largeButton as React.CSSProperties} text='Set the password' link='/authorization/setPassword'/>
        </div>
    )
}

export default Mnemonic
