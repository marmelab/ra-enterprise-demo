import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    DateInput,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';

import FullNameField from '../visitors/FullNameField';
import AddressField from '../visitors/AddressField';
import InvoiceShow from './InvoiceShow';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { USDFormat } from '../formatUtils';

const listFilters = [
    <DateInput key="date_gte" source="date_gte" alwaysOn />,
    <DateInput key="date_lte" source="date_lte" alwaysOn />,
];

const InvoiceList = () => {
    useDefineAppLocation('sales.invoices');
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={listFilters}
            perPage={25}
            sort={{ field: 'date', order: 'DESC' }}
            sx={{ marginTop: isSmall ? undefined : 1 }}
        >
            <Datagrid
                rowClick="expand"
                expand={<InvoiceShow />}
                sx={{
                    '& .column-customer_id': {
                        display: { xs: 'none', md: 'table-cell' },
                    },
                    '& .column-total_ex_taxes': {
                        display: { xs: 'none', md: 'table-cell' },
                    },
                    '& .column-delivery_fees': {
                        display: { xs: 'none', md: 'table-cell' },
                    },
                    '& .column-taxes': {
                        display: { xs: 'none', md: 'table-cell' },
                    },
                }}
            >
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
                <NumberField source="total_ex_taxes" options={USDFormat(2)} />
                <NumberField source="delivery_fees" options={USDFormat(2)} />
                <NumberField source="taxes" options={USDFormat(2)} />
                <NumberField source="total" options={USDFormat(2)} />
            </Datagrid>
        </List>
    );
};

export default InvoiceList;
