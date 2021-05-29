import React from 'react'
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import theme from '../../theme';

const buttonStyle = {
    marginBottom: theme.distance.big,
    fontSize: theme.fontsize.large,
    borderRadius: theme.distance.tiny
}

const TouchableLink:React.FC<{text:string,link:string}> = ({text,link}) => {
    const history = useHistory()
    return (
        <Button onClick={() => history.push(link)} style={buttonStyle}>
            {text}
        </Button>
    )
}

export default TouchableLink
