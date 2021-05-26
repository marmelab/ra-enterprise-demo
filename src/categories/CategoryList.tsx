import React from 'react';
import { ListProps } from 'react-admin';
import { TreeWithDetails } from '@react-admin/ra-tree';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';
import CustomBreadcrumb from '../layout/Breadcrumb';

const CategoryList = (props: ListProps) => {
    useDefineAppLocation('catalog.categories');

    return (
        <>
            <CustomBreadcrumb />
            <TreeWithDetails
                create={CategoryCreate}
                edit={CategoryEdit}
                titleField="name"
                draggable
                allowMultipleRoots
                hideRootNodes
                {...props}
            />
        </>
    );
};

export default CategoryList;
