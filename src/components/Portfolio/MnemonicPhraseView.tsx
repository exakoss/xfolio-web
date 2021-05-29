import React from 'react';
import theme from '../../theme';

const styles = {
    container: {
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop:theme.distance.normal
    },
    word: {
        borderRadius: 5,
        // marginVertical: theme.distance.small,
        // marginHorizontal: theme.distance.tiny,
        marginTop: theme.distance.small,
        marginBottom: theme.distance.small,
        marginLeft: theme.distance.tiny,
        padding: theme.distance.tiny,
        borderWidth: 2,
        borderColor: theme.colors.textSecondary,
        backgroundColor: theme.colors.darkBrown,
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.normal
    }
}


const MnemonicPhraseView:React.FC<{phrase: string| undefined}> = ({phrase}) => {
    if (!phrase) return null
    const mnemonicPhrase = phrase.split(" ",12)
    return(
        <div style={styles.container as React.CSSProperties}>
            {mnemonicPhrase.map(w => {
                return  <div style={styles.word} key={w}>
                        {w}
                        </div>
            })}
        </div>
    )
}

export default MnemonicPhraseView
