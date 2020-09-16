import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-admin';
import { useSubscribeToRecordList } from '@react-admin/ra-realtime';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AVTimerIcon from '@material-ui/icons/AvTimer';
import BlockIcon from '@material-ui/icons/Block';

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

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const newCustomerFilter = { last_seen_gte: '2020-07-31T22:00:00.000Z' };
const formerCustomerFilter = { last_seen_lte: '2020-06-30T22:00:00.000Z' };

const useResourceChangeCounter = (resource: string) => {
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

const Menu: FC<Props> = ({ onMenuClick, logout }) => {
    const translate = useTranslate();
    const commandsChangeCount = useResourceChangeCounter('commands');

    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );

    useSelector((state: AppState) => state.theme); // force rerender on theme change

    return (
        <MultiLevelMenu variant="categories">
            <MenuItemCategory
                name="dashboard"
                to="/"
                exact
                icon={<DashboardIcon />}
                onClick={onMenuClick}
                label="Dashboard"
            />
            <MenuItemCategory
                to="/products"
                name="catalog"
                icon={<products.icon />}
                onClick={onMenuClick}
                label={translate(`pos.menu.catalog`, { smart_count: 1 })}
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate(`pos.menu.catalog`, { smart_count: 1 })}
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
                </CardContent>
            </MenuItemCategory>
            <StyledBadgeForText
                badgeContent={commandsChangeCount}
                color="primary"
            >
                <MenuItemCategory
                    name="commands"
                    to="/commands"
                    icon={<orders.icon />}
                    onClick={onMenuClick}
                    label={translate(`resources.commands.name`, {
                        smart_count: 2,
                    })}
                    data-testid="commands-menu"
                />
            </StyledBadgeForText>
            <MenuItemCategory
                name="invoices"
                to="/invoices?filter={}"
                icon={<invoices.icon />}
                onClick={onMenuClick}
                label={translate(`resources.invoices.name`, {
                    smart_count: 2,
                })}
            />
            <MenuItemCategory
                to={`/customers`}
                name="audience"
                icon={<visitors.icon />}
                onClick={onMenuClick}
                label={translate(`pos.menu.audience`, { smart_count: 2 })}
            >
                <AudienceMenu onMenuClick={onMenuClick} />
            </MenuItemCategory>
            <MenuItemCategory
                name="reviews"
                to="/reviews?filter={}"
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
                            name="reviews.accepted"
                            to={'/reviews?filter={"status": "accepted"}'}
                            icon={<CheckCircleOutlineIcon />}
                            onClick={onMenuClick}
                            label="pos.reviews.accepted"
                        />
                        <MenuItem
                            name="reviews.rejected"
                            to={'/reviews?filter={"status": "rejected"}'}
                            icon={<BlockIcon />}
                            onClick={onMenuClick}
                            label="pos.reviews.rejected"
                        />
                        <MenuItem
                            name="reviews.pending"
                            to={'/reviews?filter={"status": "pending"}'}
                            icon={<AVTimerIcon />}
                            onClick={onMenuClick}
                            label="pos.reviews.pending"
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
            {isXSmall && logout}
        </MultiLevelMenu>
    );
};

export default Menu;

const AudienceMenu = ({ onMenuClick }) => {
    const translate = useTranslate();

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
                            name="customers.former_customers"
                            to={`/customers?filter=${JSON.stringify(
                                formerCustomerFilter
                            )}`}
                            onClick={onMenuClick}
                            label={translate(`pos.menu.former_customers`, {
                                smart_count: 2,
                            })}
                        />
                    </NavigationMenu>
                </Box>
                <Box>
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
            </Box>
        </CardContent>
    );
};
