import * as React from 'react';
import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import DollarIcon from '@mui/icons-material/AttachMoney';

import { SearchListItemLink } from './SearchListItemLink';
import { useTranslate } from 'react-admin';
import { LinkedData } from './LinkedData';

const secondaryTypographyProps = {
    component: 'div',
};

export const CustomerListItem = (props: any) => {
    const { data, onClick } = props;
    const { content } = data;

    const translate = useTranslate();

    if (!content) {
        return null;
    }

    const fullname = `${content.first_name} ${content.last_name}`;

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'none',
                },
                '& a': {
                    textDecoration: 'none',
                },
                '& a:hover': {
                    textDecoration: 'none',
                },
                px: 0,
            }}
            data-testid="customer"
        >
            <ListItemButton
                data={data}
                component={SearchListItemLink}
                onClick={onClick}
            >
                <ListItemAvatar
                    sx={{
                        m: 0,
                        '& img': {
                            width: 50,
                            height: 50,
                        },
                    }}
                >
                    <Avatar alt={fullname} src={content.avatar} />
                </ListItemAvatar>
                <ListItemText
                    className="highlight"
                    primary={
                        <Typography
                            color="textPrimary"
                            variant="body2"
                            gutterBottom
                        >
                            {fullname}
                        </Typography>
                    }
                    secondary={
                        <Box
                            component="ul"
                            display="flex"
                            justifyContent="flex-start"
                            p={0}
                            m={0}
                        >
                            {content.pending_orders > 0 ? (
                                <LinkedData
                                    icon={<ShoppingCartIcon fontSize="small" />}
                                    label={translate('resources.orders.name', {
                                        smart_count: 2,
                                    })}
                                    to={`/orders?filter=%7B"status"%3A"ordered"%2C"customer_id"%3A${content.id}%7D`}
                                >
                                    {content.pending_orders}
                                </LinkedData>
                            ) : null}

                            {content.total_spent > 0 ? (
                                <LinkedData
                                    icon={<DollarIcon fontSize="small" />}
                                    label={translate(
                                        'resources.customers.fields.total_spent'
                                    )}
                                    to={`/orders?filter=%7B"status"%3A"delivered"%2C"customer_id"%3A${content.id}%7D`}
                                >
                                    {content.total_spent.toLocaleString()}
                                </LinkedData>
                            ) : null}
                            {content.reviews > 0 ? (
                                <LinkedData
                                    icon={<CommentIcon fontSize="small" />}
                                    label={translate('resources.reviews.name', {
                                        smart_count: 2,
                                    })}
                                    to={`/reviews?filter=%7B"customer_id"%3A${content.id}%7D`}
                                >
                                    {content.reviews}
                                </LinkedData>
                            ) : null}
                        </Box>
                    }
                    // @ts-ignore Could not make TS happy
                    secondaryTypographyProps={secondaryTypographyProps}
                    sx={{ my: 0 }}
                />
            </ListItemButton>
        </ListItem>
    );
};
