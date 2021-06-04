import React from 'react';
import TouchableLink from '../common/TouchableLink';
import {useSelector, RootStateOrAny} from 'react-redux';

const Registration:React.FC = () => {
    const jsonSeed:string = useSelector((state:RootStateOrAny) => state.seed.seed)

    return(
        <div className='registration' style={{display:'flex',flexDirection:'column'}}>
            <TouchableLink text='Log in' link='login' disabled={(jsonSeed === '')}/>
            <TouchableLink text='Import a wallet' link='mnemonicImport'/>
            <TouchableLink text='Create a new wallet' link='mnemonic'/>
        </div>
    )
}

export default Registration
