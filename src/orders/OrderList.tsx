import React, { Fragment, useState, useEffect, FC } from 'react';
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    SearchInput,
    TextField,
    TextInput,
    Filter,
    ListProps,
    ListControllerProps,
} from 'react-admin';
import {
    makeStyles,
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
import { RealTimeList } from '@react-admin/ra-realtime';
import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import MobileGrid from './MobileGrid';

const OrderFilter: FC = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput
                optionText={(choice): string =>
                    choice.first_name && choice.last_name
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

const TabbedDatagrid: FC<
    Partial<ListControllerProps> & {
        isXSmall: boolean;
        classes: any;
        batchLevel: number;
    }
> = props => {
    const [state, setState] = useState({
        ordered: [],
        delivered: [],
        cancelled: [],
    });

    useEffect(() => {
        if (props.ids !== state[props.filterValues.status]) {
            setState(prevState => ({
                ...prevState,
                [props.filterValues.status]: props.ids,
            }));
        }
    }, [props.filterValues.status, props.ids, state]);

    const handleChange = (event, value): void => {
        const { filterValues, setFilters } = props;
        if (setFilters) {
            setFilters({ ...filterValues, status: value }, {});
        }
    };

    const theme = useTheme();
    const { isXSmall, classes, filterValues, batchLevel, ...rest } = props;
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
                        label={choice.name}
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <MobileGrid {...rest} ids={state[filterValues.status]} />
            ) : (
                <div>
                    {filterValues.status === 'ordered' && (
                        <Datagrid
                            {...rest}
                            // @ts-ignore
                            ids={state.ordered}
                            optimized
                            rowClick="edit"
                            rowStyle={rowStyle}
                            data-testid="order-ordered-datagrid"
                        >
                            <TextField source="id" />
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
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
                    )}
                    {filterValues.status === 'delivered' && (
                        // @ts-ignore
                        <Datagrid {...rest} ids={state.delivered}>
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
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
                            <EditButton />
                        </Datagrid>
                    )}
                    {filterValues.status === 'cancelled' && (
                        // @ts-ignore
                        <Datagrid {...rest} ids={state.cancelled}>
                            <DateField source="date" showTime />
                            <TextField source="reference" />
                            <CustomerReferenceField />
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
                            <EditButton />
                        </Datagrid>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const StyledTabbedDatagrid: FC<Partial<ListControllerProps>> = props => {
    const classes = useDatagridStyles();
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    const batchLevel =
        parseInt(localStorage.getItem('batchLevel') || '0', 0) || 0;
    return (
        <TabbedDatagrid
            classes={classes}
            isXSmall={isXSmall}
            batchLevel={batchLevel}
            {...props}
        />
    );
};

const OrderList: FC<ListProps> = ({ classes, ...props }) => (
    <RealTimeList
        {...props}
        filterDefaultValues={{ status: 'ordered' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
        filters={<OrderFilter />}
    >
        <StyledTabbedDatagrid />
    </RealTimeList>
);

export default OrderList;
