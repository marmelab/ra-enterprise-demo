import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { Box, BoxProps, Link, Typography } from '@material-ui/core';
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
} & BoxProps): ReactElement => (
    <Box
        component="li"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        flexDirection="column"
        {...rest}
    >
        <Box display="flex" alignItems="center" marginBottom={1}>
            <Box marginRight={1}>{icon}</Box>
            <Typography component="span">{children}</Typography>
        </Box>
        <Link component={RouterLink} variant="caption" to={to}>
            {label}
        </Link>
    </Box>
);
