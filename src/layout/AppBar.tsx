import React, { FC } from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import TourIcon from '@material-ui/icons/Flag';
import { Link, useLocation } from 'react-router-dom';
import {
    ToggleThemeButton,
    LanguageSwitcher,
} from '@react-admin/ra-preferences';
import { useMediaQuery, Theme } from '@material-ui/core';
import { Search } from './index';
import Logo from './Logo';
import { useTourStates } from '../tours/useTourState';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingLeft: theme.spacing(1),
    },
    logo: {
        padding: theme.spacing(0, 2),
    },
}));

const CustomAppBar: FC = props => {
    const classes = useStyles();
    const location = useLocation<{ pathname: string }>();

    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
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
        <AppBar {...props} elevation={1}>
            {isXSmall ? (
                <>
                    {location.pathname === '/' && (
                        <Logo className={classes.logo} />
                    )}
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                        id="react-admin-title"
                    />
                </>
            ) : (
                <>
                    <Logo className={classes.logo} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                        id="react-admin-title"
                    />
                    <Search />
                    <IconButton
                        aria-label="Tours"
                        to="/tours"
                        component={Link}
                        color="inherit"
                    >
                        <Badge
                            badgeContent={numberOfTours}
                            color="error"
                            variant="dot"
                        >
                            <TourIcon />
                        </Badge>
                    </IconButton>
                    <ToggleThemeButton />
                    <LanguageSwitcher
                        languages={[
                            { locale: 'en', name: 'English' },
                            { locale: 'fr', name: 'Français' },
                        ]}
                        defaultLanguage="English"
                    />
                </>
            )}
        </AppBar>
    );
};

export default CustomAppBar;
