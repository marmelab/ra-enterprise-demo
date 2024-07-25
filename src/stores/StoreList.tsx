import * as React from 'react';
import {
    DateField,
    DateInput,
    List,
    ListActions,
    TextField,
    TextInput,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';
import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const StoreForm = () => (
    <RowForm>
        <TextField source="id" />
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <TextInput id="city" source="city" autoFocus />
        <TextInput id="country" source="country" />
        <TextInput id="address" source="address" />
        <DateInput id="created_at" source="created_at" />
    </RowForm>
);

export const StoreList = () => {
    useDefineAppLocation('stores');
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            actions={<ListActions hasCreate />}
            empty={false}
            perPage={25}
            sx={{ marginTop: isSmall ? undefined : -4 }}
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
};
