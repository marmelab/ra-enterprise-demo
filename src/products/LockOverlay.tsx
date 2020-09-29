import * as React from 'react';
import { FC } from 'react';
import { useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Lock as LockIcon } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

export const LockOverlay: FC<any> = ({ lock, ...rest }) => {
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <div className={classes.root} {...rest}>
            <LockIcon />
            <div className={classes.identity}>
                <Typography variant="body1" color="inherit">
                    {translate('resources.locks.overlay', {
                        name: lock.identity,
                    })}
                </Typography>
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.9)',
        position: 'absolute',
        textAlign: 'center',
        color: theme.palette.common.white,
        padding: '25% 0',
    },
    identity: {
        paddingTop: '1em',
    },
}));
