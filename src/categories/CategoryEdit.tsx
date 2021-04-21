import React, { FC, ReactElement } from 'react';
import {
    Edit,
    EditProps,
    ListContextProvider,
    TextInput,
    TitleProps,
    useGetList,
    useTranslate,
} from 'react-admin';
import { SimpleForm } from '@react-admin/ra-tree';

import { ProductListView } from '../products/ProductList';
import { Typography, makeStyles } from '@material-ui/core';
import { useAppLocationState } from '@react-admin/ra-navigation';

const CategoryEdit: FC<EditProps> = props => {
    const translate = useTranslate();
    const classes = useStyles();

    return (
        <>
            <Edit title={<CategoryTitle />} {...props}>
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

const CategoryTitle = (props: TitleProps): ReactElement => {
    const [, setLocation] = useAppLocationState();

    if (props.record?.id.toString() == '5') {
        setLocation('catalog.categories');
    } else {
        setLocation('catalog.categories.edit', props);
    }
    return <span>{props.record?.name}</span>;
};

const CategoryEditAside = (props: EditProps): ReactElement => {
    const { id } = props;

    const { data, ids, total, loaded } = useGetList(
        'products',
        { page: 1, perPage: 25 },
        { field: 'reference', order: 'ASC' },
        { category_id: id }
    );
    return (
        <ListContextProvider
            value={{
                data,
                ids,
                total,
                loaded,
                resource: 'products',
                filterValues: {},
                showFilter: (): void => undefined,
                hideFilter: (): void => undefined,
                setSort: (): void => undefined,
                currentSort: { field: 'reference', order: 'ASC' },
                page: 1,
                perPage: 25,
            }}
        >
            <ProductListView isSmall={false} aside={false} actions={false} />
        </ListContextProvider>
    );
};

export default CategoryEdit;

const useStyles = makeStyles(theme => ({
    subtitle: {
        marginTop: theme.spacing(6),
    },
}));
