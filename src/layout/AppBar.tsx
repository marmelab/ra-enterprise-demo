import * as React from 'react';
import { LoadingIndicator } from 'react-admin';
import { SolarAppBar } from '@react-admin/ra-navigation';

import Search from './Search';

const CustomAppBar = () => (
    <SolarAppBar>
        <Search />
        <LoadingIndicator />
    </SolarAppBar>
);

export default CustomAppBar;
