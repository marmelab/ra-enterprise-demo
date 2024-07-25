import { SearchResultDataItem } from '@react-admin/ra-search';
import { DataProvider } from 'react-admin';

const addSearchMethod = (dataProvider: DataProvider) => {
    return {
        ...dataProvider,
        search: async (query: string) => {
            const resultsByResource = await Promise.all(
                ['customers', 'products', 'orders', 'reviews'].map(resource =>
                    searchInResource(dataProvider, resource, query)
                )
            );

            return {
                data: resultsByResource.reduce(
                    (acc, resultForResource) => [
                        ...acc,
                        ...resultForResource.data,
                    ],
                    [] as SearchResultDataItem[]
                ),
                total: resultsByResource.reduce(
                    (acc, resultForResource) =>
                        acc +
                        (resultForResource ? resultForResource.total || 0 : 0),
                    0
                ),
            };
        },
    };
};

export default addSearchMethod;

const searchInResource = async (
    dataProvider: DataProvider,
    resource: string,
    query: string
) => {
    const { data, total } = await dataProvider.getList(resource, {
        filter: { q: query },
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'id', order: 'ASC' },
    });

    return {
        data: await Promise.all(
            data.map(async record => ({
                id: `${resource}/${record.id}`,
                type: resource,
                url: `/${resource}/${record.id}`,
                content: await ResultBuilders[resource](record, dataProvider),
            })) as unknown as SearchResultDataItem[]
        ),
        total,
    };
};

const ResultBuilders: Record<string, any> = {
    customers: async (record: any, dataProvider: DataProvider) => {
        const orders = await dataProvider.getList('orders', {
            filter: { customer_id: record.id },
            pagination: { page: 1, perPage: 1 },
            sort: { field: 'id', order: 'ASC' },
        });
        const reviews = await dataProvider.getList('reviews', {
            filter: { customer_id: record.id },
            pagination: { page: 1, perPage: 1 },
            sort: { field: 'id', order: 'ASC' },
        });

        return {
            ...record,
            pending_orders: orders.total,
            reviews: reviews.total,
        };
    },
    products: async (record: any, dataProvider: DataProvider) => {
        const reviews = await dataProvider.getList('reviews', {
            filter: { product_id: record.id },
            pagination: { page: 1, perPage: 1 },
            sort: { field: 'id', order: 'ASC' },
        });

        return {
            ...record,
            reviews: reviews.total,
        };
    },
    orders: async (record: any, dataProvider: DataProvider) => {
        const customer = await dataProvider.getOne('customers', {
            id: record.customer_id,
        });

        return {
            ...record,
            customer: customer.data,
        };
    },
    reviews: async (record: any) => {
        return record;
    },
};
