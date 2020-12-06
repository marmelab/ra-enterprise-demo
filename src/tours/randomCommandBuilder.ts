import { Order } from '../types';
import { Record } from 'react-admin';

/**
 * Generate random commands
 *
 * This generator assumes that:
 * - Customer ids exist until 50
 * - Product ids exist until 20
 */
const randomCommandBuilder = (
    batchLevel: number,
    customers: Record[]
): Omit<Order, 'id'> => {
    const basket = new Array(Math.round(Math.random() * 2) + 1).map(() => ({
        product_id: Math.round(Math.random() * 20),
        quantity: Math.round(Math.random() * 2) + 1,
    }));

    return {
        date: new Date(),
        total: (Math.round(Math.random() * 10000) / 100) * basket.length,
        status: 'ordered',
        reference: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 6)
            .toUpperCase(),
        customer_id: customers[Math.round(Math.random() * customers.length)].id,
        basket,
        batch: batchLevel,
    };
};

export default randomCommandBuilder;
