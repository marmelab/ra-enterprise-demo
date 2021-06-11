import React, { FC, ReactNode, useState, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'react-admin';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AVTimerIcon from '@material-ui/icons/AvTimer';
import BlockIcon from '@material-ui/icons/Block';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TourIcon from '@material-ui/icons/Flag';
import { makeStyles } from '@material-ui/core/styles';
import EventsIcon from '@material-ui/icons/FormatListNumbered';
import querystring from 'query-string';

import { MultiLevelMenu, MenuItem } from '@react-admin/ra-navigation';

import {
    Typography,
    Collapse,
    Tooltip,
    MenuItem as MUIMenuItem,
    ListItemIcon,
    List,
} from '@material-ui/core';

import { newCustomerFilter, visitorsFilter, pendingReviewFilter } from './Menu';
import categories from '../categories';
import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import reviews from '../reviews';
import stores from '../stores';
import { AppState } from '../types';
import { segments } from '../visitors/segments';

const MobileMenu: FC<{
    logout?: ReactNode;
    onMenuClick?: () => void;
}> = ({ logout, onMenuClick }) => {
    const classes = useStyles();
    const translate = useTranslate();
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
        <div className={classes.menu}>
            <MultiLevelMenu>
                <MenuItem
                    name="dashboard"
                    to="/"
                    exact
                    label="ra.page.dashboard"
                    icon={<DashboardIcon />}
                    onClick={onMenuClick}
                />
                <SubMenu
                    icon={<products.icon />}
                    handleToggle={(): void => handleToggle('sales')}
                    isOpen={menuState.sales}
                    data-testid="commands-menu"
                    sidebarIsOpen={open}
                    label={translate('pos.menu.sales')}
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
                    icon={<products.icon />}
                    handleToggle={(): void => handleToggle('catalog')}
                    isOpen={menuState.catalog}
                    sidebarIsOpen={open}
                    label={translate('pos.menu.catalog')}
                >
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
                        to="/categories"
                        icon={<categories.icon />}
                        onClick={onMenuClick}
                        label={translate(`resources.categories.name`, {
                            smart_count: 2,
                        })}
                    />
                </SubMenu>
                <SubMenu
                    icon={<visitors.icon />}
                    handleToggle={(): void => handleToggle('customers')}
                    isOpen={menuState.customers}
                    sidebarIsOpen={open}
                    label={translate('pos.menu.customers')}
                >
                    <MenuItem
                        className={classes.noIconPadding}
                        name="customers.all_customers"
                        to={`/customers?filter={}`}
                        onClick={onMenuClick}
                        label={translate(`pos.menu.all_customers`, {
                            smart_count: 2,
                        })}
                    />
                    <MenuItem
                        className={classes.noIconPadding}
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
                        className={classes.noIconPadding}
                        name="customers.visitors"
                        to={`/customers?filter=${JSON.stringify(
                            visitorsFilter
                        )}`}
                        onClick={onMenuClick}
                        label={translate(`pos.menu.visitors`, {
                            smart_count: 2,
                        })}
                    />
                    <SubMenu
                        icon={<visitors.icon />}
                        handleToggle={(): void => handleToggle('segments')}
                        isOpen={menuState.segments}
                        sidebarIsOpen={open}
                        label={translate('resources.segments.name')}
                    >
                        {segments.map(segment => (
                            <MenuItem
                                className={classes.noIconPadding}
                                key={segment}
                                name={`segments.${segment}`}
                                to={`/customers?${querystring.stringify({
                                    filter: JSON.stringify({ groups: segment }),
                                })}`}
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
                    icon={<reviews.icon />}
                    handleToggle={(): void => handleToggle('reviews')}
                    isOpen={menuState.reviews}
                    sidebarIsOpen={open}
                    label={translate(`resources.reviews.name`, {
                        smart_count: 2,
                    })}
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
                        to={`/reviews?${pendingReviewFilter}`}
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
                    label={translate(`resources.stores.name`, {
                        smart_count: 2,
                    })}
                />
                <MenuItem
                    name="tours"
                    to="/tours"
                    icon={<TourIcon />}
                    onClick={onMenuClick}
                    label="Tours"
                />
                <MenuItem
                    name="events"
                    to="/events"
                    icon={<EventsIcon />}
                    onClick={onMenuClick}
                    label={translate(`resources.events.name`, {
                        smart_count: 2,
                    })}
                />
                <span style={{ paddingLeft: 8 }}>{logout}</span>
            </MultiLevelMenu>
        </div>
    );
};

export default MobileMenu;

const SubMenu: FC<{
    dense?: boolean;
    handleToggle: () => void;
    icon: ReactElement;
    isOpen: boolean;
    label: string;
    sidebarIsOpen: boolean;
}> = ({
    handleToggle,
    sidebarIsOpen,
    isOpen,
    icon,
    label,
    children,
    dense = false,
}) => {
    const classes = useStyles();

    const header = (
        <MUIMenuItem
            className={classes.subMenuItem}
            dense={dense}
            button
            onClick={handleToggle}
        >
            <ListItemIcon className={classes.icon}>
                {isOpen ? <ExpandMore /> : icon}
            </ListItemIcon>
            <Typography variant="inherit" color="textSecondary">
                {label}
            </Typography>
        </MUIMenuItem>
    );

    return (
        <>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={label} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List
                    className={classes.subMenuContainer}
                    dense={dense}
                    component="div"
                    disablePadding
                >
                    {children}
                </List>
            </Collapse>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    menu: {
        minWidth: '50vw',
    },
    icon: {
        minWidth: theme.spacing(5),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subMenuItem: {
        padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    },
    subMenuContainer: {
        paddingLeft: theme.spacing(1.5),
    },
    noIconPadding: {
        paddingLeft: theme.spacing(1),
    },
}));
