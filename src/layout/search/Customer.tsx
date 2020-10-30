import React, { useEffect, useState, FC } from 'react';
import { useDataProvider } from 'react-admin';
import { CircularProgress, Typography } from '@material-ui/core';

export const Customer: FC<{ customerId?: number | string }> = ({
    customerId,
}) => {
    const dataProvider = useDataProvider();

    const [customerRecord, setCustomerRecord] = useState({
        first_name: '',
        last_name: '',
    });
    const [customerLoading, setCustomerLoading] = useState(true);

    useEffect(() => {
        if (!dataProvider || customerId == null) {
            return;
        }
        dataProvider
            .getOne('customers', { id: customerId })
            .then(({ data }) => {
                setCustomerRecord(data);
                setCustomerLoading(false);
            })
            .catch(() => {
                setCustomerLoading(false);
            });
    }, [dataProvider, customerId]);

    const fullname = getFullname({
        firstName: customerRecord.first_name,
        lastName: customerRecord.last_name,
    });

    return customerLoading ? (
        <CircularProgress size={20} />
    ) : (
        <Typography variant="body2" color="textPrimary" gutterBottom>
            {fullname}
        </Typography>
    );
};

export function getFullname({
    firstName,
    lastName,
}: {
    firstName: string;
    lastName: string;
}): string {
    return `${firstName} ${lastName}`;
}
