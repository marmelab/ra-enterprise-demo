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
                fontSize: 'small',
                // Display the Breadcrumb over the custom Layout of some pages by adding a zIndex and a maxWidth
                // @see "src/products/ProductList.tsx" or "src/visitors/VisitorList.tsx"
                '& a': {
                    pointerEvents: 'visible',
                },
                '& .RaBreadcrumb-list': {
                    margin: 0,
                    padding: 0,
                },
                zIndex: 10, // ensure it goes above actions bar
                maxWidth: 'fit-content', // ensure it doesn't cover the actions bar
            }}
        >
            <Breadcrumb.DashboardItem>
                <ResourceBreadcrumbItems resources={['tours', 'events']} />
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
                            label={({
                                record,
                            }: {
                                record?: RaRecord;
                            }): string =>
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
                            label={({
                                record,
                            }: {
                                record?: RaRecord;
                            }): string =>
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
                <BreadcrumbItem
                    name="stores"
                    label={translate('resources.stores.name', 2)}
                    to="/stores"
                >
                    <BreadcrumbItem
                        name="visits"
                        label={translate('resources.visits.name', 2)}
                        to="/visits"
                    />
                </BreadcrumbItem>
                <BreadcrumbItem
                    name="sales"
                    label={translate('pos.menu.sales', 1)}
                >
                    <BreadcrumbItem
                        name="orders"
                        label={translate('resources.orders.name', 2)}
                        to="/orders"
                    >
                        <BreadcrumbItem
                            name="edit"
                            label={({
                                record,
                            }: {
                                record?: RaRecord;
                            }): string =>
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
            </Breadcrumb.DashboardItem>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
