import React, {useState,useEffect} from 'react'
import {Formik} from 'formik';
import LoadingScreen from '../LoadingScreen';
import {useDispatch} from 'react-redux';
import {createWalletFromMnemonic} from '../../utils/ethersTools';
import MnemonicPhraseView from './MnemonicPhraseView';
import {useHistory} from 'react-router';
import {setWallet} from '../../reducers/walletReducer';
import {Button} from 'react-bootstrap';
import theme from '../../theme';

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
        const newWallet = createWalletFromMnemonic(currentPhrase,'KOVAN')
        dispatch(setWallet(newWallet))
        history.push('/walletDisplay')
    }

    if (isLoading) return <LoadingScreen placeholder='Generating a wallet...'/>
    return(
            <Formik initialValues={{phraseWord:''}} onSubmit={onSubmit}>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit} style={{display:'flex ',flexDirection:'column'}}>
                        <h2 style={{textAlign:'center',color:theme.colors.textWhite}}>Type in mnemonic phrase:</h2>
                        <input
                            name='phraseWorld'
                            type='text'
                            autoCapitalize='none'
                            readOnly={isReadOnly}
                            style={{fontSize: theme.fontsize.normal, maxWidth:'250px', alignSelf: 'center'}}
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
                        <MnemonicPhraseView phrase={currentPhrase}/>
                        <Button type='submit' style={{marginTop:theme.distance.small, fontSize: theme.fontsize.large, maxWidth:'250px', alignSelf:'center'}}>Import a wallet</Button>
                    </form>
                )}
            </Formik>
    )
}

export default MnemonicImport
