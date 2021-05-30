const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textWhite: 'white',
        primary: '#0366d6',
        background: '#333333',
        warning: '#d73a4a',
        mainBackground: '#e1e4e8',
        green: '#46c41b',
        darkBrown: '#140d07'
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
        small: 15,
        normal : 20,
        big: 25,
        large: 30
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
    }
}

export default theme
