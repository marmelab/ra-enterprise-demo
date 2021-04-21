import React, { FC, useEffect } from 'react';
import { ListProps } from 'react-admin';
import { TreeWithDetails, useTreeController } from '@react-admin/ra-tree';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';
import CustomBreadcrumb from '../layout/Breadcrumb';

const CategoryList: FC<ListProps> = props => {
    // We need to override the "category" location to highlight menu item in the sidebar
    useDefineAppLocation('catalog.categories');

    const { handleExpand } = useTreeController({
        resource: props.resource as string,
        titleField: 'name',
    });

    useEffect(() => {
        handleExpand(['5']);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <CustomBreadcrumb />
            <TreeWithDetails
                create={CategoryCreate}
                edit={CategoryEdit}
                titleField="name"
                draggable
                allowMultipleRoots
                defaultSelectedKeys={['5']}
                {...props}
            />
        </>
    );
};

export default CategoryList;
