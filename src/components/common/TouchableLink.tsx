import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import theme from '../../theme';


const buttonStyle = {
    marginBottom: theme.distance.big,
    fontSize: theme.fontsize.large,
    borderRadius: theme.distance.tiny,   
    hover: theme.colors.primaryLight
    // background: '#5827B8',
    // backgroundMozLinearGradient: 'top, #5827B8 0%, #02387D 50%, #0077B6 100%',
    // backgroundWebkitLinearGradient: 'top, #5827B8 0%, #02387D 50%, #0077B6 100%',
    // backgroundLinearGradient: 'to bottom, #5827B8 0%, #02387D 50%, #0077B6 100%'
}


const TouchableLink:React.FC<{text:string,link:string,style?:React.CSSProperties,disabled?:boolean}> = ({text,link,style,disabled}) => {
    //  const [bgColor, setBgColor] = useState(buttonStyle.background);
    //  const [bgColor, setBgColor] = useState(theme.colors.primary);

    const history = useHistory()
    return (
        <Button onClick={() => history.push(link)} 
      //  style={{...buttonStyle, ...style, backgroundColor:bgColor}} 
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
