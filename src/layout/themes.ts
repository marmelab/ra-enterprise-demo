import {
    buildThemeFromTypeMethod,
    ThemeOptions,
} from '@react-admin/ra-enterprise';
import { alpha, Theme } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';
import { grey } from '@mui/material/colors';

const borderRadius = 10;
const lightPalette = createPalette({
    mode: 'light',
    primary: {
        dark: '#2e3e54',
        main: '#495e84',
        light: '#698baf',
        contrastText: '#fff',
    },
    secondary: {
        dark: '#7d6327',
        main: '#b48e38',
        light: '#c3a45f',
        contrastText: '#fff',
    },
    background: {
        paper: '#ffffff',
        default: '#fafafa',
    },
});
const darkPalette = createPalette({
    mode: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
        dark: '#495e84',
        main: '#698baf',
        light: '#7ba8c9',
        contrastText: '#fff',
    },
    secondary: {
        dark: '#7d6327',
        main: '#b48e38',
        light: '#c3a45f',
        contrastText: '#fff',
    },
    background: {
        paper: '#202020',
        default: '#161616',
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
    return {
        palette: darkPalette,
        shape: {
            borderRadius,
        },
        components: {
            RaLayout: {
                styleOverrides: {
                    root: {
                        '& .RaLayout-content': {
                            padding: `${theme.spacing(1)}`,
                            [theme.breakpoints.up('md')]: {
                                padding: `${theme.spacing(2)}`,
                            },
                        },
                    },
                },
            },
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
                        backgroundColor: darkPalette.background.paper,
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
            MuiPaper: {
                styleOverrides: {
                    root: {
                        border: 'none',
                        background: darkPalette.background.paper,
                    },
                },
            },
        },
    };
};

export const getLightTheme = (theme: Theme): ThemeOptions => {
    return {
        palette: lightPalette,
        shape: {
            borderRadius,
        },
        components: {
            RaLayout: {
                styleOverrides: {
                    root: {
                        '& .RaLayout-content': {
                            padding: `${theme.spacing(1)}`,
                            [theme.breakpoints.up('md')]: {
                                padding: `${theme.spacing(2)}`,
                            },
                        },
                    },
                },
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
                        '& .RaSidebar-drawerPaper': {},
                        '& .RaSidebar-fixed': {
                            zIndex: 1200,
                            width: 76,
                        },
                        '&.MuiDrawer-docked .MuiPaper-root': {
                            width: 76,
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
        },
    };
};
