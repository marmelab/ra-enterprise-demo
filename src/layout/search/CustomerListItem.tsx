import React, { FC } from 'react';
import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';
import DollarIcon from '@material-ui/icons/AttachMoney';

import { SearchListItemLink } from './SearchListItemLink';
import { useTranslate } from 'react-admin';
import { LinkedData } from './LinkedData';

const secondaryTypographyProps = {
    component: 'div',
};

export const CustomerListItem: FC<any> = props => {
    const { data, onClick } = props;
    const { content } = data;

    const classes = useStyles();
    const translate = useTranslate();

    if (!content) {
        return null;
    }

    const fullname = `${content.first_name} ${content.last_name}`;

    return (
        <ListItem
            button
            component={SearchListItemLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <ListItemAvatar className={classes.avatar}>
                <Avatar alt={fullname} src={content.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6" color="textPrimary">
                        {fullname}
                    </Typography>
                }
                secondary={
                    <Box
                        component="ul"
                        display="flex"
                        justifyContent="space-between"
                        className={classes.stats}
                        padding={0}
                        marginTop={1}
                        marginBottom={1}
                    >
                        <LinkedData
                            icon={<ShoppingCartIcon />}
                            label={translate('pos.dashboard.pending_orders')}
                            to={`/commands?filter=%7B"status"%3A"ordered"%2C"customer_id"%3A${content.id}%7D`}
                        >
                            {content.pending_orders}
                        </LinkedData>
                        <LinkedData
                            icon={<DollarIcon />}
                            label={translate(
                                'resources.customers.fields.total_spent'
                            )}
                            to={`/commands?filter=%7B"status"%3A"delivered"%2C"customer_id"%3A${content.id}%7D`}
                        >
                            {content.total_spent.toLocaleString()}
                        </LinkedData>
                        <LinkedData
                            icon={<CommentIcon />}
                            label={translate('resources.reviews.name', {
                                smart_count: 2,
                            })}
                            to={`/reviews?filter=%7B"customer_id"%3A${content.id}%7D`}
                        >
                            {content.reviews}
                        </LinkedData>
                    </Box>
                }
                // @ts-ignore Could not make TS happy
                secondaryTypographyProps={secondaryTypographyProps}
            />
        </ListItem>
    );
};

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 64,
        height: 64,
        paddingRight: theme.spacing(2),

        '& > *': {
            width: '100%',
            height: '100%',
        },
    },
    stats: {
        '& li': {
            width: '33.33%',
            minWidth: 150,
        },
    },
}));
