import React from 'react'
import theme from '../theme';
import loadingGif from '../assets/loading-transparent.gif'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gif:{
        width: '160px',
        height: '160px'
    },
    loadingText: {
        color:theme.colors.textWhite,
        fontSize:theme.fontsize.large
    }
}

const LoadingScreen:React.FC<{placeholder:string}> = ({placeholder}) => {
    return(
        <div style={styles.container as React.CSSProperties}>
            <span style={styles.loadingText}>{placeholder}</span>
            <img src={loadingGif} style={styles.gif} alt='Xfolio gif'/>
        </div>
    )
}

export default LoadingScreen
