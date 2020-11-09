import React, { FC } from 'react';
import {
    List,
    ListActions,
    DateField,
    DateInput,
    TextField,
    TextInput,
    ListProps,
} from 'react-admin';

import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid';
import { makeStyles } from '@material-ui/core';

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

const StoreListActions: FC = props => {
    const classes = useListActionsStyles();
    return <ListActions {...props} className={classes.root} />;
};

const useListActionsStyles = makeStyles(theme => ({
    root: {
        paddingBottom: 0,
        paddingTop: theme.spacing(4),
    },
}));

export const StoreList: FC<ListProps> = props => {
    const classes = useStyles();
    return (
        <List
            {...props}
            actions={<StoreListActions />}
            className={classes.root}
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
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: -theme.spacing(7),
    },
}));
