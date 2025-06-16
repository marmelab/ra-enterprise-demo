import { alpha, Theme, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import merge from 'lodash/merge';

const defaultThemeInvariants = {
    MuiAutocomplete: {
        defaultProps: {
            fullWidth: true,
        },
        variants: [
            {
                props: {},
                style: ({ theme }: { theme: Theme }) => ({
                    [theme.breakpoints.down('sm')]: { width: '100%' },
                }),
            },
        ],
    },
    MuiTextField: {
        defaultProps: {
            variant: 'filled' as const,
            margin: 'dense' as const,
            size: 'small' as const,
            fullWidth: true,
        },
        variants: [
            {
                props: {},
                style: ({ theme }: { theme: Theme }) => ({
                    [theme.breakpoints.down('sm')]: { width: '100%' },
                }),
            },
        ],
    },
    MuiFormControl: {
        defaultProps: {
            variant: 'filled' as const,
            margin: 'dense' as const,
            size: 'small' as const,
            fullWidth: true,
        },
    },
    RaSimpleFormIterator: {
        defaultProps: {
            fullWidth: true,
        },
    },
    RaTranslatableInputs: {
        defaultProps: {
            fullWidth: true,
        },
    },
};

const darkColorScheme = {
    palette: {
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
    },
} as const;

const defaultDarkTheme = createTheme(darkColorScheme);

const darkComponentsOverrides = {
    ...defaultThemeInvariants,
    RaLayout: {
        styleOverrides: {
            root: {
                '& .RaLayout-content': {
                    padding: `${defaultDarkTheme.spacing(1)}`,
                    [defaultDarkTheme.breakpoints.up('md')]: {
                        padding: `${defaultDarkTheme.spacing(2)}`,
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
                backgroundColor: defaultDarkTheme.palette.background.paper,
                color: '#fff',
                '& .RaAppBar-menuButton': {
                    // Since sub-<Menu /> hide labels when sidebar is closed
                    // We need to disallow sidebar closing on desktop (hiding button is simpler)
                    display: 'block',
                    [defaultDarkTheme.breakpoints.up('md')]: {
                        display: 'none',
                    },
                },
            },
        },
    },
    RaSearchInput: {
        styleOverrides: {
            root: {
                color: defaultDarkTheme.palette.common.white,
                backgroundColor: alpha(
                    defaultDarkTheme.palette.common.black,
                    0.04
                ),
                '&:hover': {
                    backgroundColor: alpha(
                        defaultDarkTheme.palette.common.black,
                        0.13
                    ),
                },
                '&:focus': {
                    backgroundColor: alpha(
                        defaultDarkTheme.palette.common.black,
                        0.13
                    ),
                },
                '&:focus-within': {
                    backgroundColor: alpha(
                        defaultDarkTheme.palette.common.black,
                        0.13
                    ),
                },
                '& .RaSearchInput-inputBase': {
                    background: alpha(
                        defaultDarkTheme.palette.common.black,
                        0.04
                    ),
                    '&:hover': {
                        background: alpha(
                            defaultDarkTheme.palette.common.black,
                            0.1
                        ),
                    },
                },
                '& .RaSearchInput-inputAdornmentStart': {
                    color: defaultDarkTheme.palette.common.white,
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                border: 'none',
                background: darkColorScheme.palette!.background!.paper,
            },
        },
    },
};

const lightPalette = {
    palette: {
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
    },
} as const;

const defaultLightTheme = createTheme(lightPalette);

const lightComponentsOverrides = {
    ...defaultThemeInvariants,
    RaLayout: {
        styleOverrides: {
            root: {
                '& .RaLayout-content': {
                    padding: `${defaultLightTheme.spacing(1)}`,
                    [defaultLightTheme.breakpoints.up('md')]: {
                        padding: `${defaultLightTheme.spacing(2)}`,
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
                    [defaultLightTheme.breakpoints.up('md')]: {
                        display: 'none',
                    },
                },
            },
        },
    },
    RaSearchInput: {
        styleOverrides: {
            root: {
                color: defaultLightTheme.palette.text.primary,
                backgroundColor: alpha(
                    defaultLightTheme.palette.common.black,
                    0.04
                ),
                '&:hover': {
                    backgroundColor: alpha(
                        defaultLightTheme.palette.common.black,
                        0.13
                    ),
                },
                '&:focus': {
                    backgroundColor: alpha(
                        defaultLightTheme.palette.common.black,
                        0.13
                    ),
                },
                '&:focus-within': {
                    backgroundColor: alpha(
                        defaultLightTheme.palette.common.black,
                        0.13
                    ),
                },
                '& .RaSearchInput-inputBase': {
                    borderRadius: 10,
                    background: alpha(
                        defaultLightTheme.palette.common.black,
                        0.04
                    ),
                    '&:hover': {
                        background: alpha(
                            defaultLightTheme.palette.common.black,
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
                    boxShadow: defaultLightTheme.shadows[2],
                    backgroundColor: defaultLightTheme.palette.background.paper,
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
};

export const softLightTheme = merge({
    palette: lightPalette.palette,
    shape: {
        borderRadius: 10,
    },
    components: lightComponentsOverrides,
});
export const softDarkTheme = merge({
    palette: darkColorScheme.palette,
    shape: {
        borderRadius: 10,
    },
    components: darkComponentsOverrides,
});
