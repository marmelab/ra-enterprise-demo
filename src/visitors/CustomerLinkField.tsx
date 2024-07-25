import * as React from 'react';
import { FieldProps, Link, useRecordContext } from 'react-admin';

import FullNameField from './FullNameField';
import { Customer } from '../types';

const CustomerLinkField = (_props: FieldProps) => {
    const record = useRecordContext<Customer>();
    if (!record) {
        return null;
    }
    return (
        <Link to={`/customers/${record.id}`}>
            <FullNameField />
        </Link>
    );
};

export default CustomerLinkField;
