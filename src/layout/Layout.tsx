import React from 'react';
import { AppLocationContext } from '@react-admin/ra-navigation';
import { TourProvider } from '@react-admin/ra-tour';
import { useDispatch } from 'react-redux';

import {
    Layout,
    Sidebar,
    useNotify,
    useRedirect,
    useRefresh,
    useDataProvider,
} from 'react-admin';

import {
    SidebarOpenPreferenceSync,
    usePreferences,
} from '@react-admin/ra-preferences';

import AppBar from './AppBar';
import Menu from './Menu';
import Breadcrumb from './Breadcrumb';

import tours from '../tours/tours';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

const CustomLayout = (props: any) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const [tourPreferences, setTourPreferences] = usePreferences('tour');
    const dataProvider = useDataProvider();
    const dispatch = useDispatch();

    return (
        <AppLocationContext>
            <TourProvider
                tours={tours}
                tools={{
                    notify,
                    redirect,
                    refresh,
                    dataProvider,
                    setTourPreferences,
                    dispatch,
                }}
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
