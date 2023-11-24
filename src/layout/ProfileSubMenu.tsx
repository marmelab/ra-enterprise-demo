import * as React from 'react';
import { SolarMenu } from '@react-admin/ra-navigation';
import { ThemeSwapper } from '../themes/ThemeSwapper';
import { useTranslate } from 'react-admin';
import { ListSubheader, useTheme, Typography } from '@mui/material';

export const ProfileSubMenu = () => {
    const translate = useTranslate();
    const toggleThemeTitle = translate('pos.theme.change_language', {
        _: 'Change Language',
    });
    const theme = useTheme();

    return (
        <SolarMenu.List sx={{ mt: 'auto' }}>
            <Typography
                variant="body2"
                component={ListSubheader}
                sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    lineHeight: '48px',
                    marginBottom: `-${theme.spacing(1)}`,
                    backgroundColor: 'transparent',
                }}
            >
                {toggleThemeTitle}
            </Typography>
            <SolarMenu.LocalesItem sx={{ pb: 1 }} />
            <ThemeSwapper />
            <SolarMenu.ToggleThemeItem sx={{ pb: 1 }} />
            <SolarMenu.UserProfileItem sx={{ pb: 1 }} />
        </SolarMenu.List>
    );
};
