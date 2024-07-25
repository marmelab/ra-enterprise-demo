import React, { useMemo } from 'react';
import { useGetList } from 'react-admin';
import { Grid, Box, useMediaQuery, Theme } from '@mui/material';
import { subDays, startOfDay } from 'date-fns';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
import OrderChart from './OrderChart';
import { Logo } from '../layout/Logo';

import { Order } from '../types';

interface OrderStats {
    revenue: number;
    nbNewOrders: number;
    pendingOrders: Order[];
}

interface State {
    nbNewOrders?: number;
    pendingOrders?: Order[];
    recentOrders?: Order[];
    revenue?: number;
}

const Dashboard = () => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('lg')
    );
    const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

    const { data: orders } = useGetList<Order>('orders', {
        filter: { date_gte: aMonthAgo.toISOString() },
        sort: { field: 'date', order: 'DESC' },
        pagination: { page: 1, perPage: 50 },
    });

    const aggregation = useMemo<State>(() => {
        if (!orders) return {};
        const aggregations = orders
            .filter(order => order.status !== 'cancelled')
            .reduce(
                (stats: OrderStats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += order.total;
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'ordered') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        return {
            recentOrders: orders,
            revenue: aggregations.revenue,
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        };
    }, [orders]);

    const BLOCKS_SPACING = 2;

    const { nbNewOrders, pendingOrders, revenue, recentOrders } = aggregation;
    return isXSmall ? (
        <Grid container spacing={1}>
            <Box ml={1}>
                <Logo />
            </Box>
            <Grid item xs={12}>
                <Welcome />
            </Grid>
            <Grid item xs={12}>
                <MonthlyRevenue value={revenue} />
            </Grid>
            <Grid item xs={12}>
                <NbNewOrders value={nbNewOrders} />
            </Grid>
            <Grid item xs={12}>
                <PendingOrders orders={pendingOrders} />
            </Grid>
        </Grid>
    ) : isSmall ? (
        <Grid container spacing={BLOCKS_SPACING} padding={1}>
            <Box mt={1} ml={1} display="flex">
                <Logo />
            </Box>
            <Grid item xs={12}>
                <Welcome />
            </Grid>
            <Grid item xs={6}>
                <MonthlyRevenue value={revenue} />
            </Grid>
            <Grid item xs={6}>
                <NbNewOrders value={nbNewOrders} />
            </Grid>
            <Grid item xs={12}>
                <OrderChart orders={recentOrders} />
            </Grid>
            <Grid item xs={12}>
                <PendingOrders orders={pendingOrders} />
            </Grid>
        </Grid>
    ) : (
        <Grid container spacing={BLOCKS_SPACING} padding={1}>
            <Box mt={1} ml={2} display="flex">
                <Logo />
            </Box>
            <Grid item xs={12}>
                <Welcome />
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={BLOCKS_SPACING}>
                    <Grid item xs={6}>
                        <MonthlyRevenue value={revenue} />
                    </Grid>
                    <Grid item xs={6}>
                        <NbNewOrders value={nbNewOrders} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderChart orders={recentOrders} />
                    </Grid>
                    <Grid item xs={12}>
                        <PendingOrders orders={pendingOrders} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <PendingReviews />
            </Grid>
            <Grid item xs={3}>
                <NewCustomers />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
