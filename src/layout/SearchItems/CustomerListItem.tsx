import * as React from 'react';
import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
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
            button
            component={SearchListItemLink}
            data={data}
            onClick={onClick}
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
            }}
            data-testid="customer"
        >
            <ListItemAvatar
                sx={{
                    marginLeft: 1,
                    marginRight: 1,
                    '& img': {
                        width: 50,
                        height: 50,
                    },
                }}
            >
                <Avatar alt={fullname} src={content.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography color="textPrimary">{fullname}</Typography>
                }
                secondary={
                    <Box
                        component="ul"
                        display="flex"
                        justifyContent="flex-start"
                        padding={0}
                        marginTop={1}
                        marginBottom={1}
                    >
                        {content.pending_orders > 0 ? (
                            <LinkedData
                                icon={<ShoppingCartIcon />}
                                label={translate('resources.commands.name', {
                                    smart_count: 2,
                                })}
                                to={`/commands?filter=%7B"status"%3A"ordered"%2C"customer_id"%3A${content.id}%7D`}
                            >
                                {content.pending_orders}
                            </LinkedData>
                        ) : null}

                        {content.total_spent > 0 ? (
                            <LinkedData
                                icon={<DollarIcon />}
                                label={translate(
                                    'resources.customers.fields.total_spent'
                                )}
                                to={`/commands?filter=%7B"status"%3A"delivered"%2C"customer_id"%3A${content.id}%7D`}
                            >
                                {content.total_spent.toLocaleString()}
                            </LinkedData>
                        ) : null}
                        {content.reviews > 0 ? (
                            <LinkedData
                                icon={<CommentIcon />}
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
            />
        </ListItem>
    );
};
