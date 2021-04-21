import * as fns from 'date-fns';
import { Order, OrderStatus, Product } from '../types';
import { EventRecord } from '@react-admin/ra-audit-log';
import type { Data } from './index';

const createProductEvent = (
    product: Product,
    author: { id: string; fullName: string },
    date: Date
): Omit<EventRecord, 'id'> => {
    return {
        date: date.toISOString(),
        author,
        resource: 'products',
        action: 'create',
        payload: {
            id: product.id,
            data: product,
        },
    };
};

const changePriceEvent = (
    product: Product,
    author: { id: string; fullName: string },
    date: Date
): Omit<EventRecord, 'id'> => {
    return {
        date: date.toISOString(),
        author,
        resource: 'products',
        action: 'update',
        payload: {
            id: product.id,
            data: {
                ...product,
                price: product.price + Math.ceil(Math.random() * 10),
            },
            previousData: product,
        },
    };
};

const getRandomId = length => {
    return Math.floor(Math.random() * length);
};

const changeOrderStatusEvent = (
    order: Order,
    newStatus: OrderStatus,
    author: { id: string; fullName: string },
    date: Date
): Omit<EventRecord, 'id'> => {
    return {
        date: date.toISOString(),
        author,
        resource: 'commands',
        action: 'update',
        payload: {
            id: order.id,
            data: {
                ...order,
                status: newStatus,
            },
            previousData: order,
        },
    };
};

const generateFakeEvents = (data: Data): EventRecord[] => {
    const author = { id: 'demo', fullName: 'Demo' };

    const pickRandomProduct = () =>
        data.products[getRandomId(data.products.length)];

    const pendingOrders = data.commands.filter(
        command => command.status === 'ordered'
    );
    const pickRandomOrder = () =>
        pendingOrders[getRandomId(pendingOrders.length)];
    const now = new Date();
    const events = [
        // One week ago
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 7), 5)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 7), 4)
        ),
        createProductEvent(
            pickRandomProduct(),
            author,
            fns.subHours(fns.subDays(now, 7), 3)
        ),
        changePriceEvent(
            pickRandomProduct(),
            author,
            fns.subHours(fns.subDays(now, 7), 2)
        ),
        changePriceEvent(
            pickRandomProduct(),
            author,
            fns.subHours(fns.subDays(now, 7), 1)
        ),
        // Two day ago
        createProductEvent(
            pickRandomProduct(),
            author,
            fns.subHours(fns.subDays(now, 2), 4)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 2), 2)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 2), 1)
        ),
        changePriceEvent(
            pickRandomProduct(),
            author,
            fns.addHours(fns.subDays(now, 2), 1)
        ),
        // Yesterday
        changePriceEvent(
            pickRandomProduct(),
            author,
            fns.subHours(fns.subDays(now, 1), 4)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 1), 2)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 1), 1)
        ),
        createProductEvent(
            pickRandomProduct(),
            author,
            fns.addHours(fns.subDays(now, 1), 1)
        ),
        // Today
        createProductEvent(
            pickRandomProduct(),
            author,
            fns.subHours(fns.subDays(now, 1), 3)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            author,
            fns.subHours(fns.subDays(now, 1), 2)
        ),
    ];

    return events.map((event, index) => {
        return { id: index, ...event } as EventRecord;
    });
};

export default generateFakeEvents;
