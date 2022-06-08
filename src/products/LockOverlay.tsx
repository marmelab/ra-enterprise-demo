import * as React from 'react';
import { useTranslate } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

export const LockOverlay = ({ lock, ...rest }: any) => {
    const translate = useTranslate();

    return (
        <Box
            sx={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.9)',
                position: 'absolute',
                textAlign: 'center',
                color: 'common.white',
                padding: '25% 0',
            }}
            {...rest}
        >
            <LockIcon />
            <Box
                sx={{
                    paddingTop: '1em',
                }}
            >
                <Typography variant="body1" color="inherit">
                    {translate('resources.locks.overlay', {
                        name: lock.identity,
                    })}
                </Typography>
            </Box>
        </Box>
    );
};
