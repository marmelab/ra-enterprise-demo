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
    const { content } = data;

    const classes = useCommandListItemStyles();
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
            <ListItemAvatar className={classes.avatar}>
                <Avatar alt={content.reference}>
                    <ShoppingCartIcon fontSize="large" />
                </Avatar>
            </ListItemAvatar>
            <Grid className={classes.root} container spacing={2}>
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

const useCommandListItemStyles = makeStyles(theme => ({
    avatar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '& svg': {
            width: 30,
            height: 30,
        },
    },
    root: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 'bold',
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
