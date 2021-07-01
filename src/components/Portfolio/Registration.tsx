import React from 'react';
import TouchableLink from '../common/TouchableLink';
import {useSelector, RootStateOrAny} from 'react-redux';
import theme, {commonStyles} from '../../theme';
import xfolioLogo from '../../assets/uniportfolio4inverted.png'

const Registration:React.FC = () => {
    const jsonSeed:string = useSelector((state:RootStateOrAny) => state.seed.seed)

    return(
        <div className='registration' style={commonStyles.outerContainer as React.CSSProperties}>
            <img src={xfolioLogo} style={{width:'220px', height:'220px'}} alt='Xfolio logo'/>
            <div    style={{display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'}}>
                <TouchableLink text='Log in' link='/authorization/login' disabled={(jsonSeed === '')} 
                    style={commonStyles.largeButton}
                /> 
                <div className='newUser' style={{flexDirection:'row'}}>
                    <TouchableLink text='Import a wallet' link='/authorization/mnemonicImport'
                        style={{...commonStyles.normalButton as React.CSSProperties, marginRight: theme.distance.normal}}
                    />
                    <TouchableLink text='Create a new wallet' link='/authorization/mnemonic'
                        style={commonStyles.normalButton}
                    />
                </div>
            </div>
        </div>
    )
}

export default Registration
