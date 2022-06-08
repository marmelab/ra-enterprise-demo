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
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                sx={{
                    borderRadius: '3px',
                    padding: 1,
                    width: 100,
                    '&:hover': {
                        backgroundColor: 'background.default',
                    },
                }}
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
