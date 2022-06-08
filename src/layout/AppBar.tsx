import * as React from 'react';
import { useContext } from 'react';
import {
    AppBar,
    LocalesMenuButton,
    Logout,
    ToggleThemeButton,
    UserMenu,
    useTranslate,
} from 'react-admin';
import { Link } from 'react-router-dom';
import {
    Badge,
    Box,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    Theme,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import TourIcon from '@mui/icons-material/Flag';
import { ThemesContext } from '@react-admin/ra-enterprise';

import Search from './Search';
import Logo from './Logo';
import { useTourStates } from '../tours/useTourState';

const ConfigurationMenu = React.forwardRef((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItem
            component={Link}
            // @ts-ignore
            ref={ref}
            {...props}
            to="/configuration"
        >
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText>{translate('pos.configuration')}</ListItemText>
        </MenuItem>
    );
});
const CustomUserMenu = () => (
    <UserMenu>
        <ConfigurationMenu />
        <Logout />
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    const isLargeEnough = useMediaQuery<Theme>(theme =>
        theme.breakpoints.up('md')
    );
    const { darkTheme, lightTheme } = useContext(ThemesContext);

    return (
        <AppBar
            {...props}
            color="secondary"
            elevation={1}
            userMenu={<CustomUserMenu />}
        >
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
            {isLargeEnough ? (
                <>
                    <Logo />
                    <Box component="span" sx={{ flex: 1 }} />
                    <Search />
                    <Tours />
                    <ToggleThemeButton
                        darkTheme={darkTheme}
                        lightTheme={lightTheme}
                    />
                    <LocalesMenuButton languages={languages} />
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
