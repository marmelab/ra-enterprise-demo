import React from 'react';
import { useTranslate } from 'react-admin';
import {
    Avatar,
    Box,
    Grid,
    lighten,
    ListItem,
    ListItemAvatar,
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
        >
            <ListItemAvatar
                sx={{
                    marginLeft: 1,
                    marginRight: 1,
                    '& svg': {
                        width: 30,
                        height: 30,
                    },
                }}
            >
                <Avatar alt={content.reference}>
                    <ShoppingCartIcon fontSize="large" />
                </Avatar>
            </ListItemAvatar>
            <Grid
                sx={{
                    py: 1,
                    px: 0,
                }}
                container
                spacing={2}
            >
                <Grid container item xs>
                    <Grid item xs={8}>
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            gutterBottom
                        >
                            Ref. {content.reference}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CommandStatus status={content.status} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                        >
                            {new Date(content.date).toLocaleDateString()}
                            &nbsp;-&nbsp;
                            {`${content.customer.first_name} ${content.customer.last_name}`}
                            &nbsp;-&nbsp;
                            {`${translate(
                                'resources.commands.fields.basket.total'
                            )} ${content.total}`}
                            €
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
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
        <Box
            sx={{
                maxWidth: 64,
                py: 0.25,
                px: 1,
                borderRadius: 1,
                textAlign: 'center',
                ...StatusStyles[status],
            }}
        >
            <Typography
                sx={{
                    color: 'inherit',
                    textTransform: 'capitalize',
                }}
                variant="caption"
            >
                {status}
            </Typography>
        </Box>
    );
};
