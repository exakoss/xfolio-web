import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import theme from '../../theme';


const buttonStyle = {
    marginBottom: theme.distance.big,
    fontSize: theme.fontsize.large,
    borderRadius: theme.distance.tiny,   
    hover: theme.colors.primaryLight
}


const TouchableLink:React.FC<{text:string,link:string,style?:React.CSSProperties,disabled?:boolean}> = ({text,link,style,disabled}) => {


    const history = useHistory()
    return (
        <Button onClick={() => history.push(link)} 
        style={{...buttonStyle, ...style}} 
        disabled={(disabled === undefined) ? false : disabled}
           //  onMouseEnter={() => setBgColor(theme.colors.primaryLight)}
           // onMouseLeave={() => setBgColor(theme.colors.primary)}
        >
            {text}
        </Button>

    )
}

export default TouchableLink
