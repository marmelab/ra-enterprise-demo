import * as React from 'react';
import { ReactElement } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    ListProps,
} from 'react-admin';
import { useListFilterContext } from 'ra-core';
import { useGetTree, Tree, getRCTree } from '@react-admin/ra-tree';
import { SavedQueriesList } from '@react-admin/ra-preferences';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '15em',
            marginRight: '1em',
            overflow: 'initial',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

const Aside = (props: ListProps): ReactElement => {
    const { setFilters, filterValues, displayedFilters } = useListFilterContext(
        props
    );

    const { data } = useGetTree('categories');

    const tree = data ? getRCTree(data, 'name') : undefined;

    const defaultExpandedKeys = filterValues.category_id
        ? [filterValues.category_id.toString()]
        : !!tree
        ? [tree[0].key]
        : undefined;

    const defaultSelectedKeys =
        filterValues.category_id !== undefined
            ? [filterValues.category_id.toString()]
            : [];

    const handleSelectCategory = (
        selectedKeys: any,
        { selectedNodes }: any
    ): void => {
        const [{ id }] = selectedNodes;

        setFilters(
            {
                ...filterValues,
                category_id: id,
            },
            displayedFilters
        );
    };

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <SavedQueriesList />
                <FilterLiveSearch />

                <FilterList
                    label="resources.products.filters.sales"
                    icon={<AttachMoneyIcon />}
                >
                    <FilterListItem
                        label="resources.products.filters.best_sellers"
                        value={{
                            sales_lte: undefined,
                            sales_gt: 25,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.products.filters.average_sellers"
                        value={{
                            sales_lte: 25,
                            sales_gt: 10,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.products.filters.low_sellers"
                        value={{
                            sales_lte: 10,
                            sales_gt: 0,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.products.filters.never_sold"
                        value={{
                            sales_lte: undefined,
                            sales_gt: undefined,
                            sales: 0,
                        }}
                    />
                </FilterList>

                <FilterList
                    label="resources.products.filters.stock"
                    icon={<BarChartIcon />}
                >
                    <FilterListItem
                        label="resources.products.filters.no_stock"
                        value={{
                            stock_lt: undefined,
                            stock_gt: undefined,
                            stock: 0,
                        }}
                    />
                    <FilterListItem
                        label="resources.products.filters.low_stock"
                        value={{
                            stock_lt: 10,
                            stock_gt: 0,
                            stock: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.products.filters.average_stock"
                        value={{
                            stock_lt: 50,
                            stock_gt: 9,
                            stock: undefined,
                        }}
                    />
                    <FilterListItem
                        label="resources.products.filters.enough_stock"
                        value={{
                            stock_lt: undefined,
                            stock_gt: 49,
                            stock: undefined,
                        }}
                    />
                </FilterList>

                <FilterList
                    label="resources.products.filters.categories"
                    icon={<LocalOfferIcon />}
                >
                    <Tree
                        // HACK: ensure the tree is updated and expland nodes correctly
                        // see https://github.com/react-component/tree/issues/234#issuecomment-599297897
                        // I tried passing a JSON.stringify version of
                        // defaultSelectedKeys and defaultExpandedKeys without success
                        key={Math.random()}
                        treeData={tree ? tree[0].children : []}
                        onSelect={handleSelectCategory}
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultExpandedKeys={defaultExpandedKeys}
                        autoExpandParent
                    />
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
