import React, { FC } from 'react';
import { Layout } from '@react-admin/ra-enterprise';

import AppBar from './AppBar';
import Menu from './Menu';
import Breadcrumb from './Breadcrumb';

import tours from '../tours/tours';

const CustomLayout: FC = props => {
    return (
        <Layout
            {...props}
            appBar={AppBar}
            menu={Menu}
            breadcrumb={Breadcrumb}
            tours={tours}
        />
    );
};

export default CustomLayout;
