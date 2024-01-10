import simpleRestProvider from 'ra-data-simple-rest';
import { addLocksMethodsBasedOnALockResource } from '@react-admin/ra-realtime';
import { addTreeMethodsBasedOnChildren } from '@react-admin/ra-tree';
import { addRevisionMethodsBasedOnRelatedResource } from '@react-admin/ra-history';

import addRealtimeMethodsWithFakeTransport from './addRealtimeMethodsWithFakeTransport';
import addSearchMethod from './addSearchMethod';

const compose = (...funcs: any) =>
    funcs.reduce(
        (a: any, b: any) =>
            (...args: any) =>
                a(b(...args)),
        (arg: any) => arg
    );

const restProvider = compose(
    addLocksMethodsBasedOnALockResource,
    addRealtimeMethodsWithFakeTransport,
    addTreeMethodsBasedOnChildren,
    addSearchMethod,
    addRevisionMethodsBasedOnRelatedResource
)(simpleRestProvider('http://localhost:4000'));

const delayedDataProvider = new Proxy(restProvider, {
    get: (target, name, self) => {
        if (name === 'then') {
            return self;
        }

        return (resource: string, params: any) => {
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
