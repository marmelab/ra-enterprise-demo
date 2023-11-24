import * as React from 'react';
import { useEffect } from 'react';
import {
    CustomRoutes,
    mergeTranslations,
    Resource,
    useStore,
    StoreContextProvider,
    localStorageStore,
} from 'react-admin';
import { Admin, buildI18nProvider } from '@react-admin/ra-enterprise';
import { addEventsForMutations } from '@react-admin/ra-audit-log';
import CssBaseline from '@mui/material/CssBaseline';
import {
    raTreeLanguageEnglish,
    raTreeLanguageFrench,
} from '@react-admin/ra-tree';
import {
    raTourLanguageEnglish,
    raTourLanguageFrench,
} from '@react-admin/ra-tour';
import { Route } from 'react-router';

import fakeServer from './fakeServer';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';
import stores from './stores';
import visits from './visits';
import Configuration from './configuration/Configuration';
import Segments from './segments/Segments';
import { EventList } from './EventList';
import { ThemeName, themes } from './themes/themes';

const messages = {
    en: mergeTranslations(
        englishMessages,
        raTreeLanguageEnglish,
        raTourLanguageEnglish
    ),
    fr: mergeTranslations(
        frenchMessages,
        raTreeLanguageFrench,
        raTourLanguageFrench
    ),
};

const i18nProvider = buildI18nProvider(messages, 'en', [
    { locale: 'en', name: 'English' },
    { locale: 'fr', name: 'Français' },
]);

const enhancedDataProvider = addEventsForMutations(dataProvider, authProvider);

const TourList = React.lazy(() =>
    import('./tours/TourList').then(module => ({
        default: module.default,
    }))
);
const TourLauncher = React.lazy(() =>
    import('./tours/TourLauncher').then(module => ({
        default: module.default,
    }))
);

const store = localStorageStore(undefined, 'EECommerce');

const App = () => {
    useEffect(() => {
        const restoreFetch = fakeServer();
        return (): void => {
            restoreFetch();
        };
    }, []);
    const [themeName] = useStore<ThemeName>('themeName', 'soft');
    const lightTheme = themes.find(theme => theme.name === themeName)?.light;
    const darkTheme = themes.find(theme => theme.name === themeName)?.dark;

    return (
        <Admin
            title=""
            store={store}
            dataProvider={enhancedDataProvider}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
            lightTheme={lightTheme}
            darkTheme={darkTheme}
        >
            <CssBaseline />
            <CustomRoutes>
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/segments" element={<Segments />} />
                <Route key="tours" path="/tours" element={<TourList />} />
                <Route path="/tours/:tour" element={<TourLauncher />} />
            </CustomRoutes>
            <Resource name="customers" {...visitors} />
            <Resource name="commands" {...orders} />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} />
            <Resource name="stores" {...stores} />
            <Resource name="visits" {...visits} />
            <Resource name="locks" />
            <Resource name="events" list={EventList} />
        </Admin>
    );
};

const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);

export default AppWrapper;
