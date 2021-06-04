import React from 'react';
import PasswordInput from './PasswordInput';
import {setWallet} from '../../reducers/walletReducer';
import {useSelector,useDispatch,RootStateOrAny} from 'react-redux';
import {ethers} from 'ethers';
import {useHistory} from 'react-router';
import {connectWalletToNetwork} from '../../utils/ethersTools';

const Login:React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const jsonSeed:string = useSelector((state:RootStateOrAny) => state.seed.seed)

    const onSubmit = async ({password}: {password:string}) => {
        try {
            const generatedWallet = await ethers.Wallet.fromEncryptedJson(jsonSeed,password)
            const wallet = connectWalletToNetwork(generatedWallet,'KOVAN')
            dispatch(setWallet(wallet))
            history.push('/walletDisplay')
        }
        catch (e) {
            console.error(e)
        }
    }

    return(
        <div>
            <PasswordInput onSubmit={onSubmit}/>
        </div>
    )
}

export default Login
