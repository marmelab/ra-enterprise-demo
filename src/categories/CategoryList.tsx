import * as React from 'react';
import { TreeWithDetails } from '@react-admin/ra-tree';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { useMediaQuery, Theme } from '@mui/material';

import CategoryCreate from './CategoryCreate';
import CategoryEdit from './CategoryEdit';

const CategoryList = () => {
    useDefineAppLocation('catalog.categories');
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <TreeWithDetails
            create={CategoryCreate}
            edit={CategoryEdit}
            titleField="name"
            draggable
            allowMultipleRoots
            hideRootNodes
            sx={{
                marginTop: isSmall ? undefined : 0,
                '& .edit-page': { marginTop: isSmall ? undefined : -4 },
            }}
        />
    );
};

export default CategoryList;
