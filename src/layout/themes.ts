import {
    buildThemeFromTypeMethod,
    ThemeOptions,
} from '@react-admin/ra-enterprise';
import { alpha, Theme } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';
import { grey } from '@mui/material/colors';

const borderRadius = 10;

const darkPalette = createPalette({
    mode: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
        main: '#90caf9',
    },
});

export const getThemes = (
    theme: Theme
): { darkTheme: ThemeOptions; lightTheme: ThemeOptions } => {
    const buildTheme = buildThemeFromTypeMethod(
        theme,
        getLightTheme(theme),
        getDarkTheme(theme)
    );
    return {
        darkTheme: buildTheme('dark'),
        lightTheme: buildTheme('light'),
    };
};

export const getDarkTheme = (theme: Theme): ThemeOptions => {
    const cardBackground = '#1A1A1A';
    return {
        palette: darkPalette,
        shape: {
            borderRadius,
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        // Hide MenuItemCategory shadow behind the appbar
                        zIndex: 9999,
                    },
                },
            },
            RaAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: cardBackground,
                        borderColor: cardBackground,
                        color: '#fff',
                        '& .RaAppBar-menuButton': {
                            // Since sub-<Menu /> hide labels when sidebar is closed
                            // We need to disallow sidebar closing on desktop (hiding button is simpler)
                            display: 'block',
                            [theme.breakpoints.up('md')]: {
                                display: 'none',
                            },
                        },
                    },
                },
            },
            RaSearchInput: {
                styleOverrides: {
                    root: {
                        color: darkPalette.common.white,
                        backgroundColor: alpha(darkPalette.common.black, 0.04),
                        '&:hover': {
                            backgroundColor: alpha(
                                darkPalette.common.black,
                                0.13
                            ),
                        },
                        '&:focus': {
                            backgroundColor: alpha(
                                darkPalette.common.black,
                                0.13
                            ),
                        },
                        '&:focus-within': {
                            backgroundColor: alpha(
                                darkPalette.common.black,
                                0.13
                            ),
                        },
                        '& .RaSearchInput-inputBase': {
                            background: alpha(darkPalette.common.black, 0.04),
                            '&:hover': {
                                background: alpha(
                                    darkPalette.common.black,
                                    0.1
                                ),
                            },
                        },
                        '& .RaSearchInput-inputAdornmentStart': {
                            color: darkPalette.common.white,
                        },
                    },
                },
            },
            RaSidebar: {
                styleOverrides: {
                    root: {
                        '& .RaSidebar-drawerPaper': {
                            paddingRight: 16,
                            [theme.breakpoints.up('md')]: {
                                width: 64,
                            },
                        },
                        '& .RaSidebar-fixed': {
                            zIndex: 1200,
                        },
                    },
                },
            },
            RaMultiLevelMenu: {
                styleOverrides: {
                    root: {
                        '& .RaMultiLevelMenu-navWithCategories': {
                            backgroundColor: cardBackground,
                        },
                    },
                },
            },
            RaMenuItemCategory: {
                styleOverrides: {
                    root: {
                        '& .RaMenuItemCategory-container': {
                            color: 'white',
                        },
                        '& .RaMenuItemCategory-active': {
                            color: 'cardBackground',
                            backgroundColor: grey[800],
                        },
                        '& .RaMenuItemCategory-popoverPaper': {
                            backgroundColor: cardBackground,
                        },
                    },
                },
            },
            RaTopToolbar: {
                styleOverrides: {
                    root: {
                        alignItems: 'center',
                        paddingTop: 0,
                        minHeight: 'auto',
                    },
                },
            },
            RaListToolbar: {
                styleOverrides: {
                    root: {
                        alignItems: 'center',
                        paddingTop: 0,
                        '& .RaListToolbar-actions': {
                            alignItems: 'center',
                            paddingTop: 0,
                            minHeight: 'auto',
                        },
                        '& .RaListToolbar-toolbar': {
                            minHeight: 'auto',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderColor: cardBackground,
                        backgroundColor: cardBackground,
                    },
                },
            },
        },
    };
};

const lightPalette = createPalette({
    mode: 'light',
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
        default: '#f2f2f2',
    },
});

export const getLightTheme = (theme: Theme): ThemeOptions => {
    return {
        palette: lightPalette,
        shape: {
            borderRadius,
        },
        components: {
            shape: {
                borderRadius,
            },
            RaAppBar: {
                styleOverrides: {
                    root: {
                        '& .RaAppBar-menuButton': {
                            // Since sub-<Menu /> hide labels when sidebar is closed
                            // We need to disallow sidebar closing on desktop (hiding button is simpler)
                            display: 'block',
                            [theme.breakpoints.up('md')]: {
                                display: 'none',
                            },
                        },
                    },
                },
            },
            RaSearchInput: {
                styleOverrides: {
                    root: {
                        color: lightPalette.text.primary,
                        backgroundColor: alpha(lightPalette.common.black, 0.04),
                        '&:hover': {
                            backgroundColor: alpha(
                                lightPalette.common.black,
                                0.13
                            ),
                        },
                        '&:focus': {
                            backgroundColor: alpha(
                                lightPalette.common.black,
                                0.13
                            ),
                        },
                        '&:focus-within': {
                            backgroundColor: alpha(
                                lightPalette.common.black,
                                0.13
                            ),
                        },
                        '& .RaSearchInput-inputBase': {
                            borderRadius,
                            background: alpha(lightPalette.common.black, 0.04),
                            '&:hover': {
                                background: alpha(
                                    lightPalette.common.black,
                                    0.1
                                ),
                            },
                        },
                        '& .RaSearchInput-inputAdornmentStart': {
                            color: alpha('#000000', 0.38),
                        },
                    },
                },
            },
            RaMenuItemLink: {
                styleOverrides: {
                    root: {
                        borderLeft: '3px solid #fff',
                        '& .RaMenuItemLink-active': {
                            borderLeft: '3px solid #808080',
                        },
                    },
                },
            },
            RaMenuItemCategory: {
                styleOverrides: {
                    root: {
                        '& .RaMenuItemCategory-container': {
                            color: '#808080',
                            '&:hover': {
                                color: 'black',
                                backgroundColor: grey[200],
                            },
                        },
                        '& .RaMenuItemCategory-popoverPaper': {
                            boxShadow: theme.shadows[2],
                            backgroundColor: lightPalette.background.paper,
                        },
                    },
                },
            },
            RaMenuItem: {
                styleOverrides: {
                    root: {
                        color: '#808080',
                    },
                },
            },
            RaMultiLevelMenu: {
                styleOverrides: {
                    root: {
                        '& .RaMultiLevelMenu-navWithCategories': {
                            backgroundColor: '#fff',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    elevation1: {
                        boxShadow: 'none',
                    },
                    root: {
                        border: '1px solid #e0e0e3',
                        backgroundClip: 'padding-box',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    contained: {
                        backgroundColor: '#fff',
                        color: '#4f3cc9',
                        boxShadow: 'none',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    // Hide MenuItemCategory shadow behind the appbar
                    root: { zIndex: 9999 },
                    colorSecondary: {
                        color: '#808080',
                        backgroundColor: '#fff',
                    },
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: '#f5f5f5',
                    },
                    barColorPrimary: {
                        backgroundColor: '#d7d7d7',
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        '&$disabled': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    },
                },
            },
            RaSidebar: {
                styleOverrides: {
                    root: {
                        '& .RaSidebar-drawerPaper': {
                            paddingRight: 16,
                            [theme.breakpoints.up('md')]: {
                                width: 64,
                            },
                        },
                        '& .RaSidebar-fixed': {
                            zIndex: 1200,
                        },
                        '&.MuiDrawer-docked .MuiPaper-root': {
                            width: '96px',
                        },
                        '& .MuiPaper-root': {
                            width: 'auto',
                        },
                    },
                },
            },
            RaLinkedData: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: '#ddd',
                        },
                    },
                },
            },
            RaTopToolbar: {
                styleOverrides: {
                    root: {
                        alignItems: 'center',
                        paddingTop: 0,
                        minHeight: 'auto',
                    },
                },
            },
            RaListToolbar: {
                styleOverrides: {
                    root: {
                        alignItems: 'center',
                        paddingTop: 0,
                        '& .RaListToolbar-actions': {
                            alignItems: 'center',
                            minHeight: 'auto',
                            paddingTop: 0,
                        },
                        '& .RaListToolbar-toolbar': {
                            minHeight: 'auto',
                        },
                    },
                },
            },
        },
    };
};
