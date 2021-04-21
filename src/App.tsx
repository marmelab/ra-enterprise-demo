import React, { ReactElement, useEffect } from 'react';
import { Resource } from 'react-admin';

import { Admin, buildI18nProvider } from '@react-admin/ra-enterprise';
import { addEventsForMutations, EventList } from '@react-admin/ra-audit-log';

import './App.css';

import { getThemes } from './layout/themes';
import authProvider from './authProvider';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';

import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';

import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';
import stores from './stores';
import tours from './tours';

import dataProvider from './dataProvider';
import fakeServer from './fakeServer';
import { useTheme } from '@material-ui/core';

const messages = {
    en: englishMessages,
    fr: frenchMessages,
};

const i18nProvider = buildI18nProvider(messages, 'en');

const enhancedDataProvider = addEventsForMutations(dataProvider, authProvider);

const App = (): ReactElement => {
    useEffect(() => {
        const restoreFetch = fakeServer();
        return (): void => {
            restoreFetch();
        };
    }, []);
    const theme = useTheme();
    const { darkTheme, lightTheme } = getThemes(theme);

    return (
        <Admin
            title=""
            dataProvider={enhancedDataProvider}
            customRoutes={customRoutes}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            // Ra-enterprise confirguration
            lightTheme={lightTheme}
            darkTheme={darkTheme}
        >
            <Resource name="customers" {...visitors} />
            <Resource name="commands" {...orders} />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} />
            <Resource name="stores" {...stores} />
            <Resource name="tours" {...tours} />
            <Resource name="locks" />
            <Resource name="events" list={EventList} />
        </Admin>
    );
};

export default App;
