import simpleRestProvider from 'ra-data-simple-rest';
import compose from 'recompose/compose';
import { addLocksMethodsBasedOnALockResource } from '@react-admin/ra-realtime';
import { addTreeMethodsBasedOnChildren } from '@react-admin/ra-tree';

import addRealtimeMethodsWithFakeTransport from './addRealtimeMethodsWithFakeTransport';
import addSearchMethod from './addSearchMethod';

const restProvider = compose(
    addLocksMethodsBasedOnALockResource,
    addRealtimeMethodsWithFakeTransport,
    addTreeMethodsBasedOnChildren,
    addSearchMethod
)(simpleRestProvider('http://localhost:4000'));

const delayedDataProvider = new Proxy(restProvider, {
    get: (target, name, self) => {
        if (name === 'then') {
            return self;
        }

        return (resource, params) => {
            return new Promise(resolve =>
                setTimeout(
                    () => resolve(restProvider[name](resource, params)),
                    200
                )
            );
        };
    },
});

export default delayedDataProvider;
