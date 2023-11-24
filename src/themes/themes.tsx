import {
    RaThemeOptions,
    defaultLightTheme,
    defaultDarkTheme,
    nanoDarkTheme,
    nanoLightTheme,
    radiantDarkTheme,
    radiantLightTheme,
    houseDarkTheme,
    houseLightTheme,
    defaultTheme,
} from 'react-admin';
import { createTheme } from '@mui/material';
import { getThemes } from './../layout/themes';

export type ThemeName = 'soft' | 'default' | 'nano' | 'radiant' | 'house';

export interface Theme {
    name: ThemeName;
    light: RaThemeOptions;
    dark: RaThemeOptions;
}

const mySoftTheme = createTheme(defaultTheme);
const { darkTheme: softDarkTheme, lightTheme: softLightTheme } =
    getThemes(mySoftTheme);

export const themes: Theme[] = [
    { name: 'soft', light: softLightTheme, dark: softDarkTheme },
    { name: 'default', light: defaultLightTheme, dark: defaultDarkTheme },
    { name: 'nano', light: nanoLightTheme, dark: nanoDarkTheme },
    { name: 'radiant', light: radiantLightTheme, dark: radiantDarkTheme },
    { name: 'house', light: houseLightTheme, dark: houseDarkTheme },
];
