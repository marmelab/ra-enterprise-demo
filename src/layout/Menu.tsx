import * as React from 'react';
import { useState, useEffect, ReactElement } from 'react';
import { useSavedQueries, useTranslate } from 'react-admin';
import { useSubscribeToRecordList } from '@react-admin/ra-realtime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventsIcon from '@mui/icons-material/FormatListNumbered';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AVTimerIcon from '@mui/icons-material/AvTimer';
import BlockIcon from '@mui/icons-material/Block';
import querystring from 'query-string';
import { endOfYesterday } from 'date-fns';

import {
    MultiLevelMenu,
    MenuItemNode,
    MenuItemCategory,
    useAppLocationMatcher,
    useResourceAppLocation,
    MenuItemList,
} from '@react-admin/ra-navigation';

import {
    useMediaQuery,
    Theme,
    CardContent,
    Typography,
    styled,
    Badge,
    Box,
} from '@mui/material';

import MobileMenu from './MobileMenu';
import categories from '../categories';
import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import reviews from '../reviews';
import stores from '../stores';
import { segments } from '../visitors/segments';

export const newCustomerFilter = querystring.stringify({
    filter: JSON.stringify({
        last_seen_gte: endOfYesterday().toISOString(),
    }),
});

export const visitorsFilter = querystring.stringify({
    filter: JSON.stringify({ nb_commands_lte: 0 }),
});

export const pendingReviewFilter = querystring.stringify({
    filter: JSON.stringify({ status: 'pending' }),
});

const useResourceChangeCounter = (resource: string): number => {
    const match = useAppLocationMatcher();
    const location = useResourceAppLocation();
    const [countEvent, setCountEvent] = useState(0);

    useSubscribeToRecordList(({ payload }) => {
        if (!payload || !payload.ids) {
            return;
        }

        let count = payload.ids.length;

        if (location && match(resource)) {
            const { record } = location && (location.values || {});
            if (!record || record.id == null) {
                return;
            }

            count = payload.ids.filter(id => id !== record.id).length;
        }

        if (count) {
            setCountEvent(previous => previous + count);
        }
    }, resource);

    useEffect(() => {
        if (match(resource)) {
            setCountEvent(0);
        }
    }, [match, resource]);

    return countEvent;
};

const StyledBadgeForText = styled(Badge)(({ theme }) => ({
    width: '100%',
    display: 'unset',
    badge: {
        top: 13,
        right: 13,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        width: '100%',
    },
}));

const Menu = () => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md')
    );

    return isXSmall ? <MobileMenu /> : <DesktopMenu />;
};

export default Menu;

const DesktopMenu = () => {
    const translate = useTranslate();

    return (
        <MultiLevelMenu variant="categories">
            <MenuItemCategory
                name="dashboard"
                to="/"
                end
                icon={<DashboardIcon />}
                label="ra.page.dashboard"
            />
            <SalesMenuItem />
            <MenuItemCategory
                name="catalog"
                icon={<products.icon />}
                label={translate(`pos.menu.catalog`, { smart_count: 1 })}
            >
                <CardContent>
                    <CatalogMenu />
                </CardContent>
            </MenuItemCategory>
            <MenuItemCategory
                name="customers"
                icon={<visitors.icon />}
                label={translate(`pos.menu.customers`, { smart_count: 2 })}
            >
                <CustomersMenu />
            </MenuItemCategory>
            <MenuItemCategory
                name="reviews"
                icon={<reviews.icon />}
                label={translate(`resources.reviews.name`, { smart_count: 2 })}
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate(`resources.reviews.name`, {
                            smart_count: 2,
                        })}
                    </Typography>{' '}
                    <MenuItemList>
                        <MenuItemNode
                            name="reviews.all"
                            to={'/reviews?filter={}'}
                            icon={<CheckCircleOutlineIcon />}
                            label="pos.menu.all_reviews"
                        />
                        <MenuItemNode
                            name="reviews.pending"
                            to={`/reviews?${pendingReviewFilter}`}
                            icon={<AVTimerIcon />}
                            label="pos.menu.pending_reviews"
                        />
                        <MenuItemNode
                            name="reviews.bad"
                            to={'/reviews?filter={"rating_lte": "2"}'}
                            icon={<BlockIcon />}
                            label="pos.menu.bad_reviews"
                        />
                    </MenuItemList>
                </CardContent>
            </MenuItemCategory>
            <MenuItemCategory
                name="stores"
                to="/stores"
                icon={<stores.icon />}
                label={translate(`resources.stores.name`, { smart_count: 2 })}
            />
            <MenuItemCategory
                name="events"
                to="/events"
                icon={<EventsIcon />}
                label={translate(`resources.events.name`, { smart_count: 2 })}
            />
        </MultiLevelMenu>
    );
};

const CustomersMenu = () => {
    const translate = useTranslate();
    const savedQueriesMenuItems = usePersistedQueriesMenu('customers');

    return (
        <CardContent>
            <Box display="flex" justifyContent="space-between">
                <Box marginRight={2}>
                    <Typography variant="h6" gutterBottom>
                        {translate(`resources.customers.name`, {
                            smart_count: 2,
                        })}
                    </Typography>
                    <MenuItemList>
                        <MenuItemNode
                            name="customers.all_customers"
                            to={`/customers?filter={}`}
                            label={translate(`pos.menu.all_customers`, {
                                smart_count: 2,
                            })}
                        />
                        <MenuItemNode
                            name="customers.newcomers"
                            to={`/customers?${newCustomerFilter}`}
                            label={translate(`pos.menu.new_customers`, {
                                smart_count: 2,
                            })}
                        />
                        <MenuItemNode
                            name="customers.visitors"
                            to={`/customers?${visitorsFilter}`}
                            label={translate(`pos.menu.visitors`, {
                                smart_count: 2,
                            })}
                        />
                    </MenuItemList>
                    <Typography variant="h6" gutterBottom>
                        {translate(`resources.segments.name`, {
                            smart_count: 2,
                        })}
                    </Typography>
                    <MenuItemList>
                        {segments.map(segment => (
                            <MenuItemNode
                                key={segment}
                                name={`segments.${segment}`}
                                to={`/customers?${querystring.stringify({
                                    filter: JSON.stringify({ groups: segment }),
                                })}`}
                                label={translate(
                                    `resources.segments.data.${segment}`,
                                    {
                                        smart_count: 2,
                                    }
                                )}
                            />
                        ))}
                    </MenuItemList>
                </Box>
                {savedQueriesMenuItems.length > 0 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {translate(`pos.menu.my_queries`, {
                                smart_count: 1,
                            })}
                        </Typography>
                        <MenuItemList>
                            {savedQueriesMenuItems.map(({ label, to }) => (
                                <MenuItemNode
                                    key={label}
                                    name="customers"
                                    to={to}
                                    label={label}
                                />
                            ))}
                        </MenuItemList>
                    </Box>
                )}
            </Box>
        </CardContent>
    );
};

const SalesMenuItem = (): ReactElement => {
    const commandsChangeCount = useResourceChangeCounter('commands');
    const translate = useTranslate();

    return (
        <StyledBadgeForText badgeContent={commandsChangeCount} color="primary">
            <MenuItemCategory
                name="sales"
                icon={<products.icon />}
                label={translate(`pos.menu.sales`, { smart_count: 1 })}
                data-testid="commands-menu"
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate(`pos.menu.sales`, { smart_count: 1 })}
                    </Typography>
                    <MenuItemList>
                        <StyledBadgeForText
                            badgeContent={commandsChangeCount}
                            color="primary"
                        >
                            <MenuItemNode
                                name="commands"
                                to="/commands"
                                icon={<orders.icon />}
                                label={translate(`resources.commands.name`, {
                                    smart_count: 2,
                                })}
                            />
                        </StyledBadgeForText>
                        <MenuItemNode
                            name="invoices"
                            to="/invoices?filter={}"
                            icon={<invoices.icon />}
                            label={translate(`resources.invoices.name`, {
                                smart_count: 2,
                            })}
                        />
                    </MenuItemList>
                </CardContent>
            </MenuItemCategory>
        </StyledBadgeForText>
    );
};

const CatalogMenu = (): ReactElement => {
    const translate = useTranslate();
    const savedQueriesMenuItems = usePersistedQueriesMenu('products');

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Box marginRight={savedQueriesMenuItems.length > 0 ? 2 : 0}>
                <Typography variant="h6" gutterBottom>
                    {translate(`pos.menu.catalog`, {
                        smart_count: 1,
                    })}
                </Typography>
                <MenuItemList>
                    <MenuItemNode
                        name="products"
                        to="/products"
                        icon={<products.icon />}
                        label={translate(`resources.products.name`, {
                            smart_count: 2,
                        })}
                    />
                    <MenuItemNode
                        name="categories"
                        to="/categories"
                        icon={<categories.icon />}
                        label={translate(`resources.categories.name`, {
                            smart_count: 2,
                        })}
                    />
                </MenuItemList>
            </Box>
            {savedQueriesMenuItems.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        {translate(`pos.menu.my_queries`, {
                            smart_count: 1,
                        })}
                    </Typography>
                    <MenuItemList>
                        {savedQueriesMenuItems.map(({ label, to }) => (
                            <MenuItemNode
                                key={label}
                                name="products"
                                to={to}
                                label={label}
                            />
                        ))}
                    </MenuItemList>
                </Box>
            )}
        </Box>
    );
};

const usePersistedQueriesMenu = (
    resource: string
): { label: string; to: string }[] => {
    const [savedQueries] = useSavedQueries(resource);
    const savedQueriesMenuItems = savedQueries.map(({ label, value }) => ({
        label,
        to: `/${resource}?${querystring.stringify({
            filter: JSON.stringify(value.filter),
            sort: value?.sort?.field,
            order: value?.sort?.order,
            page: 1,
            perPage: value.perPage,
            displayedFilters: value.displayedFilters,
        })}`,
    }));

    return savedQueriesMenuItems;
};
