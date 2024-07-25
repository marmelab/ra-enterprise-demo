import * as React from 'react';
import { useState, useEffect, ReactElement } from 'react';
import {
    useAuthProvider,
    useGetIdentity,
    useSavedQueries,
    useTranslate,
} from 'react-admin';
import { useSubscribeToRecordList } from '@react-admin/ra-realtime';
import { Avatar, Typography, styled, Badge } from '@mui/material';
import {
    SolarMenu,
    useAppLocationMatcher,
    useResourceAppLocation,
} from '@react-admin/ra-navigation';
import {
    EventNote as EventNoteIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    AvTimer as AvTimerIcon,
    Block as BlockIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import querystring from 'query-string';
import { endOfYesterday } from 'date-fns';

import { SearchSubMenu } from './SearchSubMenu';
import categories from '../categories';
import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import reviews from '../reviews';
import stores from '../stores';
import visits from '../visits';
import { segments } from '../visitors/segments';
import { ProfileSubMenu } from './ProfileSubMenu';
import SettingsIcon from '@mui/icons-material/Settings';

export const newCustomerFilter = querystring.stringify({
    filter: JSON.stringify({
        last_seen_gte: endOfYesterday().toISOString(),
    }),
});

export const visitorsFilter = querystring.stringify({
    filter: JSON.stringify({ nb_orders_lte: 0 }),
});

export const pendingReviewFilter = querystring.stringify({
    filter: JSON.stringify({ status: 'pending' }),
});

const useResourceChangeCounter = (
    resource: string,
    appLocation: string
): number => {
    const match = useAppLocationMatcher();
    const location = useResourceAppLocation();
    const [countEvent, setCountEvent] = useState(0);

    useSubscribeToRecordList(({ payload }) => {
        if (!payload || !payload.ids) {
            return;
        }

        let count = payload.ids.length;

        if (location && match(appLocation)) {
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
        if (match(appLocation)) {
            setCountEvent(0);
        }
    }, [match, appLocation]);

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

export const Menu = () => (
    <SolarMenu bottomToolbar={<CustomBottomToolbar />}>
        <SolarMenu.DashboardItem />
        <SalesMenuItem />
        <CatalogMenuItem />
        <CustomersMenuItem />
        <ReviewsMenuItem />
        <StoresMenuItem />
        <SolarMenu.Item
            name="events"
            to="/events"
            icon={<EventNoteIcon />}
            label="resources.events.name"
        />
    </SolarMenu>
);

const SalesMenuItem = (): ReactElement => {
    const ordersChangeCount = useResourceChangeCounter(
        'orders',
        'sales.orders'
    );
    const translate = useTranslate();
    return (
        <StyledBadgeForText badgeContent={ordersChangeCount} color="primary">
            <SolarMenu.Item
                name="sales"
                icon={<products.iconSales />}
                label="pos.menu.sales"
                data-testid="orders-menu"
                subMenu={
                    <>
                        <Typography variant="h6" gutterBottom ml={1}>
                            {translate(`pos.menu.sales`, { smart_count: 1 })}
                        </Typography>
                        <SolarMenu.List dense>
                            <StyledBadgeForText
                                badgeContent={ordersChangeCount}
                                color="primary"
                            >
                                <SolarMenu.Item
                                    name="sales.orders"
                                    to="/orders"
                                    icon={<orders.icon />}
                                    label={translate(`resources.orders.name`, {
                                        smart_count: 2,
                                    })}
                                />
                            </StyledBadgeForText>
                            <SolarMenu.Item
                                name="sales.invoices"
                                to="/invoices?filter={}"
                                icon={<invoices.icon />}
                                label={translate(`resources.invoices.name`, {
                                    smart_count: 2,
                                })}
                            />
                        </SolarMenu.List>
                    </>
                }
            />
        </StyledBadgeForText>
    );
};

const CatalogMenuItem = (): ReactElement => {
    const translate = useTranslate();
    const savedQueriesMenuItems = usePersistedQueriesMenu('products');

    return (
        <SolarMenu.Item
            name="catalog"
            icon={<products.icon />}
            label="pos.menu.catalog"
            subMenu={
                <>
                    <Typography variant="h6" gutterBottom ml={1}>
                        {translate(`pos.menu.catalog`, {
                            smart_count: 1,
                        })}
                    </Typography>
                    <SolarMenu.List dense>
                        <SolarMenu.Item
                            name="catalog.products"
                            to="/products"
                            icon={<products.icon />}
                            label={translate(`resources.products.name`, {
                                smart_count: 2,
                            })}
                        />
                        <SolarMenu.Item
                            name="catalog.categories"
                            to="/categories"
                            icon={<categories.icon />}
                            label={translate(`resources.categories.name`, {
                                smart_count: 2,
                            })}
                        />
                    </SolarMenu.List>
                    {savedQueriesMenuItems.length > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom mt={2} ml={1}>
                                {translate(`pos.menu.my_queries`, {
                                    smart_count: 1,
                                })}
                            </Typography>
                            <SolarMenu.List dense>
                                {savedQueriesMenuItems.map(({ label, to }) => (
                                    <SolarMenu.Item
                                        key={label}
                                        name="products"
                                        to={to}
                                        label={label}
                                    />
                                ))}
                            </SolarMenu.List>
                        </>
                    )}
                </>
            }
        />
    );
};

const CustomersMenuItem = () => {
    const translate = useTranslate();
    const savedQueriesMenuItems = usePersistedQueriesMenu('customers');
    return (
        <SolarMenu.Item
            name="customers"
            icon={<visitors.icon />}
            label="pos.menu.customers"
            subMenu={
                <>
                    <Typography variant="h6" gutterBottom ml={1}>
                        {translate(`resources.customers.name`, {
                            smart_count: 2,
                        })}
                    </Typography>
                    <SolarMenu.List dense>
                        <SolarMenu.Item
                            name="customers.all_customers"
                            to={`/customers?filter={}`}
                            label="pos.menu.all_customers"
                        />
                        <SolarMenu.Item
                            name="customers.newcomers"
                            to={`/customers?${newCustomerFilter}`}
                            label="pos.menu.new_customers"
                        />
                        <SolarMenu.Item
                            name="customers.visitors"
                            to={`/customers?${visitorsFilter}`}
                            label="pos.menu.visitors"
                        />
                    </SolarMenu.List>
                    <Typography variant="h6" gutterBottom mt={2} ml={1}>
                        {translate(`resources.segments.name`, {
                            smart_count: 2,
                        })}
                    </Typography>
                    <SolarMenu.List dense>
                        {segments.map(segment => (
                            <SolarMenu.Item
                                key={segment}
                                name={`segments.${segment}`}
                                to={`/customers?${querystring.stringify({
                                    filter: JSON.stringify({ groups: segment }),
                                })}`}
                                label={translate(
                                    `resources.segments.data.${segment}`,
                                    { smart_count: 2 }
                                )}
                            />
                        ))}
                    </SolarMenu.List>
                    {savedQueriesMenuItems.length > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom mt={2} ml={1}>
                                {translate(`pos.menu.my_queries`, {
                                    smart_count: 1,
                                })}
                            </Typography>
                            <SolarMenu.List>
                                {savedQueriesMenuItems.map(({ label, to }) => (
                                    <SolarMenu.Item
                                        key={label}
                                        name={`customers.${label}`}
                                        to={to}
                                        label={label}
                                    />
                                ))}
                            </SolarMenu.List>
                        </>
                    )}
                </>
            }
        />
    );
};

const ReviewsMenuItem = () => {
    const translate = useTranslate();
    const reviewsLabel = translate(`resources.reviews.name`, {
        smart_count: 2,
    });
    return (
        <SolarMenu.Item
            name="reviews"
            icon={<reviews.icon />}
            label={reviewsLabel}
            subMenu={
                <SolarMenu.List dense>
                    <Typography variant="h6" ml={1}>
                        {reviewsLabel}
                    </Typography>
                    <SolarMenu.Item
                        name="reviews.all"
                        to={'/reviews?filter={}'}
                        icon={<CheckCircleOutlineIcon />}
                        label="pos.menu.all_reviews"
                    />
                    <SolarMenu.Item
                        name="reviews.pending"
                        to={`/reviews?${pendingReviewFilter}`}
                        icon={<AvTimerIcon />}
                        label="pos.menu.pending_reviews"
                    />
                    <SolarMenu.Item
                        name="reviews.bad"
                        to={'/reviews?filter={"rating_lte": "2"}'}
                        icon={<BlockIcon />}
                        label="pos.menu.bad_reviews"
                    />
                </SolarMenu.List>
            }
        />
    );
};

const StoresMenuItem = (): ReactElement => {
    const translate = useTranslate();
    return (
        <SolarMenu.Item
            name="stores"
            icon={<stores.icon />}
            label="resources.stores.name"
            data-testid="stores-menu"
            subMenu={
                <>
                    <Typography variant="h6" gutterBottom ml={1}>
                        {translate(`resources.stores.name`, { smart_count: 1 })}
                    </Typography>
                    <SolarMenu.List dense>
                        <SolarMenu.Item
                            name="stores.stores"
                            to="/stores"
                            icon={<stores.icon />}
                            label={translate(`resources.stores.name`, {
                                smart_count: 2,
                            })}
                        />
                        <SolarMenu.Item
                            name="stores.visits"
                            to="/visits"
                            icon={<visits.icon />}
                            label={translate(`resources.visits.name`, {
                                smart_count: 2,
                            })}
                        />
                    </SolarMenu.List>
                </>
            }
        />
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

const CustomBottomToolbar = () => (
    <>
        <SearchMenuItem />
        <SolarMenu.LoadingIndicatorItem />
        <SolarMenuUserItem />
    </>
);

const SearchMenuItem = () => (
    <SolarMenu.Item
        icon={<SearchIcon />}
        label="pos.search"
        name="search"
        subMenu={<SearchSubMenu />}
        data-testid="search-button"
    />
);

const SolarMenuUserItem = () => {
    const { isPending, identity } = useGetIdentity();
    const authProvider = useAuthProvider();

    if (isPending) return null;
    const avatarSx = { maxWidth: '1.4em', maxHeight: '1.4em' };
    return (
        <SolarMenu.Item
            icon={
                authProvider ? (
                    identity?.avatar ? (
                        <Avatar
                            src={identity.avatar}
                            alt={identity.fullName}
                            sx={avatarSx}
                        />
                    ) : (
                        <Avatar sx={avatarSx} />
                    )
                ) : (
                    <SettingsIcon />
                )
            }
            label="pos.profile"
            name="profile"
            subMenu={<ProfileSubMenu />}
            data-testid="profile-button"
        />
    );
};
