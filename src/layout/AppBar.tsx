import React from 'react';
import { AppBar, useQuery, useVersion } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';

import {
    ToggleThemeButton,
    LanguageSwitcher,
} from '@react-admin/ra-preferences';

import TourIcon from '@material-ui/icons/Flag';

import Logo from './Logo';

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
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
    },
}));

const CustomAppBar = (props: any) => {
    const classes = useStyles();

    const version = useVersion();
    const { data } = useQuery(
        {
            type: 'getList',
            resource: 'tours',
            payload: { filter: { playedOn: null } },
        },
        {
            version,
        }
    );

    let numberOfTours = 0;
    if (data) {
        numberOfTours = data.length;
    }

    return (
        <AppBar {...props} elevation={1}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Logo className={classes.logo} />
            <IconButton to="/tours" component={Link} color="inherit">
                <Badge badgeContent={numberOfTours} color="error" variant="dot">
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
        </AppBar>
    );
};

export default CustomAppBar;
