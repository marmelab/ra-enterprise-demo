import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, useRecordContext } from 'react-admin';
import AvatarField from './AvatarField';
import { Customer } from '../types';

interface Props extends Omit<FieldProps<Customer>, 'source'> {
    size?: string;
    sx?: SxProps;
}

const FullNameField = (props: Props) => {
    const { size, sx } = props;
    const record = useRecordContext<Customer>();
    return record ? (
        <Typography
            variant="body2"
            component="div"
            sx={[
                {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <AvatarField
                record={record}
                size={size}
                sx={{
                    mr: 1,
                    mt: -0.5,
                    mb: -0.5,
                }}
            />
            {record.first_name} {record.last_name}
        </Typography>
    ) : null;
};

export default memo<Props>(FullNameField);
