import * as React from 'react';
import { Fragment, useCallback } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    TextInput,
    useGetList,
    useListContext,
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

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer, Order } from '../types';
import { USDFormat } from '../formatUtils';

const OrderList = () => {
    useDefineAppLocation('sales.commands');
    return (
        <ListLive
            filterDefaultValues={{ status: 'ordered' }}
            sort={{ field: 'date', order: 'DESC' }}
            perPage={25}
            filters={orderFilters}
        >
            <TabbedDatagrid />
        </ListLive>
    );
};

const orderFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="customer_id" reference="customers">
        <AutocompleteInput
            optionText={(choice?: Customer) =>
                choice?.id // the empty choice is { id: '' }
                    ? `${choice.first_name} ${choice.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <DateInput source="date_gte" />,
    <DateInput source="date_lte" />,
    <TextInput source="total_gte" />,
    <NullableBooleanInput source="returned" />,
];

const tabs = [
    { id: 'ordered', name: 'ordered' },
    { id: 'delivered', name: 'delivered' },
    { id: 'cancelled', name: 'cancelled' },
];

const useGetTotals = (filterValues: any) => {
    const { total: totalOrdered } = useGetList('commands', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'ordered' },
    });
    const { total: totalDelivered } = useGetList('commands', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'delivered' },
    });
    const { total: totalCancelled } = useGetList('commands', {
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
    (record: Order): { backgroundColor: string | undefined } => {
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
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters,
                    false // no debounce, we want the filter to fire immediately
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
                        <Datagrid
                            optimized
                            rowClick="edit"
                            data-testid="order-ordered-datagrid"
                            rowStyle={rowStyle}
                        >
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                                label="resources.commands.fields.address"
                            >
                                <AddressField />
                            </ReferenceField>
                            <NbItemsField />
                            <NumberField
                                source="total"
                                options={USDFormat(2)}
                                sx={{ fontWeight: 'bold' }}
                            />
                        </Datagrid>
                    )}
                    {filterValues.status === 'delivered' && (
                        <Datagrid rowClick="edit">
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                                label="resources.commands.fields.address"
                            >
                                <AddressField />
                            </ReferenceField>
                            <NbItemsField />
                            <NumberField
                                source="total"
                                options={USDFormat(2)}
                                sx={{ fontWeight: 'bold' }}
                            />
                            <BooleanField
                                source="returned"
                                sx={{ mt: -0.5, mb: -0.5 }}
                            />
                        </Datagrid>
                    )}
                    {filterValues.status === 'cancelled' && (
                        <Datagrid rowClick="edit">
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                                label="resources.commands.fields.address"
                            >
                                <AddressField />
                            </ReferenceField>
                            <NbItemsField />
                            <NumberField
                                source="total"
                                options={USDFormat(2)}
                                sx={{ fontWeight: 'bold' }}
                            />
                            <BooleanField
                                source="returned"
                                sx={{ mt: -0.5, mb: -0.5 }}
                            />
                        </Datagrid>
                    )}
                </>
            )}
        </Fragment>
    );
};

export default OrderList;
