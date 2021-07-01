
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
        white: "#FFFFFF",
        lightRed: 'indianred'
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
    btnFlat: {
        backgroundColor: '#333333',
        borderColor: '#333333',
        borderRadius:'100px',
        fontSize: '5px'



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
    borderBottomColor: theme.colors.white,
    zIndex: '9999',
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
       // borderRadius: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 'double',
        borderBottomWidth: 'initial',
        borderBottomStyle: 'double',
        borderBottomColor: 'initial'
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
        fontSize: theme.fontsize.large,
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
