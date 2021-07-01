import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {commonStyles} from '../../theme';



const TouchableLink:React.FC<{text:string,link:string,style?:React.CSSProperties,disabled?:boolean}> = ({text,link,style,disabled}) => {

   // const [bgColor, setBgColor] = useState(theme.colors.primary)
    const history = useHistory()
    return (
        <Button onClick={() => history.push(link)} 
        //style={{...commonStyles.buttonStyle as React.CSSProperties, ...style, backgroundColor:bgColor}} 
        style={{...commonStyles.buttonStyleTL as React.CSSProperties, ...style}} 
        disabled={(disabled === undefined) ? false : disabled}
        // hover won't return to orignial color on mouseOut
        //    onMouseOver={() => setBgColor(theme.colors.warning)}
        //    onMouseOut={() => setBgColor(theme.colors.primary)}
        >
            {text}
        </Button>

    )
}

export default TouchableLink
