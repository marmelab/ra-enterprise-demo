import React, { FC, ReactNode, useState, useEffect, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-admin';
import { useSubscribeToRecordList } from '@react-admin/ra-realtime';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AVTimerIcon from '@material-ui/icons/AvTimer';
import BlockIcon from '@material-ui/icons/Block';
import querystring from 'query-string';

import {
    MultiLevelMenu,
    MenuItem,
    MenuItemCategory,
    Menu as NavigationMenu,
    useAppLocationMatcher,
    useResourceAppLocation,
} from '@react-admin/ra-navigation';

import {
    useMediaQuery,
    Theme,
    CardContent,
    Typography,
    withStyles,
    Badge,
    Box,
} from '@material-ui/core';

import categories from '../categories';
import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import reviews from '../reviews';
import stores from '../stores';
import { AppState } from '../types';
import { segments } from '../visitors/segments';
import { useSavedQueries } from '@react-admin/ra-preferences';

interface Props {
    logout?: ReactNode;
    onMenuClick?: () => void;
}

const newCustomerFilter = { last_seen_gte: '2020-07-31T22:00:00.000Z' };
const visitorsFilter = { nb_commands_lte: 0 };

const useResourceChangeCounter = (resource: string): number => {
    const match = useAppLocationMatcher();
    const location = useResourceAppLocation();
    const [countEvent, setCountEvent] = useState(0);

    useSubscribeToRecordList(resource, ({ payload }) => {
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
    });

    useEffect(() => {
        if (match(resource)) {
            setCountEvent(0);
        }
    }, [match, resource]);

    return countEvent;
};

const StyledBadgeForText = withStyles(theme => ({
    badge: {
        top: 13,
        right: 13,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const Menu: FC<Props> = ({ onMenuClick }) => {
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const commandsChangeCount = useResourceChangeCounter('commands');
    const translate = useTranslate();

    if (isSmall) {
        return (
            <MultiLevelMenu>
                <MenuItem
                    name="dashboard"
                    to="/"
                    exact
                    icon={<DashboardIcon />}
                    onClick={onMenuClick}
                    label="ra.page.dashboard"
                />
                <MenuItem
                    name="sales"
                    icon={<products.icon />}
                    label={translate(`pos.menu.sales`, { smart_count: 1 })}
                    data-testid="commands-menu"
                    to="/"
                >
                    <StyledBadgeForText
                        badgeContent={commandsChangeCount}
                        color="primary"
                    >
                        <MenuItem
                            name="commands"
                            to="/commands"
                            icon={<orders.icon />}
                            onClick={onMenuClick}
                            label={translate(`resources.commands.name`, {
                                smart_count: 2,
                            })}
                        />
                    </StyledBadgeForText>
                    <MenuItem
                        name="invoices"
                        to="/invoices?filter={}"
                        icon={<invoices.icon />}
                        onClick={onMenuClick}
                        label={translate(`resources.invoices.name`, {
                            smart_count: 2,
                        })}
                    />
                </MenuItem>
                <Typography variant="h6" gutterBottom>
                    {translate(`pos.menu.sales`, { smart_count: 1 })}
                </Typography>

                <CatalogMenu onMenuClick={onMenuClick} />
                <MenuItem
                    name="customers"
                    to="/customers?filter={}"
                    icon={<invoices.icon />}
                    onClick={onMenuClick}
                    label={translate(`pos.menu.customers`, { smart_count: 2 })}
                >
                    <CustomersMenu onMenuClick={onMenuClick} />
                </MenuItem>
                <MenuItem
                    name="reviews.all"
                    to={'/reviews?filter={}'}
                    icon={<CheckCircleOutlineIcon />}
                    onClick={onMenuClick}
                    label="pos.menu.all_reviews"
                >
                    <MenuItem
                        name="reviews.pending"
                        to={'/reviews?filter={"status": "pending"}'}
                        icon={<AVTimerIcon />}
                        onClick={onMenuClick}
                        label="pos.menu.pending_reviews"
                    />
                    <MenuItem
                        name="reviews.bad"
                        to={'/reviews?filter={"rating_lte": "2"}'}
                        icon={<BlockIcon />}
                        onClick={onMenuClick}
                        label="pos.menu.bad_reviews"
                    />
                </MenuItem>
            </MultiLevelMenu>
        );
    }

    return <DesktopMenu onMenuClick={onMenuClick} />;
};

export default Menu;

const DesktopMenu: FC<Props> = ({ onMenuClick }) => {
    const translate = useTranslate();
    const commandsChangeCount = useResourceChangeCounter('commands');

    return (
        <MultiLevelMenu variant="categories">
            <MenuItemCategory
                name="dashboard"
                to="/"
                exact
                icon={<DashboardIcon />}
                onClick={onMenuClick}
                label="ra.page.dashboard"
            />
            <StyledBadgeForText
                badgeContent={commandsChangeCount}
                color="primary"
            >
                <MenuItemCategory
                    name="sales"
                    icon={<products.icon />}
                    onClick={onMenuClick}
                    label={translate(`pos.menu.sales`, { smart_count: 1 })}
                    data-testid="commands-menu"
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {translate(`pos.menu.sales`, { smart_count: 1 })}
                        </Typography>
                        <NavigationMenu>
                            <StyledBadgeForText
                                badgeContent={commandsChangeCount}
                                color="primary"
                            >
                                <MenuItem
                                    name="commands"
                                    to="/commands"
                                    icon={<orders.icon />}
                                    onClick={onMenuClick}
                                    label={translate(
                                        `resources.commands.name`,
                                        {
                                            smart_count: 2,
                                        }
                                    )}
                                />
                            </StyledBadgeForText>
                            <MenuItem
                                name="invoices"
                                to="/invoices?filter={}"
                                icon={<invoices.icon />}
                                onClick={onMenuClick}
                                label={translate(`resources.invoices.name`, {
                                    smart_count: 2,
                                })}
                            />
                        </NavigationMenu>
                    </CardContent>
                </MenuItemCategory>
            </StyledBadgeForText>
            <MenuItemCategory
                name="catalog"
                icon={<products.icon />}
                onClick={onMenuClick}
                label={translate(`pos.menu.catalog`, { smart_count: 1 })}
            >
                <CardContent>
                    <CatalogMenu onMenuClick={onMenuClick} />
                </CardContent>
            </MenuItemCategory>
            <MenuItemCategory
                name="customers"
                icon={<visitors.icon />}
                onClick={onMenuClick}
                label={translate(`pos.menu.customers`, { smart_count: 2 })}
            >
                <CustomersMenu onMenuClick={onMenuClick} />
            </MenuItemCategory>
            <MenuItemCategory
                name="reviews"
                icon={<reviews.icon />}
                onClick={onMenuClick}
                label={translate(`resources.reviews.name`, { smart_count: 2 })}
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate(`resources.reviews.name`, {
                            smart_count: 2,
                        })}
                    </Typography>{' '}
                    <NavigationMenu>
                        <MenuItem
                            name="reviews.all"
                            to={'/reviews?filter={}'}
                            icon={<CheckCircleOutlineIcon />}
                            onClick={onMenuClick}
                            label="pos.menu.all_reviews"
                        />
                        <MenuItem
                            name="reviews.pending"
                            to={'/reviews?filter={"status": "pending"}'}
                            icon={<AVTimerIcon />}
                            onClick={onMenuClick}
                            label="pos.menu.pending_reviews"
                        />
                        <MenuItem
                            name="reviews.bad"
                            to={'/reviews?filter={"rating_lte": "2"}'}
                            icon={<BlockIcon />}
                            onClick={onMenuClick}
                            label="pos.menu.bad_reviews"
                        />
                    </NavigationMenu>
                </CardContent>
            </MenuItemCategory>
            <MenuItemCategory
                name="stores"
                to="/stores"
                icon={<stores.icon />}
                onClick={onMenuClick}
                label={translate(`resources.stores.name`, { smart_count: 2 })}
            />
        </MultiLevelMenu>
    );
};

const CustomersMenu: FC<{ onMenuClick: (() => void) | undefined }> = ({
    onMenuClick,
}) => {
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
                    <NavigationMenu>
                        <MenuItem
                            name="customers.all_customers"
                            to={`/customers?filter={}`}
                            onClick={onMenuClick}
                            label={translate(`pos.menu.all_customers`, {
                                smart_count: 2,
                            })}
                        />
                        <MenuItem
                            name="customers.newcomers"
                            to={`/customers?filter=${JSON.stringify(
                                newCustomerFilter
                            )}`}
                            onClick={onMenuClick}
                            label={translate(`pos.menu.new_customers`, {
                                smart_count: 2,
                            })}
                        />
                        <MenuItem
                            name="customers.visitors"
                            to={`/customers?filter=${JSON.stringify(
                                visitorsFilter
                            )}`}
                            onClick={onMenuClick}
                            label={translate(`pos.menu.visitors`, {
                                smart_count: 2,
                            })}
                        />
                    </NavigationMenu>
                    <Typography variant="h6" gutterBottom>
                        {translate(`resources.segments.name`, {
                            smart_count: 2,
                        })}
                    </Typography>
                    <NavigationMenu>
                        {segments.map(segment => (
                            <MenuItem
                                key={segment}
                                name={`segments.${segment}`}
                                to={`/customers?filter={"groups": "${segment}"}`}
                                onClick={onMenuClick}
                                label={translate(
                                    `resources.segments.data.${segment}`,
                                    {
                                        smart_count: 2,
                                    }
                                )}
                            />
                        ))}
                    </NavigationMenu>
                </Box>
                {savedQueriesMenuItems.length > 0 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {translate(`pos.menu.my_queries`, {
                                smart_count: 1,
                            })}
                        </Typography>
                        <NavigationMenu>
                            {savedQueriesMenuItems.map(({ label, to }) => (
                                <MenuItem
                                    key={label}
                                    name="customers"
                                    to={to}
                                    onClick={onMenuClick}
                                    label={label}
                                />
                            ))}
                        </NavigationMenu>
                    </Box>
                )}
            </Box>
        </CardContent>
    );
};

const CatalogMenu = (props: {
    onMenuClick: (() => void) | undefined;
}): ReactElement => {
    const { onMenuClick } = props;
    const translate = useTranslate();
    const savedQueriesMenuItems = usePersistedQueriesMenu('products');

    return (
        <Box display="flex" justifyContent="space-between">
            <Box marginRight={savedQueriesMenuItems.length > 0 ? 2 : 0}>
                <Typography variant="h6" gutterBottom>
                    {translate(`pos.menu.catalog`, {
                        smart_count: 1,
                    })}
                </Typography>
                <NavigationMenu>
                    <MenuItem
                        name="products"
                        to="/products"
                        icon={<products.icon />}
                        onClick={onMenuClick}
                        label={translate(`resources.products.name`, {
                            smart_count: 2,
                        })}
                    />
                    <MenuItem
                        name="categories"
                        to="/categories/5"
                        icon={<categories.icon />}
                        onClick={onMenuClick}
                        label={translate(`resources.categories.name`, {
                            smart_count: 2,
                        })}
                    />
                </NavigationMenu>
            </Box>
            {savedQueriesMenuItems.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        {translate(`pos.menu.my_queries`, {
                            smart_count: 1,
                        })}
                    </Typography>
                    <NavigationMenu>
                        {savedQueriesMenuItems.map(({ label, to }) => (
                            <MenuItem
                                key={label}
                                name="products"
                                to={to}
                                onClick={onMenuClick}
                                label={label}
                            />
                        ))}
                    </NavigationMenu>
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
