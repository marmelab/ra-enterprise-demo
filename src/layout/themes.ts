import { ThemeOptions } from '@react-admin/ra-enterprise';
import { fade, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';

const darkPalette = createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
        main: '#90caf9',
    },
});

export const getThemes = (
    theme: Theme
): { darkTheme: ThemeOptions; lightTheme: ThemeOptions } => {
    return { darkTheme: darkTheme(theme), lightTheme: lightTheme(theme) };
};

const darkTheme = (theme: Theme): ThemeOptions => ({
    palette: darkPalette,
    overrides: {
        MuiAppBar: {
            // Hide MenuItemCategory shadow behind the appbar
            zIndex: 9999,
        },
        RaAppBar: {
            menuButton: {
                // Since sub-<Menu /> hide labels when sidebar is closed
                // We need to disallow sidebar closing in desktop (hiding button is simpler)
                display: 'none',
                [theme.breakpoints.down('xs')]: {
                    display: 'block',
                },
            },
        },
        RaSearchInput: {
            root: {
                color: darkPalette.common.white,
                backgroundColor: fade(darkPalette.common.black, 0.04),
                '&:hover': {
                    backgroundColor: fade(darkPalette.common.black, 0.13),
                },
                '&:focus': {
                    backgroundColor: fade(darkPalette.common.black, 0.13),
                },
                '&:focus-within': {
                    backgroundColor: fade(darkPalette.common.black, 0.13),
                },
            },
            inputBase: {
                background: fade(darkPalette.common.black, 0.04),
                borderRadius: 10,
                '&:hover': {
                    background: fade(darkPalette.common.black, 0.1),
                },
            },
            inputAdornmentStart: {
                color: darkPalette.common.white,
            },
        },
        RaSidebar: {
            drawerPaper: {
                paddingRight: 16,
                width: 'auto',
            },
        },
        RaMenuItemCategory: {
            closeButton: {
                color: 'white',
            },
            popoverPaper: {
                backgroundColor: '#424242',
            },
        },
        RaMenuItem: {
            root: {
                color: 'white',
            },
            link: {
                '&:hover': {
                    color: 'black',
                    backgroundColor: grey[200],
                },
            },
        },
        RaFilterFormInput: {
            body: {
                // Fixes search filter breadcrumb overlap
                '& > div': {
                    marginTop: 8,
                },
            },
        },
    },
});

const lightPalette = createPalette({
    type: 'light',
    primary: {
        main: '#4f3cc9',
    },
    secondary: {
        light: '#5f5fc4',
        main: '#283593',
        dark: '#001064',
        contrastText: '#fff',
    },
    background: {
        default: '#fcfcfe',
    },
});

export const lightTheme = (theme: Theme): ThemeOptions => ({
    palette: lightPalette,
    shape: {
        borderRadius: 10,
    },
    overrides: {
        RaAppBar: {
            menuButton: {
                // Since sub-<Menu /> hide labels when sidebar is closed
                // We need to disallow sidebar closing (hiding button is simpler)
                display: 'none',
                [theme.breakpoints.down('xs')]: {
                    display: 'block',
                },
            },
        },
        RaSearchInput: {
            root: {
                color: lightPalette.text.primary,
                backgroundColor: fade(lightPalette.common.black, 0.04),
                '&:hover': {
                    backgroundColor: fade(lightPalette.common.black, 0.13),
                },
                '&:focus': {
                    backgroundColor: fade(lightPalette.common.black, 0.13),
                },
                '&:focus-within': {
                    backgroundColor: fade(lightPalette.common.black, 0.13),
                },
            },
            inputBase: {
                background: fade(lightPalette.common.black, 0.04),
                borderRadius: 10,
                '&:hover': {
                    background: fade(lightPalette.common.black, 0.1),
                },
            },
            inputAdornmentStart: {
                color: lightPalette.text.hint,
            },
        },
        RaMenuItemLink: {
            root: {
                borderLeft: '3px solid #fff',
            },
            active: {
                borderLeft: '3px solid #808080',
            },
        },
        RaMenuItemCategory: {
            root: {
                color: '#808080',
                '&:hover': {
                    color: 'black',
                    backgroundColor: grey[200],
                },
            },
        },
        RaMenuItem: {
            root: {
                color: '#808080',
            },
        },
        RaMultiLevelMenu: {
            navWithCategories: {
                backgroundColor: '#fff',
            },
        },
        MuiPaper: {
            elevation1: {
                boxShadow: 'none',
            },
            root: {
                border: '1px solid #e0e0e3',
                backgroundClip: 'padding-box',
            },
        },
        MuiButton: {
            contained: {
                backgroundColor: '#fff',
                color: '#4f3cc9',
                boxShadow: 'none',
            },
        },
        MuiAppBar: {
            // Hide MenuItemCategory shadow behind the appbar
            root: { zIndex: 9999 },
            colorSecondary: {
                color: '#808080',
                backgroundColor: '#fff',
            },
        },
        MuiLinearProgress: {
            colorPrimary: {
                backgroundColor: '#f5f5f5',
            },
            barColorPrimary: {
                backgroundColor: '#d7d7d7',
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        RaSidebar: {
            drawerPaper: {
                paddingRight: 16,
                width: 'auto',
            },
        },
        RaFilterFormInput: {
            body: {
                // Fixes search filter breadcrumb overlap
                '& > div': {
                    marginTop: 8,
                },
            },
        },
        RaLinkedData: {
            root: {
                '&:hover': {
                    backgroundColor: '#ddd',
                },
            },
        },
    },
});
