import React, { FC } from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './FullNameField';

const CustomerReferenceField: FC<Omit<
    ReferenceFieldProps,
    'children' | 'source' | 'reference'
>> = props => (
    <ReferenceField source="customer_id" reference="customers" {...props}>
        <FullNameField />
    </ReferenceField>
);

CustomerReferenceField.defaultProps = {
    addLabel: true,
};

export default CustomerReferenceField;
