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
import { Stats } from './Stats';

const secondaryTypographyProps = {
    component: 'div',
};

export const CustomerListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    const classes = useStyles();
    const translate = useTranslate();

    if (!record) {
        return null;
    }

    const fullname = `${record.first_name} ${record.last_name}`;

    return (
        <ListItem
            button
            component={SearchListItemLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <ListItemAvatar className={classes.avatar}>
                <Avatar alt={fullname} src={record.avatar} />
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
                        <Stats
                            icon={<ShoppingCartIcon />}
                            label={translate('pos.dashboard.pending_orders')}
                        >
                            {record.pending_orders}
                        </Stats>
                        <Stats
                            icon={<DollarIcon />}
                            label={translate(
                                'resources.customers.fields.total_spent'
                            )}
                        >
                            {record.total_spent.toLocaleString()}
                        </Stats>
                        <Stats
                            icon={<CommentIcon />}
                            label={translate('resources.reviews.name', {
                                smart_count: 2,
                            })}
                        >
                            {record.reviews}
                        </Stats>
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
        },
    },
}));
