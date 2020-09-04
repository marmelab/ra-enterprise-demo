import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Breadcrumb,
    BreadcrumbItem,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';
import { linkToRecord, useTranslate } from 'ra-core';

const CustomBreadcrumb = props => {
    const classes = useStyles();
    const translate = useTranslate();

    const editLabel = translate('ra.action.edit');
    const createLabel = translate('ra.action.create');
    return (
        <Breadcrumb className={classes.root} {...props}>
            <ResourceBreadcrumbItems
                resources={['invoices', 'stores', 'tours']}
            />
            <BreadcrumbItem
                name="catalog"
                label={translate('pos.menu.catalog', 1)}
            >
                <BreadcrumbItem
                    name="products"
                    label={translate('resources.products.name', 2)}
                    to="/products"
                >
                    <BreadcrumbItem
                        name="edit"
                        label={({ record }) =>
                            `${editLabel} ${
                                record ? `"${record.reference}"` : '...'
                            }`
                        }
                        to={({ record }): string =>
                            record &&
                            `${linkToRecord('/products', record.id)}/edit`
                        }
                    />
                    <BreadcrumbItem
                        name="create"
                        label={createLabel}
                        to="/products/create"
                    />
                </BreadcrumbItem>
                <BreadcrumbItem
                    name="categories"
                    label={translate('resources.categories.name', 2)}
                />
            </BreadcrumbItem>
            <BreadcrumbItem
                name="reviews"
                label={translate('resources.reviews.name', 2)}
                to="/reviews"
            >
                <BreadcrumbItem
                    name="status_filter"
                    label={({ status }) =>
                        `${translate('pos.filter')} status "${translate(
                            `pos.reviews.${status}`
                        )}"`
                    }
                />
            </BreadcrumbItem>
            <BreadcrumbItem
                name="commands"
                label={translate('resources.commands.name', 2)}
                to="/commands"
            >
                <BreadcrumbItem
                    name="edit"
                    label={({ record }) =>
                        `${editLabel} ${
                            record ? `"${record.reference}"` : '...'
                        }`
                    }
                    to={({ record }): string =>
                        record && `${linkToRecord('/products', record.id)}/edit`
                    }
                />
            </BreadcrumbItem>
            <BreadcrumbItem
                name="audience"
                label={translate('pos.menu.audience', 1)}
            >
                <BreadcrumbItem
                    name="customers"
                    label={translate('resources.customers.name', 2)}
                    to="/customers"
                >
                    <BreadcrumbItem
                        name="edit"
                        label={({ record }) =>
                            `${editLabel} ${
                                record
                                    ? `"${record.first_name} ${record.last_name}"`
                                    : '...'
                            }`
                        }
                        to={({ record }): string =>
                            record &&
                            `${linkToRecord('/customers', record.id)}/edit`
                        }
                    />
                    <BreadcrumbItem
                        name="create"
                        label={createLabel}
                        to="/customers/create"
                    />
                </BreadcrumbItem>
                <BreadcrumbItem
                    name="segments"
                    label={translate('resources.segments.name', 2)}
                />
            </BreadcrumbItem>
        </Breadcrumb>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(1),
        fontSize: 'small',
    },
}));

export default CustomBreadcrumb;
