import simpleRestProvider from 'ra-data-simple-rest';
import compose from 'recompose/compose';
import { addLocksMethodsBasedOnALockResource } from '@react-admin/ra-realtime';
import { addTreeMethodsBasedOnChildren } from '@react-admin/ra-tree';

import addRealtimeMethodsWithFakeTransport from './addRealtimeMethodsWithFakeTransport';
import addSearchMethod from './addSearchMethod';
import localStorageProvider from './localStorageProvider';

import defaultState from '../tours/data';

const getCustomerResult = async (record, dataProvider) => {
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
};

const getProductResult = async (record, dataProvider) => {
    const reviews = await dataProvider.getList('reviews', {
        filter: { product_id: record.id },
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
    });

    return {
        ...record,
        reviews: reviews.total,
    };
};

const getCommandResult = async (record, dataProvider) => {
    const customer = await dataProvider.getOne('customers', {
        id: record.customer_id,
    });

    return {
        ...record,
        customer: customer.data,
    };
};

const restProvider = compose(
    addLocksMethodsBasedOnALockResource,
    addRealtimeMethodsWithFakeTransport,
    addTreeMethodsBasedOnChildren,
    dataProvider =>
        addSearchMethod(dataProvider, {
            customers: { getResult: getCustomerResult },
            products: { getResult: getProductResult },
            commands: { getResult: getCommandResult },
            reviews: {},
        })
)(simpleRestProvider('http://localhost:4000'));

const customProviders = {
    tours: localStorageProvider(defaultState),
};

const customMethods = {};
const delayedDataProvider = new Proxy(restProvider, {
    get: (target, name, self) => {
        if (name === 'then') {
            return self;
        }

        return (resource, params) => {
            let provider = restProvider;
            if (customProviders[resource]) {
                provider = customProviders[resource];
            }

            if (customMethods[resource]) {
                provider = {
                    ...provider,
                    ...customMethods[resource](provider),
                };
            }

            return new Promise(resolve =>
                setTimeout(() => resolve(provider[name](resource, params)), 500)
            );
        };
    },
});

export default delayedDataProvider;
