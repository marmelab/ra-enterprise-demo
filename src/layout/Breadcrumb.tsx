import * as React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';
import { useCreatePath, useTranslate, RaRecord } from 'react-admin';

const CustomBreadcrumb = () => {
    const translate = useTranslate();
    const createPath = useCreatePath();

    const editLabel = translate('ra.action.edit');
    const createLabel = translate('ra.action.create');
    return (
        <Breadcrumb
            sx={{
                paddingTop: 1,
                fontSize: 'small',
                // Display the Breadcrumb over the custom Layout of some pages by adding a zIndex and a maxWidth
                // @see "src/products/ProductList.tsx" or "src/visitors/VisitorList.tsx"
                maxWidth: '700px',
                zIndex: 1,
                '& a': {
                    pointerEvents: 'visible',
                },
            }}
        >
            <ResourceBreadcrumbItems
                resources={['stores', 'tours', 'events']}
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
                        label={({ record }: { record?: RaRecord }): string =>
                            `${editLabel} ${
                                record ? `"${record.reference}"` : '...'
                            }`
                        }
                        to={({ record }: { record?: RaRecord }): string =>
                            record
                                ? createPath({
                                      resource: 'products',
                                      id: record.id,
                                      type: 'edit',
                                  })
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
                >
                    <BreadcrumbItem
                        name="edit"
                        label={({ record }: { record?: RaRecord }): string =>
                            `${editLabel} ${
                                record ? `"${record.name}"` : '...'
                            }`
                        }
                    />
                </BreadcrumbItem>
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
                        label={({ record }: { record?: RaRecord }): string =>
                            `${editLabel} ${
                                record ? `"${record.reference}"` : '...'
                            }`
                        }
                        to={({ record }: { record?: RaRecord }): string =>
                            record
                                ? createPath({
                                      resource: 'products',
                                      id: record.id,
                                      type: 'edit',
                                  })
                                : ''
                        }
                    />
                </BreadcrumbItem>
                <BreadcrumbItem
                    name="invoices"
                    label={translate('resources.invoices.name', 2)}
                    to="/invoices"
                />
            </BreadcrumbItem>
            <BreadcrumbItem
                name="customers"
                label={translate('resources.customers.name', 2)}
                to="/customers"
            >
                <BreadcrumbItem
                    name="edit"
                    label={({ record }: { record?: RaRecord }): string =>
                        `${editLabel} ${
                            record
                                ? `"${record.first_name} ${record.last_name}"`
                                : '...'
                        }`
                    }
                    to={({ record }: { record?: RaRecord }): string =>
                        record
                            ? createPath({
                                  resource: 'customers',
                                  id: record.id,
                                  type: 'edit',
                              })
                            : ''
                    }
                />
                <BreadcrumbItem
                    name="create"
                    label={createLabel}
                    to="/customers/create"
                />
            </BreadcrumbItem>
            <BreadcrumbItem
                name="tours"
                label={translate('resources.tours.name', 2)}
            />
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
