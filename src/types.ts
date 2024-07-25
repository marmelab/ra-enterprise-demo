import { Identifier, RaRecord } from 'react-admin';
import type {
    Category,
    Product,
    Customer,
    Order,
    Invoice,
    Review,
    BasketItem,
} from 'data-generator-retail';

export type ThemeName = 'light' | 'dark';
export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';

export type { Category, Product, Customer, Order, Invoice, Review, BasketItem };

export interface Store extends RaRecord {
    city: string;
    country: string;
    address: string;
    created_at: Date;
}

export interface Visit extends RaRecord {
    storeId: Identifier;
    start: string;
    end: string;
    freq: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    count: number;
    color: string;
}

export interface AdminUser {
    id: number | string;
    avatar: string;
    fullName: string;
}

declare global {
    interface Window {
        restServer: any;
    }
}
