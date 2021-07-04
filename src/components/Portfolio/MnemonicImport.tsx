import React, {useState,useEffect} from 'react'
import {Formik} from 'formik';
import LoadingScreen from '../LoadingScreen';
import {useDispatch} from 'react-redux';
import {createWalletFromMnemonic} from '../../utils/ethersTools';
import MnemonicPhraseView from './MnemonicPhraseView';
import {useHistory} from 'react-router';
import {setWallet} from '../../reducers/walletReducer';
import {Button} from 'react-bootstrap';
import theme, {commonStyles} from '../../theme';

const MnemonicImport:React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentPhrase,setCurrentPhrase] = useState('')
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isReadOnly,setIsReadOnly] = useState<boolean>(false)

    useEffect(() => {
        if (currentPhrase.split(' ').length === 12) {
            setIsReadOnly(true)
        }
    },[currentPhrase])

    const onSubmit = () => {
        setIsLoading(true)
        const newWallet = createWalletFromMnemonic(currentPhrase,'MAINNET')
        dispatch(setWallet(newWallet))
        history.push('/authorization/setPassword')
    }

    if (isLoading) return <LoadingScreen placeholder='Generating a wallet...'/>
    return(
            <Formik initialValues={{phraseWord:''}} onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit} style={commonStyles.outerContainer as React.CSSProperties}>
                        <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
                            <h2 style={{textAlign:'center',color:theme.colors.textWhite, fontSize:theme.fontsize.extraLarge,
                                fontFamily:theme.fontLink.fontFamilyLabel}}>Type in the mnemonic phrase:
                            </h2>
                            <input
                                name='phraseWorld'
                                type='text'
                                autoCapitalize='none'
                                readOnly={isReadOnly}
                                style={{...commonStyles.textBox as React.CSSProperties, width:'350px'}}
                                placeholder='Input your mnemonic...'
                                onChange={(event) => {
                                    const val = event.target.value
                                    if (val !== ' ') {
                                        if (val.slice(-1) === ' ') {
                                            if (currentPhrase === '') {
                                                setCurrentPhrase(currentPhrase.concat(val.slice(0, val.length - 1)))
                                            } else {
                                                setCurrentPhrase(currentPhrase.concat(' ', val.slice(0, val.length - 1)))
                                            }
                                            event.target.value = ''
                                        }
                                    }
                                }}
                            />
                        </div>
                        <MnemonicPhraseView phrase={currentPhrase}/>
                        <Button type='submit' style={commonStyles.largeButton as React.CSSProperties}>Import a wallet</Button>
                    </form>
                )}
            </Formik>
    )
}

export default MnemonicImport
