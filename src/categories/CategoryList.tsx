import React, { useEffect } from 'react';
import { TreeWithDetails, useTreeController } from '@react-admin/ra-tree';

import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const CategoryList = (props: any) => {
    // We need to override the "category" location to highlight menu item in the sidebar
    useDefineAppLocation('catalog.categories');

    const { handleExpand } = useTreeController({
        resource: props.resource,
        titleField: 'name',
    });

    useEffect(() => {
        handleExpand(['5']);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TreeWithDetails
            create={CategoryCreate}
            edit={CategoryEdit}
            titleField="name"
            draggable
            allowMultipleRoots
            defaultSelectedKeys={['5']}
            {...props}
        />
    );
};

export default CategoryList;
