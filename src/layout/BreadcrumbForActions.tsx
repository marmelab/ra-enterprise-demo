import * as React from 'react';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    BreadcrumbForActions,
    BreadcrumbItem,
    BreadcrumbProps,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';
import { linkToRecord, useTranslate, Record } from 'react-admin';

const CustomBreadcrumbForActions: FC<BreadcrumbProps> = props => {
    const classes = useStyles();
    const translate = useTranslate();

    const editLabel = translate('ra.action.edit');
    const createLabel = translate('ra.action.create');
    return (
        <BreadcrumbForActions className={classes.root} {...props}>
            <ResourceBreadcrumbItems resources={['stores', 'tours']} />
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
                        label={({ record }: { record?: Record }): string =>
                            `${editLabel} ${
                                record ? `"${record.reference}"` : '...'
                            }`
                        }
                        to={({ record }: { record?: Record }): string =>
                            record
                                ? `${linkToRecord('/products', record.id)}/edit`
                                : ''
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
                to="/reviews?filter={}"
            >
                <BreadcrumbItem
                    name="status_filter"
                    label={({ status }): string =>
                        `${translate('pos.filter')} status "${translate(
                            `pos.reviews.${status}`
                        )}"`
                    }
                />
            </BreadcrumbItem>
            <BreadcrumbItem name="sales" label={translate('pos.menu.sales', 1)}>
                <BreadcrumbItem
                    name="commands"
                    label={translate('resources.commands.name', 2)}
                    to="/commands"
                >
                    <BreadcrumbItem
                        name="edit"
                        label={({ record }: { record?: Record }): string =>
                            `${editLabel} ${
                                record ? `"${record.reference}"` : '...'
                            }`
                        }
                        to={({ record }: { record?: Record }): string =>
                            record
                                ? `${linkToRecord('/products', record.id)}/edit`
                                : ''
                        }
                    />
                </BreadcrumbItem>
                <BreadcrumbItem
                    name="invoices"
                    label={translate('resources.invoices.name', 2)}
                    to="/invoices"
                >
                    <BreadcrumbItem
                        name="edit"
                        label={({ record }: { record?: Record }): string =>
                            `${editLabel} ${
                                record ? `"${record.reference}"` : '...'
                            }`
                        }
                    />
                </BreadcrumbItem>
            </BreadcrumbItem>

            <BreadcrumbItem
                name="customers"
                label={translate('resources.customers.name', 2)}
                to="/customers"
            >
                <BreadcrumbItem
                    name="edit"
                    label={({ record }: { record?: Record }): string =>
                        `${editLabel} ${
                            record
                                ? `"${record.first_name} ${record.last_name}"`
                                : '...'
                        }`
                    }
                    to={({ record }: { record?: Record }): string =>
                        record
                            ? `${linkToRecord('/customers', record.id)}/edit`
                            : ''
                    }
                />
                <BreadcrumbItem
                    name="create"
                    label={createLabel}
                    to="/customers/create"
                />
                <BreadcrumbItem
                    name="segments"
                    label={translate('resources.segments.name', 2)}
                />
            </BreadcrumbItem>
        </BreadcrumbForActions>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(0),
        alignItems: 'center',
        fontSize: 'small',
        // Display the Breadcrumb over the custom Layout of some pages by adding a zIndex and a maxWidth
        // @see "src/products/ProductList.tsx" or "src/visitors/VisitorList.tsx"
        maxWidth: '700px',
        zIndex: 1,
        '& a': {
            pointerEvents: 'visible',
        },
    },
}));

export default CustomBreadcrumbForActions;
