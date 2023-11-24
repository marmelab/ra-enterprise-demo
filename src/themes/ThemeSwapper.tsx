import React from 'react';
import { useStore, useTranslate } from 'react-admin';
import {
    Box,
    List,
    ListSubheader,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { themes, ThemeName } from './themes';

export const ThemeSwapper = () => {
    const [themeName, setThemeName] = useStore<ThemeName>('themeName', 'soft');
    const handleChange = (_: React.MouseEvent<HTMLElement>, index: number) => {
        const newTheme = themes[index];
        setThemeName(newTheme.name);
    };
    const translate = useTranslate();
    const toggleThemeTitle = translate('pos.theme.change_theme', {
        _: 'Change Theme',
    });

    return (
        <Box sx={{ paddingBottom: 1, paddingLeft: 0 }}>
            <List
                subheader={
                    <ListSubheader sx={{ backgroundColor: 'transparent' }}>
                        {toggleThemeTitle}
                    </ListSubheader>
                }
                component="div"
                disablePadding
                sx={{ width: '100%' }}
            >
                {themes.map((theme, index: number) => (
                    <ListItem
                        disablePadding
                        key={theme.name}
                        secondaryAction={
                            theme.name === themeName ? (
                                <Box
                                    component="div"
                                    sx={{
                                        padding: 1,
                                        marginRight: `-12px`,
                                    }}
                                >
                                    <CheckIcon
                                        sx={{ color: 'text.secondary' }}
                                    />
                                </Box>
                            ) : null
                        }
                        sx={{
                            ':hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                            py: 0,
                            cursor: 'pointer',
                        }}
                    >
                        <ListItemButton
                            onClick={event => handleChange(event, index)}
                            sx={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingRight: 6,
                            }}
                        >
                            <ListItemText primary={ucFirst(theme.name)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
