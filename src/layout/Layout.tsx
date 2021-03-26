import * as React from 'react';
import { ReactElement } from 'react';
import { Layout } from '@react-admin/ra-enterprise';

import AppBar from './AppBar';
import Menu from './Menu';
import tours from '../tours/tours';

const CustomLayout = (props): ReactElement => {
    return <Layout {...props} appBar={AppBar} menu={Menu} tours={tours} />;
};

export default CustomLayout;
