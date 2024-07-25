import * as React from 'react';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import {
    BooleanInput,
    DateField,
    Edit,
    Form,
    Labeled,
    Link as RaLink,
    PrevNextButtons,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useRecordContext,
    useTranslate,
} from 'react-admin';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
    Theme,
} from '@mui/material';

import { Order, Customer } from '../types';
import Basket from './Basket';
import Totals from './Totals';

const OrderEdit = () => (
    <Edit title={<OrderTitle />} component="div">
        <OrderForm />
    </Edit>
);

const OrderTitle = () => {
    const translate = useTranslate();
    const record = useRecordContext<Order>();
    return record ? (
        <span>
            {translate('resources.orders.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};

const CustomerDetails = () => {
    const record = useRecordContext<Customer>();
    return (
        <Typography>
            <RaLink to={`/customers/${record?.id}`}>
                {record?.first_name} {record?.last_name}
            </RaLink>
            <br />
            <Link href={`mailto:${record?.email}`}>{record?.email}</Link>
        </Typography>
    );
};

const CustomerAddress = () => {
    const record = useRecordContext<Customer>();
    return (
        <div>
            <Typography>
                {record?.first_name} {record?.last_name}
            </Typography>
            <Typography>{record?.address}</Typography>
            <Typography>
                {record?.city}, {record?.stateAbbr} {record?.zipcode}
            </Typography>
        </div>
    );
};

const Spacer = () => <Box mb={1}>&nbsp;</Box>;

const OrderForm = () => {
    const translate = useTranslate();
    const record = useRecordContext();
    useDefineAppLocation('sales.orders.edit', { record });
    return (
        <Form>
            <Box
                maxWidth="50em"
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
            >
                <Box
                    display="inline"
                    marginTop={(theme: Theme) =>
                        `calc(${theme.spacing(-3.5)} - ${
                            theme.typography.fontSize
                        }px)`
                    }
                    sx={{ '& nav': { display: 'inline-block' } }}
                >
                    <PrevNextButtons
                        filterDefaultValues={{ status: 'ordered' }}
                        sort={{ field: 'date', order: 'DESC' }}
                    />
                </Box>
                <Card sx={{ width: '100%' }}>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.orders.section.order'
                                    )}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="date">
                                            <DateField source="date" />
                                        </Labeled>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="reference">
                                            <TextField source="reference" />
                                        </Labeled>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <SelectInput
                                            source="status"
                                            choices={[
                                                {
                                                    id: 'delivered',
                                                    name: 'delivered',
                                                },
                                                {
                                                    id: 'ordered',
                                                    name: 'ordered',
                                                },
                                                {
                                                    id: 'cancelled',
                                                    name: 'cancelled',
                                                },
                                                {
                                                    id: 'unknown',
                                                    name: 'unknown',
                                                    disabled: true,
                                                },
                                            ]}
                                            sx={{ width: '80%' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Box mt={2}>
                                            <BooleanInput
                                                row={true}
                                                source="returned"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.orders.section.customer'
                                    )}
                                </Typography>
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                >
                                    <CustomerDetails />
                                </ReferenceField>
                                <Spacer />

                                <Typography variant="h6" gutterBottom>
                                    {translate(
                                        'resources.orders.section.shipping_address'
                                    )}
                                </Typography>
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                >
                                    <CustomerAddress />
                                </ReferenceField>
                            </Grid>
                        </Grid>
                        <Spacer />

                        <Typography variant="h6" gutterBottom>
                            {translate('resources.orders.section.items')}
                        </Typography>
                        <div>
                            <Basket />
                        </div>
                        <Spacer />

                        <Typography variant="h6" gutterBottom>
                            {translate('resources.orders.section.total')}
                        </Typography>
                        <div>
                            <Totals />
                        </div>
                    </CardContent>
                    <Toolbar />
                </Card>
            </Box>
        </Form>
    );
};

export default OrderEdit;
