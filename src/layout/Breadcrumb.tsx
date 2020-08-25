import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Breadcrumb,
    BreadcrumbItem,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';
import { linkToRecord } from 'ra-core';

const CustomBreadcrumb = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Breadcrumb>
                <ResourceBreadcrumbItems
                    resources={[
                        'commands',
                        'customers',
                        'invoices',
                        'reviews',
                        'stores',
                        'tours',
                    ]}
                />
                <BreadcrumbItem name="products" label="Posters" to="/products">
                    <BreadcrumbItem name="categories" label="Categories" />
                    <BreadcrumbItem
                        name="edit"
                        label={({ record }) =>
                            `Edit ${record ? `"${record.reference}"` : '...'}`
                        }
                        to={({ record }): string =>
                            record &&
                            `${linkToRecord('/products', record.id)}/edit`
                        }
                    />
                    <BreadcrumbItem
                        name="create"
                        label="Create"
                        to="/products/create"
                    />
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(1),
        fontSize: 'small',
    },
}));

export default CustomBreadcrumb;
