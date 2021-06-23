

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textWhite: 'white',
       // primary: '#0366d6',
        primary: '02428A',
        primaryLight: '047AFF',
        background: '#333333',
        warning: '#d73a4a',
        mainBackground: '#e1e4e8',
        green: '#46c41b',
        darkBrown: '#140d07',
        white: "#FFFFFF"
    },
    fontWeights: {
        normal: 400,
        bold: 700,
    },
    distance: {
        extraLarge: '40px',
        big: '25px',
        normal: '15px',
        small: '10px',
        tiny: '5px'
    },
    fontsize: {
        extraSmall: 12,
        small: 15,
        normal : 20,
        big: 25,
        large: 30,
        extraLarge: 35
    },
    buttonHover: {
        background: 'black'
    },
    fontLink: {
        fontFamilyText: 'Montserrat, sans-serif',
        fontFamilyLabel: 'Teko, sans-serif'
      }
    
}





export const commonStyles = {
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    whiteCenteredText: {
        color:theme.colors.textWhite,
        textAlign: 'center'
    },
    textPlaceholder: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: "center"
    },
    tile:{
        backgroundColor: theme.colors.background,
        display: 'flex',
        borderRadius: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tileText: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.normal
    },
    nameText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontsize.small,
    },
    positivePercentage: {
        color: theme.colors.green,
        fontSize: theme.fontsize.normal
    },
    negativePercentage: {
        color: theme.colors.warning,
        fontSize: theme.fontsize.normal
    },
    nameContainer: {
        display: "flex",
        flexDirection:"column"
    },
    largeButton: {
        width:'300px', 
        boxShadow: '0 0 50px rgba(255, 255, 255, 0.5)',
        fontFamily: theme.fontLink.fontFamilyLabel, 
        fontSize: theme.fontsize.large
    },
    normalButton: {
        fontFamily:theme.fontLink.fontFamilyText,
        fontSize: theme.fontsize.extraSmall,
        
        
    },
    textBox: {
        fontFamily: theme.fontLink.fontFamilyText,
        fontSize: theme.fontsize.small, 
        marginBottom:theme.distance.normal,
        height:theme.distance.extraLarge, 
        marginTop:theme.distance.normal

    }
}

export default theme
