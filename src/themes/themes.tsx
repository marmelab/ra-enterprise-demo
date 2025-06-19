import {
    bwDarkTheme,
    bwLightTheme,
    defaultLightTheme,
    defaultDarkTheme,
    nanoDarkTheme,
    nanoLightTheme,
    radiantDarkTheme,
    radiantLightTheme,
    houseDarkTheme,
    houseLightTheme,
    RaThemeOptions,
} from 'react-admin';
import { softDarkTheme, softLightTheme } from './../layout/themes';

export type ThemeName =
    | 'soft'
    | 'B&W'
    | 'default'
    | 'nano'
    | 'radiant'
    | 'house';

export interface Theme {
    name: ThemeName;
    light: RaThemeOptions;
    dark: RaThemeOptions;
}

export const themes: Theme[] = [
    { name: 'soft', light: softLightTheme, dark: softDarkTheme },
    { name: 'B&W', light: bwLightTheme, dark: bwDarkTheme },
    { name: 'default', light: defaultLightTheme, dark: defaultDarkTheme },
    { name: 'nano', light: nanoLightTheme, dark: nanoDarkTheme },
    { name: 'radiant', light: radiantLightTheme, dark: radiantDarkTheme },
    { name: 'house', light: houseLightTheme, dark: houseDarkTheme },
];
