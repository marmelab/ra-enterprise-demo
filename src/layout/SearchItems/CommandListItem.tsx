import React from 'react';
import { useTranslate } from 'react-admin';
import {
    Avatar,
    Chip,
    lighten,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { SearchListItemLink } from './SearchListItemLink';

export const CommandListItem = (props: any) => {
    const { data, onClick } = props;
    const { content } = data;

    const translate = useTranslate();

    if (!content) {
        return null;
    }

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
                px: 0,
            }}
        >
            <ListItemAvatar
                sx={{
                    paddingRight: 2,
                    mt: 0.5,
                }}
            >
                <Avatar alt={content.reference}>
                    <ShoppingCartIcon fontSize="small" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                <Typography variant="body2" color="textPrimary" display="flex">
                    Ref. {content.reference}{' '}
                    <CommandStatus status={content.status} />
                </Typography>

                <Typography variant="caption" color="textPrimary" gutterBottom>
                    {new Date(content.date).toLocaleDateString()}
                    &nbsp;-&nbsp;
                    {`${content.customer.first_name} ${content.customer.last_name}`}
                    &nbsp;-&nbsp;
                    {`${translate('resources.commands.fields.basket.total')} ${
                        content.total
                    }`}
                    €
                </Typography>
            </ListItemText>
        </ListItem>
    );
};

const CommandStatus = ({
    status,
}: {
    status: 'ordered' | 'delivered' | 'cancelled';
}) => {
    const theme = useTheme();
    const StatusStyles = {
        ordered: {
            color: theme.palette.getContrastText(lighten(blue[300], 0.3)),
            backgroundColor: lighten(blue[300], 0.3),
        },
        delivered: {
            backgroundColor: lighten(theme.palette.success.main, 0.3),
            color: theme.palette.getContrastText(
                lighten(theme.palette.success.main, 0.3)
            ),
        },
        cancelled: {
            backgroundColor: lighten(theme.palette.error.main, 0.3),
            color: theme.palette.getContrastText(
                lighten(theme.palette.error.main, 0.3)
            ),
        },
    };
    return (
        <Chip
            size="small"
            sx={{
                ...StatusStyles[status],
                marginLeft: 'auto',
            }}
            label={status}
        />
    );
};
