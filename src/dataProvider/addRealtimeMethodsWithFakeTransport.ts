import { DataProvider } from 'ra-core';
import { RealTimeDataProvider, Subscriptions } from '@react-admin/ra-realtime';

let subscriptions: Subscriptions = [];

const addRealtimeMethodsWithFakeTransport = (
    dataProvider: DataProvider
): DataProvider & RealTimeDataProvider => {
    return {
        ...dataProvider,
        subscribe: async (topic, subscriptionCallback) => {
            subscriptions.push({ topic, subscriptionCallback });
            return Promise.resolve({ data: null });
        },

        unsubscribe: async (topic, subscriptionCallback) => {
            subscriptions = subscriptions.filter(
                subscription =>
                    subscription.topic !== topic ||
                    subscription.subscriptionCallback !== subscriptionCallback
            );
            return Promise.resolve({ data: null });
        },

        publish: (topic, event) => {
            if (!topic) {
                return Promise.reject(new Error('ra.realTime.error.topic'));
            }
            if (!event.type) {
                return Promise.reject(new Error('ra.realTime.error.type'));
            }
            subscriptions.map(
                subscription =>
                    topic === subscription.topic &&
                    subscription.subscriptionCallback(event)
            );
            return Promise.resolve({ data: null });
        },
    };
};

export default addRealtimeMethodsWithFakeTransport;
