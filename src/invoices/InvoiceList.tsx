import React, { ReactElement } from 'react';
import {
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    DateInput,
    Filter,
    ListProps,
    FilterProps,
} from 'react-admin';
import { List, ListActions } from '@react-admin/ra-enterprise';
import FullNameField from '../visitors/FullNameField';
import AddressField from '../visitors/AddressField';
import InvoiceShow from './InvoiceShow';
import CustomBreadcrumbForActions from '../layout/BreadcrumbForActions';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const ListFilters = (props: Omit<FilterProps, 'children'>): ReactElement => (
    <Filter {...props}>
        <DateInput source="date_gte" alwaysOn />
        <DateInput source="date_lte" alwaysOn />
    </Filter>
);

const InvoicesDatagrid = (): ReactElement => {
    useDefineAppLocation('sales.invoices');
    return (
        <Datagrid rowClick="expand" expand={<InvoiceShow />}>
            <TextField source="id" />
            <DateField source="date" />
            <ReferenceField source="customer_id" reference="customers">
                <FullNameField />
            </ReferenceField>
            <ReferenceField
                source="customer_id"
                reference="customers"
                link={false}
                label="resources.invoices.fields.address"
            >
                <AddressField />
            </ReferenceField>
            <ReferenceField source="command_id" reference="commands">
                <TextField source="reference" />
            </ReferenceField>
            <NumberField source="total_ex_taxes" />
            <NumberField source="delivery_fees" />
            <NumberField source="taxes" />
            <NumberField source="total" />
        </Datagrid>
    );
};
const InvoiceList = (props: ListProps): ReactElement => (
    <List
        {...props}
        perPage={25}
        filters={<ListFilters />}
        actions={<ListActions breadcrumb={<CustomBreadcrumbForActions />} />}
    >
        <InvoicesDatagrid />
    </List>
);

export default InvoiceList;
