import React from 'react';
import {
    Layout,
    Sidebar,
    useNotify,
    useRedirect,
    useDataProvider,
} from 'react-admin';

import { AppLocationContext } from '@react-admin/ra-navigation';
import {
    SidebarOpenPreferenceSync,
    usePreferences,
} from '@react-admin/ra-preferences';

import AppBar from './AppBar';
import Menu from './Menu';
import Breadcrumb from './Breadcrumb';

import { TourProvider } from '@react-admin/ra-tour';

import tours from '../tours/tours';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

const CustomLayout = (props: any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const [tourPreferences, setTourPreferences] = usePreferences('tour');
    const dataProvider = useDataProvider();

    return (
        <AppLocationContext>
            <TourProvider
                tours={tours}
                tools={{ notify, redirect, setTourPreferences, dataProvider }}
                initialState={tourPreferences}
            >
                <>
                    <SidebarOpenPreferenceSync />
                    <Layout
                        {...props}
                        appBar={AppBar}
                        sidebar={CustomSidebar}
                        menu={Menu}
                    >
                        <Breadcrumb {...props} />
                        {props.children}
                    </Layout>
                </>
            </TourProvider>
        </AppLocationContext>
    );
};

export default CustomLayout;
