import React, { FC, ReactElement } from 'react';
import { useTranslate } from 'ra-core';
import {
    TopToolbar,
    CreateButton,
    ExportButton,
    SortButton,
    EditProps,
} from 'ra-ui-materialui';
import { Edit, TextInput } from 'react-admin';
import { SimpleForm } from '@react-admin/ra-tree';

import ProductList from '../products/ProductList';
import { Typography, makeStyles } from '@material-ui/core';

const CategoryEdit: FC<EditProps> = props => {
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

const CategoryEditAside = ({ id, ...rest }: EditProps): ReactElement => (
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
        exporter={false}
        aside={undefined}
        actions={<ProductListActions />}
    />
);

const ProductListActions = (): ReactElement => (
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
