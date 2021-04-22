import * as React from 'react';
import { useMemo, ReactElement } from 'react';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { useTranslate, useQueryWithStore } from 'react-admin';

import {
    Card,
    makeStyles,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CircularProgress as Loading,
    Avatar,
    CardHeader,
} from '@material-ui/core';

import CardWithIcon from './CardWithIcon';
import { Customer } from '../types';

export const NbNewCustomers = (): ReactElement => {
    const translate = useTranslate();
    const aMonthAgo = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }, []);

    const { loaded, data: visitors } = useQueryWithStore({
        type: 'getList',
        resource: 'customers',
        payload: {
            filter: {
                has_ordered: true,
                first_seen_gte: aMonthAgo.toISOString(),
            },
            sort: { field: 'first_seen', order: 'DESC' },
            pagination: { page: 1, perPage: 100 },
        },
    });

    if (!loaded) {
        return <Loading />;
    }

    const nb = visitors ? visitors.reduce((nb: number) => ++nb, 0) : 0;

    return (
        <CardWithIcon
            to="/customers"
            icon={CustomerIcon}
            title={translate('pos.dashboard.new_customers')}
            subtitle={nb}
        />
    );
};

const NewCustomers = (): ReactElement => {
    const translate = useTranslate();
    const classes = useStyles();
    const aMonthAgo = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }, []);

    const { loaded, data: visitors } = useQueryWithStore({
        type: 'getList',
        resource: 'customers',
        payload: {
            filter: {
                has_ordered: true,
                first_seen_gte: aMonthAgo.toISOString(),
            },
            sort: { field: 'first_seen', order: 'DESC' },
            pagination: { page: 1, perPage: 100 },
        },
    });

    if (!loaded) {
        return <Loading />;
    }
    return (
        <Card className={classes.root}>
            <CardHeader title={translate('pos.dashboard.new_customers')} />
            <List>
                {visitors
                    ? visitors.map((record: Customer) => (
                          <ListItem
                              button
                              to={`/customers/${record.id}`}
                              component={Link}
                              key={record.id}
                          >
                              <ListItemAvatar>
                                  <Avatar src={`${record.avatar}?size=32x32`} />
                              </ListItemAvatar>
                              <ListItemText
                                  primary={`${record.first_name} ${record.last_name}`}
                              />
                          </ListItem>
                      ))
                    : null}
            </List>
        </Card>
    );
};

const useStyles = makeStyles({
    root: {
        flex: 1,
    },
});

export default NewCustomers;
