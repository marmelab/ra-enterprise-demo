import React from 'react';
import {
    List,
    DateField,
    DateInput,
    TextField,
    TextInput,
} from 'react-admin';

import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid';

const StoreForm = props => (
    <RowForm {...props}>
        <TextField source="id" />
        <TextInput source="city" />
        <TextInput source="country" />
        <TextInput source="address" />
        <DateInput source="created_at" />
    </RowForm>
)

export const StoreList = (props: any) => (
    <List {...props} perPage={25}>
        <EditableDatagrid editForm={<StoreForm />}>
            <TextField source="id" />
            <TextField source="city" />
            <TextField source="country" />
            <TextField source="address" />
            <DateField source="created_at" />
        </EditableDatagrid>
    </List>
);
