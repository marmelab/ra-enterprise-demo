import * as fns from 'date-fns';
import { EventRecord } from '@react-admin/ra-audit-log';
import type { Data } from './index';
import avatars from './avatars';
import { Order, OrderStatus, Product } from '../types';
import { demoUser } from '../authProvider';

const createProductEvent = (
    product: Product,
    author: EventRecord['author'],
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
    author: EventRecord['author'],
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

const changeOrderStatusEvent = (
    order: Order,
    newStatus: OrderStatus,
    author: EventRecord['author'],
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

const getRandomId = length => {
    return Math.floor(Math.random() * length);
};

const admins = [
    demoUser,
    {
        id: 0,
        avatar: avatars[0],
        fullName: 'Toni Rosser',
    },
    {
        id: 1,
        avatar: avatars[1],
        fullName: 'Iris Bailey',
    },
    {
        id: 2,
        avatar: avatars[2],
        fullName: 'Rocky Coon',
    },
    {
        id: 3,
        avatar: avatars[3],
        fullName: 'Victoria Scott',
    },
    {
        id: 4,
        avatar: avatars[4],
        fullName: 'Sharon Stephenson',
    },
];

const generateFakeEvents = (data: Data): EventRecord[] => {
    const pickRandomAuthor = (): EventRecord['author'] =>
        admins[getRandomId(admins.length)];
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
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 7), 5)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 7), 4)
        ),
        createProductEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 7), 3)
        ),
        changePriceEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 7), 2)
        ),
        changePriceEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 7), 1)
        ),
        // Two day ago
        createProductEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 2), 4)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 2), 2)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 2), 1)
        ),
        changePriceEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.addHours(fns.subDays(now, 2), 1)
        ),
        // Yesterday
        changePriceEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 1), 4)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 1), 2)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 1), 1)
        ),
        createProductEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.addHours(fns.subDays(now, 1), 1)
        ),
        // Today
        createProductEvent(
            pickRandomProduct(),
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 1), 3)
        ),
        changeOrderStatusEvent(
            pickRandomOrder(),
            'delivered',
            pickRandomAuthor(),
            fns.subHours(fns.subDays(now, 1), 2)
        ),
    ];

    return events.map((event, index) => {
        return { id: index, ...event } as EventRecord;
    });
};

export default generateFakeEvents;
