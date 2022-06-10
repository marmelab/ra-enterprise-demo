import * as React from 'react';
import { Layout, LayoutProps } from '@react-admin/ra-enterprise';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppBar from './AppBar';
import Menu from './Menu';
import CustomBreadcrumb from './Breadcrumb';
import tours from '../tours/tours';

export default (props: LayoutProps) => {
    return (
        <>
            <ReactQueryDevtools initialIsOpen={false} />
            <Layout
                {...props}
                appBar={AppBar}
                menu={Menu}
                breadcrumb={CustomBreadcrumb}
                tours={tours}
            />
        </>
    );
};
