import React from 'react';

import { Card } from '@material-ui/core';
import {
    Breadcrumb,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';

const CustomBreadcrumb = () => {
    return (
        <Card>
            <Breadcrumb>
                <ResourceBreadcrumbItems />
            </Breadcrumb>
        </Card>
    );
};

export default CustomBreadcrumb;
