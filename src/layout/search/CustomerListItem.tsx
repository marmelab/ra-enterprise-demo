import React, { FC } from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';

import { SearchListItemLink, getFullname } from './index';

export const CustomerListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    if (!record) {
        return null;
    }

    const fullname = getFullname({
        firstName: record.first_name,
        lastName: record.last_name,
    });

    return (
        <ListItem
            button
            component={SearchListItemLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <ListItemAvatar>
                <Avatar alt={fullname} src={record.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body1" color="textPrimary">
                        {fullname}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="textPrimary">
                        {record.email}
                    </Typography>
                }
            />
        </ListItem>
    );
};
