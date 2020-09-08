export const darkTheme = {
    palette: {
        primary: {
            main: '#90caf9',
        },
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
    overrides: {
        RaAppBar: {
            menuButton: {
                // Since sub-<Menu /> hide labels when sidebar is closed
                // We need to disallow sidebar closing (hiding button is simpler)
                display: 'none',
            },
        },
        RaSidebar: {
            drawerPaper: {
                paddingRight: 16,
                width: 'auto',
            },
        },
        MuiAppBar: {
            // Hide MenuItemCategory shadow behind the appbar
            zIndex: 9999,
        },
        RaMenuItemCategory: {
            popoverPaper: {
                backgroundColor: 'white',
                color: '#303030',
            },
        },
        RaMenuItem: {
            link: {
                color: '#303030',
            },
            icon: {
                color: '#303030',
            },
            active: {
                color: 'black',
            },
        },
        RaFilterFormInput: {
            body: {
                // Fixes search filter breadcrumb overlap
                '& > div': { marginTop: 8 },
            },
        },
    },
};

export const lightTheme = {
    palette: {
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
    },
    shape: {
        borderRadius: 10,
    },
    overrides: {
        RaAppBar: {
            menuButton: {
                // Since sub-<Menu /> hide labels when sidebar is closed
                // We need to disallow sidebar closing (hiding button is simpler)
                display: 'none',
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
                '& > div': { marginTop: 8 },
            },
        },
    },
};
