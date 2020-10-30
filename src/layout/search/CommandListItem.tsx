import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslate } from 'react-admin';
import { Grid, ListItem, Typography } from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { Customer, SearchListItemLink } from './index';

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
                        <Customer customerId={record.customer_id} />
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
};

const useCommandListItemStyles = makeStyles(theme => ({
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
