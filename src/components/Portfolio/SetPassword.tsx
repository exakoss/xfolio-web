import React from 'react';
import {useHistory} from 'react-router';
import PasswordInput from './PasswordInput';
import {Wallet} from 'ethers';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import {setSeed} from '../../reducers/seedReducer';

const SetPassword:React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const wallet:Wallet = useSelector((state:RootStateOrAny) => state.wallet.wallet)

    const onSubmit = async ({password}: {password:string}) => {
        try {
            const jsonSeed = await wallet.encrypt(password)
            console.log(JSON.parse(jsonSeed))
            dispatch(setSeed(jsonSeed))
            history.push('/main')
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <PasswordInput onSubmit={onSubmit}/>
        </div>
    )
}

export default SetPassword
