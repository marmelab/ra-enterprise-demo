import * as React from 'react';
import { TreeWithDetails } from '@react-admin/ra-tree';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';

const CategoryList = () => {
    useDefineAppLocation('catalog.categories');
    return (
        <TreeWithDetails
            create={CategoryCreate}
            edit={CategoryEdit}
            titleField="name"
            draggable
            allowMultipleRoots
            hideRootNodes
        />
    );
};

export default CategoryList;
