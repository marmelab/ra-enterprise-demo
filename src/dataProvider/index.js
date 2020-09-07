import simpleRestProvider from 'ra-data-simple-rest';
import compose from 'recompose/compose';

import addTreeMethodsBasedOnChildren from './addTreeMethodsBasedOnChildren';
import addRealtimeMethodsWithFakeTransport from './addRealtimeMethodsWithFakeTransport';

import localStorageProvider from './localStorageProvider';
import defaultState from '../tours/data';

const restProvider = compose(
    addRealtimeMethodsWithFakeTransport,
    addTreeMethodsBasedOnChildren
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