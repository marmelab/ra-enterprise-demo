import * as React from 'react';
import { Layout, LayoutProps } from '@react-admin/ra-enterprise';
import AppBar from './AppBar';
import Menu from './Menu';
import CustomBreadcrumb from './Breadcrumb';
import tours from '../tours/tours';

export default (props: LayoutProps) => {
    return (
        <Layout
            {...props}
            appBar={AppBar}
            menu={Menu}
            breadcrumb={CustomBreadcrumb}
            tours={tours}
        />
    );
};
