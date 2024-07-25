import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    useListContext,
    SavedQueriesList,
} from 'react-admin';
import { useGetTree, Tree } from '@react-admin/ra-tree';

const Aside = () => {
    const { displayedFilters, filterValues, setFilters } = useListContext();
    const { data } = useGetTree('categories');

    const defaultExpandedKeys = filterValues.category_id
        ? [filterValues.category_id.toString()]
        : !!data
          ? [data[0].id.toString()]
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
    return (
        <Card
            sx={{
                display: { xs: 'none', md: 'block' },
                order: -1,
                width: '15em',
                mr: 2,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{ pt: 1 }}>
                <FilterLiveSearch />
                <SavedQueriesList />

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
                        // HACK: ensure the tree is updated and expand nodes correctly
                        // see https://github.com/react-component/tree/issues/234#issuecomment-599297897
                        // I tried passing a JSON.stringify version of
                        // defaultSelectedKeys and defaultExpandedKeys without success
                        // key={Math.random()}
                        data={data ?? []}
                        onSelect={handleSelectCategory}
                        defaultExpandedKeys={defaultExpandedKeys}
                        defaultSelectedKeys={defaultSelectedKeys}
                        autoExpandParent
                        titleField="name"
                    />
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
