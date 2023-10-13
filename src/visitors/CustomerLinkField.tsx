import * as React from 'react';
import { Link, useRecordContext } from 'react-admin';

import FullNameField from './FullNameField';
import { Customer } from '../types';

const CustomerLinkField = () => {
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

CustomerLinkField.defaultProps = {
    source: 'customer_id',
};

export default CustomerLinkField;
