import React, { FC, ReactNode, useState, useEffect, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-admin';
import { useSubscribeToRecordList } from '@react-admin/ra-realtime';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AVTimerIcon from '@material-ui/icons/AvTimer';
import BlockIcon from '@material-ui/icons/Block';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TourIcon from '@material-ui/icons/Flag';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { makeStyles } from '@material-ui/core/styles';
import querystring from 'query-string';

import {
    MultiLevelMenu,
    MenuItem,
    MenuItemCategory,
    useAppLocationMatcher,
    useResourceAppLocation,
    Menu as NavigationMenu,
} from '@react-admin/ra-navigation';
import {
    useSavedQueries,
    usePreferences,
    LanguageSwitcher,
} from '@react-admin/ra-preferences';

import {
    useMediaQuery,
    Theme,
    CardContent,
    Typography,
    withStyles,
    Badge,
    Box,
    Collapse,
    Tooltip,
    MenuItem as MUIMenuItem,
    ListItemIcon,
    List,
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

const useStyles = makeStyles(theme => ({
    icon: {
        minWidth: theme.spacing(5),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subMenu: {
        padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    },
}));

const SubMenu: FC<{
    dense?: boolean;
    handleToggle: () => void;
    icon: ReactElement;
    isOpen: boolean;
    name: string;
    sidebarIsOpen: boolean;
}> = ({
    handleToggle,
    sidebarIsOpen,
    isOpen,
    name,
    icon,
    children,
    dense = false,
}) => {
    const translate = useTranslate();
    const classes = useStyles();

    const header = (
        <MUIMenuItem
            className={classes.subMenu}
            dense={dense}
            button
            onClick={handleToggle}
        >
            <ListItemIcon className={classes.icon}>
                {isOpen ? <ExpandMore /> : icon}
            </ListItemIcon>
            <Typography variant="inherit" color="textSecondary">
                {translate(name)}
            </Typography>
        </MUIMenuItem>
    );

    return (
        <>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List dense={dense} component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </>
    );
};
const Menu: FC<Props> = ({ logout, onMenuClick }) => {
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );

    return isSmall || true ? (
        <MobileMenu logout={logout} onMenuClick={onMenuClick} />
    ) : (
        <DesktopMenu onMenuClick={onMenuClick} />
    );
};

export default Menu;

const MobileMenu: FC<Props> = ({ logout, onMenuClick }) => {
    const translate = useTranslate();
    const classes = useStyles();
    const [theme, setTheme] = usePreferences('theme', 'light');
    const [menuState, setMenuState] = useState({
        sales: false,
        catalog: false,
        customers: false,
        segments: false,
        reviews: false,
    });
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    const handleToggle = (
        menu: 'sales' | 'catalog' | 'customers' | 'segments' | 'reviews'
    ): void => {
        setMenuState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <MultiLevelMenu>
            <MenuItem
                name="dashboard"
                to="/"
                exact
                label="Dashboard"
                icon={<DashboardIcon />}
            />
            <SubMenu
                name="pos.menu.sales"
                icon={<products.icon />}
                handleToggle={(): void => handleToggle('sales')}
                isOpen={menuState.sales}
                data-testid="commands-menu"
                sidebarIsOpen={open}
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
                <MenuItem
                    name="invoices"
                    to="/invoices?filter={}"
                    icon={<invoices.icon />}
                    onClick={onMenuClick}
                    label={translate(`resources.invoices.name`, {
                        smart_count: 2,
                    })}
                />
            </SubMenu>
            <SubMenu
                name="pos.menu.catalog"
                icon={<products.icon />}
                handleToggle={(): void => handleToggle('catalog')}
                isOpen={menuState.catalog}
                sidebarIsOpen={open}
            >
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
            </SubMenu>
            <SubMenu
                name="pos.menu.customers"
                icon={<visitors.icon />}
                handleToggle={(): void => handleToggle('customers')}
                isOpen={menuState.customers}
                sidebarIsOpen={open}
            >
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
                    to={`/customers?filter=${JSON.stringify(visitorsFilter)}`}
                    onClick={onMenuClick}
                    label={translate(`pos.menu.visitors`, {
                        smart_count: 2,
                    })}
                />
                <SubMenu
                    name="resources.segments.name"
                    icon={<visitors.icon />}
                    handleToggle={(): void => handleToggle('segments')}
                    isOpen={menuState.segments}
                    sidebarIsOpen={open}
                >
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
                </SubMenu>
            </SubMenu>
            <SubMenu
                name={translate(`resources.reviews.name`, { smart_count: 2 })}
                icon={<reviews.icon />}
                handleToggle={(): void => handleToggle('reviews')}
                isOpen={menuState.reviews}
                sidebarIsOpen={open}
            >
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
            </SubMenu>
            <MenuItem
                name="stores"
                to="/stores"
                icon={<stores.icon />}
                onClick={onMenuClick}
                label={translate(`resources.stores.name`, { smart_count: 2 })}
            />
            <MenuItem
                name="tours"
                to="/tours"
                icon={<TourIcon />}
                onClick={onMenuClick}
                label="Tours"
            />
            <MUIMenuItem
                className={classes.subMenu}
                button
                onClick={(): void =>
                    setTheme(theme === 'light' ? 'dark' : 'light')
                }
            >
                <ListItemIcon className={classes.icon}>
                    {theme === 'light' ? (
                        <Brightness4Icon />
                    ) : (
                        <Brightness7Icon />
                    )}
                </ListItemIcon>
                <Typography variant="inherit" color="textSecondary">
                    Toggle theme
                </Typography>
            </MUIMenuItem>
            <LanguageSwitcher
                languages={[
                    { locale: 'en', name: 'English' },
                    { locale: 'fr', name: 'Français' },
                ]}
                defaultLanguage="English"
            />
            <span style={{ paddingLeft: 8 }}>{logout}</span>
        </MultiLevelMenu>
    );
};

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
