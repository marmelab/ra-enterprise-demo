import React, { FC, ReactElement } from 'react';
import {
    AutocompleteInput,
    BooleanInput,
    DateInput,
    EditProps,
    Record,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    useTranslate,
} from 'react-admin';
import { Edit } from '@react-admin/ra-enterprise';
import { makeStyles } from '@material-ui/core/styles';

import Basket from './Basket';
import { EditActions } from '../layout/EditActions';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const OrderTitle: FC<{ record?: Record }> = ({ record }) => {
    const translate = useTranslate();

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

const useEditStyles = makeStyles({
    root: {
        alignItems: 'flex-start',
    },
});

const OrderEditForm = (props: any): ReactElement => {
    useDefineAppLocation('sales.commands.edit', props);
    return (
        <SimpleForm {...props}>
            <DateInput source="date" />
            <ReferenceInput source="customer_id" reference="customers">
                <AutocompleteInput
                    optionText={(choice: Record): string =>
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

const OrderEdit: FC<EditProps> = props => {
    const classes = useEditStyles();
    return (
        <Edit
            title={<OrderTitle />}
            aside={<Basket />}
            classes={classes}
            actions={<EditActions />}
            {...props}
        >
            <OrderEditForm />
        </Edit>
    );
};

export default OrderEdit;
