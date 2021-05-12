import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { Box, BoxProps, Link, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(
    (theme: Theme) => ({
        root: {
            borderRadius: '3px',
            padding: 5,
            width: 100,
            '&:hover': {
                backgroundColor: theme.palette.background.default,
            },
        },
        link: {
            color: 'inherit',
            '&:hover': {
                textDecoration: 'none',
            },
        },
    }),
    {
        name: 'RaLinkedData',
    }
);

export const LinkedData = ({
    children,
    label,
    icon,
    to,
    ...rest
}: {
    children: ReactNode;
    label: ReactNode;
    icon: ReactNode;
    to: any;
} & BoxProps): ReactElement => {
    const classes = useStyles();
    return (
        <Link component={RouterLink} to={to} className={classes.link}>
            <Box
                component="li"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                className={classes.root}
                {...rest}
            >
                <Box display="flex" alignItems="center">
                    <Box marginRight={1}>{icon}</Box>
                    <Typography component="span">{children}</Typography>
                </Box>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Link>
    );
};
