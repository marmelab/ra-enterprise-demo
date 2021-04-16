import React, { FC } from 'react';
import { AppBar, useQuery } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import TourIcon from '@material-ui/icons/Flag';
import { Link } from 'react-router-dom';
import {
    ToggleThemeButton,
    LanguageSwitcher,
} from '@react-admin/ra-preferences';

import { Search } from './index';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
    appBarContent: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
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

    const { data } = useQuery({
        type: 'getList',
        resource: 'tours',
        payload: { filter: { playedOn: null } },
    });

    let numberOfTours = 0;
    if (data) {
        numberOfTours = data.length;
    }

    return (
        <AppBar {...props} elevation={1} logout={undefined}>
            <div className={classes.appBarContent}>
                <Logo className={classes.logo} />
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                    id="react-admin-title"
                />
                <Search />
                <IconButton to="/tours" component={Link} color="inherit">
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
            </div>
        </AppBar>
    );
};

export default CustomAppBar;
