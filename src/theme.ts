
const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textWhite: 'white',
        primary: '02428A',
        primaryLight: '047AFF',
        background: 'linear-gradient(180deg, black, #1b436d)',
        warning: '#d73a4a',
        mainBackground: '#e1e4e8',
        green: '#46c41b',
        darkBrown: '#140d07',
        white: "#FFFFFF",
        lightRed: 'indianred',
        borderColor: 'linear-gradient(to right bottom, #402ce0, #0de2c5)',
        buttonColor: 'linear-gradient(180deg, black, transparent)',
        rejectColor: 'linear-gradient(180deg, indianRed, #1b1717f5)'

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
      },
    
}
export const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    width: '100%',
    height:'15%',
    borderBottom: '1px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
   // borderBottomColor: theme.colors.white,
   borderImage: theme.colors.borderColor,
   borderImageSlice: '1',
   zIndex: 'auto',

    dropdownContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}

export const commonStyles = {
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '85%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mainText: {
        color:theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: 'center',
        fontFamily: theme.fontLink.fontFamilyText
    },
    secondaryText: {
        color:theme.colors.textSecondary,
        fontSize: theme.fontsize.big,
        textAlign: 'center',
        fontFamily: theme.fontLink.fontFamilyText
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderImage: 'linear-gradient(to right bottom, rgb(34 33 49 / 32%), rgb(67 151 210 / 85%))',
        borderImageSlice: '1',
        borderBottom: '1px',
        borderBottomStyle: 'solid'
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
    buttonStyleTL:{
        marginBottom: theme.distance.big,
        fontSize: theme.fontsize.large,
        borderRadius: theme.distance.tiny,   
        background: theme.colors.buttonColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: theme.colors.borderColor,
        borderImageSlice: '1'
    },
    largeButton: {
        width:'300px', 
        boxShadow: '0 0 50px rgba(255, 255, 255, 0.5)',
        fontFamily: theme.fontLink.fontFamilyLabel, 
        fontSize: theme.fontsize.large,
        background: theme.colors.buttonColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: theme.colors.borderColor,
        borderImageSlice: '1'
    },
    normalButton: {
        fontFamily:theme.fontLink.fontFamilyText,
        fontSize: theme.fontsize.extraSmall,
        background: theme.colors.buttonColor,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: theme.colors.borderColor,
        borderImageSlice: '1'  
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
