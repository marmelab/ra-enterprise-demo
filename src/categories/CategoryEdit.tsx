import React, { FC } from 'react';
import {
    Identifier,
    useTranslate,
    Edit,
    TextInput,
    ListActionsProps,
    TopToolbar,
    CreateButton,
    ExportButton,
    SortButton,
} from 'react-admin';
import { Typography, makeStyles } from '@material-ui/core';
import { SimpleForm } from '@react-admin/ra-tree';

import ProductList from '../products/ProductList';
import { EditComponentProps, ListComponentProps } from '../types';

const CategoryEdit: FC<EditComponentProps> = props => {
    const translate = useTranslate();
    const classes = useStyles();

    return (
        <>
            <Edit {...props}>
                <SimpleForm>
                    <TextInput source="name" />
                </SimpleForm>
            </Edit>
            <Typography className={classes.subtitle} variant="h5">
                {translate('resources.products.name', { smart_count: 2 })}
            </Typography>
            <CategoryEditAside {...props} />
        </>
    );
};

const CategoryEditAside: FC<ListComponentProps & { id: Identifier }> = ({
    id,
    ...rest
}) => (
    <ProductList
        {...rest}
        title=" "
        basePath="/products"
        resource="products"
        hasCreate
        hasEdit
        hasList={false}
        hasShow={false}
        filter={{ category_id: id }}
        exporter={null}
        aside={false}
        actions={<ProductListActions />}
    />
);

const ProductListActions: FC<ListActionsProps> = () => (
    <TopToolbar>
        <SortButton fields={['reference', 'sales', 'stock']} />
        <CreateButton
            label="resources.categories.actions.create_product"
            basePath="/products"
        />
        <ExportButton />
    </TopToolbar>
);

export default CategoryEdit;

const useStyles = makeStyles(theme => ({
    subtitle: {
        marginTop: theme.spacing(6),
    },
}));
