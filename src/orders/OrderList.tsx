import * as React from 'react';
import { Fragment, useCallback } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    DateField,
    DateInput,
    NullableBooleanInput,
    NumberField,
    NumberInput,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    useGetList,
    useListContext,
    TopToolbar,
    SelectColumnsButton,
    FilterButton,
    ExportButton,
    DatagridConfigurable,
} from 'react-admin';
import { ListLive } from '@react-admin/ra-realtime';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import {
    alpha,
    darken,
    Divider,
    lighten,
    Tabs,
    Tab,
    Theme,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer, Order } from '../types';
import { USDFormat } from '../formatUtils';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

const OrderList = () => {
    useDefineAppLocation('sales.orders');
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <ListLive
            filterDefaultValues={{ status: 'ordered' }}
            sort={{ field: 'date', order: 'DESC' }}
            perPage={25}
            filters={orderFilters}
            sx={{ marginTop: isSmall ? undefined : -1 }}
            actions={<ListActions />}
        >
            <TabbedDatagrid />
        </ListLive>
    );
};

const orderFilters = [
    <SearchInput key="q" source="q" alwaysOn />,
    <ReferenceInput
        key="customer_id"
        source="customer_id"
        reference="customers"
    >
        <AutocompleteInput
            optionText={(choice?: Customer) =>
                choice?.id // the empty choice is { id: '' }
                    ? `${choice.first_name} ${choice.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <DateInput
        key="date_gte"
        source="date_gte"
        parse={d => new Date(d).toISOString()}
    />,
    <DateInput
        key="date_lte"
        source="date_lte"
        parse={d => new Date(d).toISOString()}
    />,
    <NumberInput key="total_gte" source="total_gte" />,
    <NullableBooleanInput key="returned" source="returned" />,
];

const tabs = [
    { id: 'ordered', name: 'ordered' },
    { id: 'delivered', name: 'delivered' },
    { id: 'cancelled', name: 'cancelled' },
];

const useGetTotals = (filterValues: any) => {
    const { total: totalOrdered } = useGetList('orders', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'ordered' },
    });
    const { total: totalDelivered } = useGetList('orders', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'delivered' },
    });
    const { total: totalCancelled } = useGetList('orders', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'cancelled' },
    });

    return {
        ordered: totalOrdered,
        delivered: totalDelivered,
        cancelled: totalCancelled,
    };
};

const orderRowStyle =
    (batchLevel: number, theme: Theme) =>
    (
        record: Order & { batch: number }
    ): { backgroundColor: string | undefined } => {
        let backgroundColor;
        switch (record.batch) {
            case batchLevel:
                backgroundColor =
                    theme.palette.mode === 'light'
                        ? lighten(alpha(theme.palette.info.light, 1), 0.68)
                        : darken(alpha(theme.palette.info.dark, 1), 0.88);
                break;
            case 1:
                if (batchLevel > 0) {
                    backgroundColor =
                        theme.palette.mode === 'light'
                            ? lighten(alpha(theme.palette.info.light, 1), 0.78)
                            : darken(alpha(theme.palette.info.dark, 1), 0.78);
                }
                break;
            default:
                backgroundColor = theme.palette.background.paper;
        }

        return {
            backgroundColor,
        };
    };

const TabbedDatagrid = () => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const totals = useGetTotals(filterValues) as any;

    const handleChange = useCallback(
        (event: React.ChangeEvent<any>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const theme = useTheme();
    const batchLevel =
        parseInt(localStorage.getItem('batchLevel') || '0', 0) || 0;
    const rowStyle = orderRowStyle(batchLevel, theme);

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <MobileGrid />
            ) : (
                <>
                    {filterValues.status === 'ordered' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
                            data-testid="order-ordered-datagrid"
                            rowStyle={rowStyle}
                        >
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField label="resources.orders.fields.customer_id" />
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                                label="resources.orders.fields.address"
                            >
                                <AddressField />
                            </ReferenceField>
                            <NumberField
                                source="basket.length"
                                label="resources.orders.fields.nb_items"
                            />
                            <NumberField
                                source="total"
                                options={USDFormat(2)}
                                sx={{ fontWeight: 'bold' }}
                            />
                        </DatagridConfigurable>
                    )}
                    {filterValues.status === 'delivered' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
                        >
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                                label="resources.orders.fields.address"
                            >
                                <AddressField />
                            </ReferenceField>
                            <NumberField
                                source="basket.length"
                                label="resources.orders.fields.nb_items"
                            />
                            <NumberField
                                source="total"
                                options={USDFormat(2)}
                                sx={{ fontWeight: 'bold' }}
                            />
                            <BooleanField
                                source="returned"
                                sx={{ mt: -0.5, mb: -0.5 }}
                            />
                        </DatagridConfigurable>
                    )}
                    {filterValues.status === 'cancelled' && (
                        <DatagridConfigurable
                            rowClick="edit"
                            omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
                        >
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                                label="resources.orders.fields.address"
                            >
                                <AddressField />
                            </ReferenceField>
                            <NumberField
                                source="basket.length"
                                label="resources.orders.fields.nb_items"
                            />
                            <NumberField
                                source="total"
                                options={USDFormat(2)}
                                sx={{ fontWeight: 'bold' }}
                            />
                            <BooleanField
                                source="returned"
                                sx={{ mt: -0.5, mb: -0.5 }}
                            />
                        </DatagridConfigurable>
                    )}
                </>
            )}
        </Fragment>
    );
};

export default OrderList;
