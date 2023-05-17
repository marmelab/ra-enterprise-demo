import * as React from 'react';
import { useContext } from 'react';
import {
    AppBar,
    LocalesMenuButton,
    Logout,
    ToggleThemeButton,
    UserMenu,
} from 'react-admin';
import { Link } from 'react-router-dom';
import {
    Badge,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    Theme,
} from '@mui/material';
import TourIcon from '@mui/icons-material/Flag';
import { ThemesContext } from '@react-admin/ra-enterprise';

import Search from './Search';
import Logo from './Logo';
import { useTourStates } from '../tours/useTourState';

const CustomUserMenu = () => (
    <UserMenu>
        <Logout />
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    const isMediumAndUp = useMediaQuery<Theme>(theme =>
        theme.breakpoints.up('md')
    );
    const isLargeAndUp = useMediaQuery<Theme>(theme =>
        theme.breakpoints.up('lg')
    );
    const { darkTheme, lightTheme } = useContext(ThemesContext);

    return (
        <AppBar
            {...props}
            color="secondary"
            elevation={1}
            userMenu={<CustomUserMenu />}
        >
            {isMediumAndUp && (
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Logo />
                </Link>
            )}

            <Typography
                variant="h6"
                color="inherit"
                sx={{
                    flex: 1,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
                id="react-admin-title"
            />
            <Box component="span" sx={{ flex: 1 }} />
            {isMediumAndUp && (
                <>
                    <Search />
                    <Box component="span" sx={{ flex: '0 0 2rem' }} />
                </>
            )}
            {isLargeAndUp ? (
                <>
                    <Tours />
                    <ToggleThemeButton
                        darkTheme={darkTheme}
                        lightTheme={lightTheme}
                    />
                    <LocalesMenuButton languages={languages} />
                    <Box component="span" sx={{ flex: '0 0 2rem' }} />
                </>
            ) : null}
        </AppBar>
    );
};

const languages = [
    { locale: 'en', name: 'English' },
    { locale: 'fr', name: 'Français' },
];

export default CustomAppBar;

const Tours = () => {
    const [tourStates] = useTourStates();
    let numberOfTours = 0;
    if (tourStates) {
        numberOfTours = Object.keys(tourStates).reduce((acc, tourId) => {
            if (!tourStates[tourId]) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }

    return (
        <IconButton
            aria-label="Tours"
            to="/tours"
            component={Link}
            color="inherit"
        >
            <Badge badgeContent={numberOfTours} color="error" variant="dot">
                <TourIcon />
            </Badge>
        </IconButton>
    );
};
