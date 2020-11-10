import { SearchResult, SearchResultDataItem } from '@react-admin/ra-search';

const defaultFacets = ['customers', 'products', 'commands', 'reviews'];

const addSearchMethod = dataProvider => {
    return {
        ...dataProvider,
        search: async ({ facets, query }) => {
            const resultsByResource = await Promise.all<SearchResult>(
                (facets || defaultFacets).map(resource =>
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
                    (acc, resultForResource) => acc + resultForResource.total,
                    0
                ),
            };
        },
    };
};

export default addSearchMethod;

const ResultBuilders = {
    customers: async (record, dataProvider) => {
        const orders = await dataProvider.getList('commands', {
            filter: { customer_id: record.id, status: 'ordered' },
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'ASC' },
        });
        const reviews = await dataProvider.getList('reviews', {
            filter: { customer_id: record.id },
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'ASC' },
        });

        return {
            ...record,
            pending_orders: orders.total,
            reviews: reviews.total,
        };
    },
    products: async (record, dataProvider) => {
        const reviews = await dataProvider.getList('reviews', {
            filter: { product_id: record.id },
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'ASC' },
        });

        return {
            ...record,
            reviews: reviews.total,
        };
    },
    commands: async (record, dataProvider) => {
        const customer = await dataProvider.getOne('customers', {
            id: record.customer_id,
        });

        return {
            ...record,
            customer: customer.data,
        };
    },
    reviews: async record => {
        return record;
    },
};

const searchInResource = async (dataProvider, resource, query) => {
    const { data, total } = await dataProvider.getList(resource, {
        filter: { q: query },
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
    });

    return {
        data: await Promise.all(
            data.map(async record => ({
                id: `${resource}/${record.id}`,
                type: resource,
                url: `/${resource}/${record.id}`,
                content: await ResultBuilders[resource](record, dataProvider),
            }))
        ),
        total,
    };
};
