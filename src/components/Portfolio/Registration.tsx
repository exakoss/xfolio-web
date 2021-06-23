import React from 'react';
import TouchableLink from '../common/TouchableLink';
import {useSelector, RootStateOrAny} from 'react-redux';
import theme, {commonStyles} from '../../theme';

//<img src="testLogo256.png" alt="xfolio logo"></img>
const Registration:React.FC = () => {
    const jsonSeed:string = useSelector((state:RootStateOrAny) => state.seed.seed)

    return(
        <div className='registration' style={{display:'flex',flexDirection:'column', height:'85%',justifyContent:'flex-end'}}>
            <TouchableLink text='Log in' link='login' disabled={(jsonSeed === '')} 
                style={commonStyles.largeButton}
            /> 
            <div className='newUser' style={{flexDirection:'row', alignSelf:'center'}}>
                <TouchableLink text='Import a wallet' link='mnemonicImport'
                    style={{...commonStyles.normalButton as React.CSSProperties, marginRight: theme.distance.normal}}
                />
                <TouchableLink text='Create a new wallet' link='mnemonic'
                    style={commonStyles.normalButton}
                />
            </div>
        </div>
    )
}

export default Registration
