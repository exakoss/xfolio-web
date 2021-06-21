import React from 'react';
import TouchableLink from '../common/TouchableLink';
import {useSelector, RootStateOrAny} from 'react-redux';
import theme from '../../theme';

//<img src="testLogo256.png" alt="xfolio logo"></img>
const Registration:React.FC = () => {
    const jsonSeed:string = useSelector((state:RootStateOrAny) => state.seed.seed)

    return(
        <div className='registration' style={{display:'flex',flexDirection:'column', 
        height:'85%',justifyContent:'flex-end'}}>
            <TouchableLink text='Log in' link='login' disabled={(jsonSeed === '')} 
            style={{width:'300px', boxShadow: '0 0 50px rgba(255, 255, 255, 0.5)', 
            fontFamily:theme.fontLink.fontFamilyLabel, fontSize: theme.fontsize.large}}/> 
            <div className='newUser' style={{flexDirection:'row', alignSelf:'center', fontFamily:theme.fontLink.fontFamilyText}}>
                <TouchableLink text='Import a wallet' link='mnemonicImport'
                style={{fontSize: theme.fontsize.extraSmall, marginRight: theme.distance.normal}}/>
                <TouchableLink text='Create a new wallet' link='mnemonic'
                style={{fontSize: theme.fontsize.extraSmall}}/>
            </div>
        </div>
    )
}

export default Registration
