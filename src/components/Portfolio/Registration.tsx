import React from 'react';
import TouchableLink from '../common/TouchableLink';

const Registration:React.FC = () => {
    return(
        <div className='registration' style={{display:'flex',flexDirection:'column'}}>
            <TouchableLink text='Log in' link='login'/>
            <TouchableLink text='Import a wallet' link='mnemonicImport'/>
            <TouchableLink text='Create a new wallet' link='mnemonic'/>
        </div>
    )
}

export default Registration
