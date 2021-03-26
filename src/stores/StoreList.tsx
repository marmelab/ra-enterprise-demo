import React, { FC } from 'react';
import {
    DateField,
    DateInput,
    TextField,
    TextInput,
    ListProps,
} from 'react-admin';

import { List, ListActions } from '@react-admin/ra-enterprise';
import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid';
import CustomBreadcrumbForActions from '../layout/BreadcrumbForActions';

const StoreForm: FC = props => (
    <RowForm {...props}>
        <TextField source="id" />
        {/* eslint-disable-next-line */}
        <TextInput source="city" autoFocus />
        <TextInput source="country" />
        <TextInput source="address" />
        <DateInput source="created_at" />
    </RowForm>
);

const StoreListActions: FC = props => (
    <ListActions {...props} breadcrumb={<CustomBreadcrumbForActions />} />
);

export const StoreList: FC<ListProps> = props => (
    <List
        {...props}
        actions={<StoreListActions />}
        hasCreate
        empty={false}
        perPage={25}
    >
        <EditableDatagrid
            data-testid="store-datagrid"
            rowClick="edit"
            createForm={<StoreForm />}
            editForm={<StoreForm />}
        >
            <TextField source="id" />
            <TextField source="city" />
            <TextField source="country" />
            <TextField source="address" />
            <DateField source="created_at" />
        </EditableDatagrid>
    </List>
);
