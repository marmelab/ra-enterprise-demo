import * as React from 'react';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import {
    AutocompleteInput,
    BooleanInput,
    DateInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    useRecordContext,
    useTranslate,
} from 'react-admin';
import { Customer, Order } from '../types';
import Basket from './Basket';

const OrderEdit = () => {
    return (
        <Edit title={<OrderTitle />} aside={<Basket />}>
            <OrderForm />
        </Edit>
    );
};

const OrderTitle = () => {
    const translate = useTranslate();
    const record = useRecordContext<Order>();
    if (!record) {
        return null;
    }
    return (
        <span>
            {translate('resources.commands.title', {
                reference: record.reference,
            })}
        </span>
    );
};

const OrderForm = () => {
    const record = useRecordContext();
    useDefineAppLocation('sales.commands.edit', { record });

    return (
        <SimpleForm sx={{ maxWidth: '50em' }}>
            <DateInput source="date" />
            <ReferenceInput source="customer_id" reference="customers">
                <AutocompleteInput
                    optionText={(choice: Customer): string =>
                        `${choice.first_name} ${choice.last_name}`
                    }
                />
            </ReferenceInput>
            <SelectInput
                source="status"
                choices={[
                    { id: 'delivered', name: 'delivered' },
                    { id: 'ordered', name: 'ordered' },
                    { id: 'cancelled', name: 'cancelled' },
                    {
                        id: 'unknown',
                        name: 'unknown',
                        disabled: true,
                    },
                ]}
            />
            <BooleanInput source="returned" />
        </SimpleForm>
    );
};

export default OrderEdit;
