import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { Box, BoxProps, Typography } from '@material-ui/core';

export const Stats = ({
    children,
    label,
    icon,
    ...rest
}: {
    children: ReactNode;
    label: ReactNode;
    icon: ReactNode;
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
        <Typography variant="caption">{label}</Typography>
    </Box>
);
