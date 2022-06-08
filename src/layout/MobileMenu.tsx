import * as React from 'react';
import { ReactNode, useState, ReactElement } from 'react';
import { Logout, useSidebarState, useTranslate } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AVTimerIcon from '@mui/icons-material/AvTimer';
import BlockIcon from '@mui/icons-material/Block';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TourIcon from '@mui/icons-material/Flag';
import EventsIcon from '@mui/icons-material/FormatListNumbered';
import querystring from 'query-string';

import { MultiLevelMenu, MenuItemNode } from '@react-admin/ra-navigation';

import {
    Box,
    Typography,
    Collapse,
    Tooltip,
    MenuItem as MUIMenuItem,
    ListItemIcon,
    List,
} from '@mui/material';

import { newCustomerFilter, visitorsFilter, pendingReviewFilter } from './Menu';
import categories from '../categories';
import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import reviews from '../reviews';
import stores from '../stores';
import { segments } from '../visitors/segments';

const MobileMenu = () => {
    const translate = useTranslate();
    const [menuState, setMenuState] = useState({
        sales: false,
        catalog: false,
        customers: false,
        segments: false,
        reviews: false,
    });
    const [open] = useSidebarState();
    const handleToggle = (
        menu: 'sales' | 'catalog' | 'customers' | 'segments' | 'reviews'
    ): void => {
        setMenuState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box
            sx={{
                minWidth: '50vw',
            }}
        >
            <MultiLevelMenu>
                <MenuItemNode
                    name="dashboard"
                    to="/"
                    end
                    label="ra.page.dashboard"
                    icon={<DashboardIcon />}
                />
                <SubMenu
                    icon={<products.icon />}
                    handleToggle={(): void => handleToggle('sales')}
                    isOpen={menuState.sales}
                    data-testid="commands-menu"
                    sidebarIsOpen={open}
                    label={translate('pos.menu.sales')}
                >
                    <MenuItemNode
                        name="commands"
                        to="/commands"
                        icon={<orders.icon />}
                        label={translate(`resources.commands.name`, {
                            smart_count: 2,
                        })}
                    />
                    <MenuItemNode
                        name="invoices"
                        to="/invoices?filter={}"
                        icon={<invoices.icon />}
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
                </SubMenu>
                <SubMenu
                    icon={<visitors.icon />}
                    handleToggle={(): void => handleToggle('customers')}
                    isOpen={menuState.customers}
                    sidebarIsOpen={open}
                    label={translate('pos.menu.customers')}
                >
                    <MenuItemNode
                        sx={{
                            paddingLeft: 1,
                        }}
                        name="customers.all_customers"
                        to={`/customers?filter={}`}
                        label={translate(`pos.menu.all_customers`, {
                            smart_count: 2,
                        })}
                    />
                    <MenuItemNode
                        sx={{
                            paddingLeft: 1,
                        }}
                        name="customers.newcomers"
                        to={`/customers?filter=${JSON.stringify(
                            newCustomerFilter
                        )}`}
                        label={translate(`pos.menu.new_customers`, {
                            smart_count: 2,
                        })}
                    />
                    <MenuItemNode
                        sx={{
                            paddingLeft: 1,
                        }}
                        name="customers.visitors"
                        to={`/customers?filter=${JSON.stringify(
                            visitorsFilter
                        )}`}
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
                            <MenuItemNode
                                sx={{
                                    paddingLeft: 1,
                                }}
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
                </SubMenu>
                <MenuItemNode
                    name="stores"
                    to="/stores"
                    icon={<stores.icon />}
                    label={translate(`resources.stores.name`, {
                        smart_count: 2,
                    })}
                />
                <MenuItemNode
                    name="tours"
                    to="/tours"
                    icon={<TourIcon />}
                    label="Tours"
                />
                <MenuItemNode
                    name="events"
                    to="/events"
                    icon={<EventsIcon />}
                    label={translate(`resources.events.name`, {
                        smart_count: 2,
                    })}
                />
                <span style={{ paddingLeft: 8 }}>
                    <Logout />
                </span>
            </MultiLevelMenu>
        </Box>
    );
};

export default MobileMenu;

const SubMenu = ({
    handleToggle,
    sidebarIsOpen,
    isOpen,
    icon,
    label,
    children,
    dense = false,
}: {
    children: ReactNode;
    dense?: boolean;
    handleToggle: () => void;
    icon: ReactElement;
    isOpen: boolean;
    label: string;
    sidebarIsOpen: boolean;
}) => {
    const header = (
        <MUIMenuItem
            sx={{
                py: '1.5px',
                px: '2px',
            }}
            dense={dense}
            onClick={handleToggle}
        >
            <ListItemIcon
                sx={{
                    minWidth: 5,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
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
                    sx={{
                        paddingLeft: 1.5,
                    }}
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
