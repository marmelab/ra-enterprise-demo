import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { Box, BoxProps, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
    return (
        <Link
            component={RouterLink}
            to={to}
            sx={{
                color: 'inherit',
                '&:hover': {
                    textDecoration: 'none',
                },
            }}
        >
            <Box
                component="li"
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                flexDirection="column"
                sx={{
                    borderRadius: '3px',
                    pr: 2,
                    '&:hover': {
                        backgroundColor: 'background.default',
                    },
                }}
                {...rest}
            >
                <Box display="flex" alignItems="flex-start">
                    <Box mr={0.5}>{icon}</Box>
                    <Typography component="span" variant="body2">
                        {children}
                    </Typography>
                </Box>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Link>
    );
};
