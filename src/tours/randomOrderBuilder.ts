import { Customer, Order } from '../types';

/**
 * Generate random orders
 *
 * This generator assumes that:
 * - Customer ids exist until 50
 * - Product ids exist until 20
 */
const randomOrderBuilder = (
    batchLevel: number,
    customers: Customer[]
): Omit<
    Order,
    | 'id'
    | 'total_ex_taxes'
    | 'delivery_fees'
    | 'tax_rate'
    | 'taxes'
    | 'returned'
> & { batch: number } => {
    const basket = new Array(Math.round(Math.random() * 2) + 1).map(() => ({
        product_id: Math.round(Math.random() * 20),
        quantity: Math.round(Math.random() * 2) + 1,
    }));

    return {
        date: new Date().toString(),
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

export default randomOrderBuilder;
