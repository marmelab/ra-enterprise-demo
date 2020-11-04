import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslate } from 'react-admin';
import {
    Avatar,
    Grid,
    ListItem,
    ListItemAvatar,
    Typography,
} from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { SearchListItemLink } from './SearchListItemLink';

export const CommandListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    const classes = useCommandListItemStyles();
    const translate = useTranslate();

    if (!record) {
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
            <ListItemAvatar className={classes.avatar}>
                <Avatar alt={record.reference}>
                    <ShoppingCartIcon fontSize="large" />
                </Avatar>
            </ListItemAvatar>
            <Grid className={classes.root} container spacing={2}>
                <Grid container item xs>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.reference}
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                        >
                            {record.reference}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            gutterBottom
                        >
                            {new Date(record.date).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.total}
                            variant="caption"
                            color="textPrimary"
                        >
                            {`${translate(
                                'resources.commands.fields.basket.total'
                            )} ${record.total}`}
                            €
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CommandStatus status={record.status} />
                    </Grid>
                </Grid>
                <Grid container item xs>
                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                        >
                            {`${record.customer.first_name} ${record.customer.last_name}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
};

const useCommandListItemStyles = makeStyles(theme => ({
    avatar: {
        width: 64,
        height: 64,
        paddingRight: theme.spacing(2),

        '& > *': {
            width: '100%',
            height: '100%',
        },
    },
    root: {
        padding: theme.spacing(1, 0),
    },
    reference: {
        fontWeight: theme.typography.fontWeightBold,
    },
    total: {
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const CommandStatus: FC<{ status: string }> = ({ status }) => {
    const classes = useCommandStatusStyles();

    return (
        <div
            className={classnames(classes.root, {
                [classes.ordered]: status === 'ordered',
                [classes.delivered]: status === 'delivered',
                [classes.cancelled]: status === 'cancelled',
            })}
        >
            <Typography className={classes.status} variant="caption">
                {status}
            </Typography>
        </div>
    );
};

const useCommandStatusStyles = makeStyles(theme => ({
    root: {
        maxWidth: 64,
        padding: theme.spacing(0.25, 1),
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
    },
    ordered: {
        backgroundColor: lighten(blue[300], 0.3),
        color: theme.palette.getContrastText(lighten(blue[300], 0.3)),
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
    status: {
        color: 'inherit',
        textTransform: 'capitalize',
    },
}));
