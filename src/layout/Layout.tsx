import * as React from 'react';
import { SolarLayout, SolarLayoutProps } from '@react-admin/ra-navigation';
import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    useStore,
    useRedirect,
    useDataProvider,
    useRefresh,
} from 'react-admin';

import { TourProvider } from '@react-admin/ra-tour';
import AppBar from './AppBar';
import { Menu } from './Menu';
import CustomBreadcrumb from './Breadcrumb';
import tours from '../tours/tours';

const RA_TOUR_PREFERENCE_KEY = '@react-admin/ra-tour';

const Layout = (props: SolarLayoutProps) => {
    const [tourPreferences, setTourPreferences] = useStore(
        RA_TOUR_PREFERENCE_KEY
    );
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const refresh = useRefresh();

    return (
        <TourProvider
            initialState={tourPreferences}
            tours={tours}
            tools={{
                redirect,
                refresh,
                dataProvider,
                queryClient,
                setTourPreferences,
            }}
        >
            <>
                <ReactQueryDevtools initialIsOpen={false} />
                <SolarLayout {...props} menu={Menu} appBar={AppBar}>
                    <CustomBreadcrumb />
                    {props.children}
                </SolarLayout>
            </>
        </TourProvider>
    );
};

export default Layout;
