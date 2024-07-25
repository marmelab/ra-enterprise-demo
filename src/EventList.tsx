import * as React from 'react';
import { EventList as RaEventList } from '@react-admin/ra-audit-log';
import { useMediaQuery, Theme } from '@mui/material';

export const EventList = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <RaEventList
            authorResource="admins"
            sx={{
                marginTop: isSmall ? undefined : 2,
                '& .RaList-main': { marginTop: isSmall ? undefined : -6 },
            }}
        />
    );
};
