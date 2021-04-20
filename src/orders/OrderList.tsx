import * as React from 'react';
import {
    FC,
    Fragment,
    ChangeEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DatagridProps,
    DateField,
    DateInput,
    Filter,
    FilterProps,
    Identifier,
    ListContextProvider,
    ListProps,
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
import {
    useMediaQuery,
    Divider,
    Tabs,
    Tab,
    useTheme,
    lighten,
    darken,
    fade,
    Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ListActions, RealTimeList } from '@react-admin/ra-enterprise';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import AddressField from '../visitors/AddressField';
import MobileGrid from './MobileGrid';
import { Customer } from '../types';
import CustomBreadcrumb from '../layout/Breadcrumb';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const OrderFilter: FC<Omit<FilterProps, 'children'>> = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput
                optionText={(choice: Customer): string =>
                    choice.id // the empty choice is { id: '' }
                        ? `${choice.first_name} ${choice.last_name}`
                        : ''
                }
            />
        </ReferenceInput>
        <DateInput source="date_gte" />
        <DateInput source="date_lte" />
        <TextInput source="total_gte" />
        <NullableBooleanInput source="returned" />
    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const orderRowStyle = (batchLevel, theme) => (record): any => {
    let backgroundColor;
    switch (record.batch) {
        case batchLevel:
            backgroundColor =
                theme.palette.type === 'light'
                    ? lighten(fade(theme.palette.info.light, 1), 0.68)
                    : darken(fade(theme.palette.info.dark, 1), 0.88);
            break;
        case 1:
            if (batchLevel > 0) {
                backgroundColor =
                    theme.palette.type === 'light'
                        ? lighten(fade(theme.palette.info.light, 1), 0.78)
                        : darken(fade(theme.palette.info.dark, 1), 0.78);
            }
            break;
        default:
            backgroundColor = theme.palette.background.paper;
    }

    return {
        backgroundColor,
    };
};

const tabs = [
    { id: 'ordered', name: 'ordered' },
    { id: 'delivered', name: 'delivered' },
    { id: 'cancelled', name: 'cancelled' },
];

type TabbedDatagridProps = DatagridProps;

const useGetTotals = (filterValues: any): any => {
    const { total: totalOrdered } = useGetList(
        'commands',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'ordered' }
    );
    const { total: totalDelivered } = useGetList(
        'commands',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'delivered' }
    );
    const { total: totalCancelled } = useGetList(
        'commands',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'cancelled' }
    );

    return {
        ordered: totalOrdered,
        delivered: totalDelivered,
        cancelled: totalCancelled,
    };
};

const TabbedDatagrid: FC<TabbedDatagridProps> = props => {
    const listContext = useListContext();
    useDefineAppLocation('sales.commands');
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const [ordered, setOrdered] = useState<Identifier[]>([] as Identifier[]);
    const [delivered, setDelivered] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const [cancelled, setCancelled] = useState<Identifier[]>(
        [] as Identifier[]
    );
    const totals = useGetTotals(filterValues) as any;

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'ordered':
                    setOrdered(ids);
                    break;
                case 'delivered':
                    setDelivered(ids);
                    break;
                case 'cancelled':
                    setCancelled(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (event: ChangeEvent<unknown>, value: any) => {
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

    const selectedIds =
        filterValues.status === 'ordered'
            ? ordered
            : filterValues.status === 'delivered'
            ? delivered
            : cancelled;

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
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'ordered' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: ordered }}
                        >
                            <Datagrid
                                {...props}
                                optimized
                                rowClick="edit"
                                rowStyle={rowStyle}
                                data-testid="order-ordered-datagrid"
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
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'delivered' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: delivered }}
                        >
                            <Datagrid {...props} rowClick="edit">
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
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                                <BooleanField source="returned" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'cancelled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid {...props} rowClick="edit">
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
                                    options={{
                                        style: 'currency',
                                        currency: 'USD',
                                    }}
                                    className={classes.total}
                                />
                                <BooleanField source="returned" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const OrderList: FC<ListProps> = props => (
    <RealTimeList
        {...props}
        filterDefaultValues={{ status: 'ordered' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        filters={<OrderFilter />}
        actions={
            <ListActions breadcrumb={<CustomBreadcrumb variant="actions" />} />
        }
    >
        <TabbedDatagrid />
    </RealTimeList>
);

export default OrderList;
