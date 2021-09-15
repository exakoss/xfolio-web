import React from 'react'
import { ArrowLeftCircle } from 'react-bootstrap-icons'
import { commonStyles } from '../theme'
import {useHistory} from 'react-router-dom'

const BackButton: React.FC =()=> {
    const history = useHistory()

    return(
    <ArrowLeftCircle onClick={()=>history.goBack()} style={{...commonStyles.backButton as React.CSSProperties, cursor:'pointer'}}> </ArrowLeftCircle>  
    
    )

}


export default BackButton
