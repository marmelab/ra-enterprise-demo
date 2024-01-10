import { Identifier, RaRecord } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface Category extends RaRecord {
    name: string;
}

export interface Product extends RaRecord {
    category_id: Identifier;
    description: string;
    height: number;
    image: string;
    price: number;
    reference: string;
    stock: number;
    thumbnail: string;
    width: number;
}

export interface Customer extends RaRecord {
    first_name: string;
    last_name: string;
    address: string;
    stateAbbr: string;
    city: string;
    zipcode: string;
    avatar: string;
    birthday: string;
    first_seen: string;
    last_seen: string;
    has_ordered: boolean;
    latest_purchase: string;
    has_newsletter: boolean;
    groups: string[];
    nb_commands: number;
    total_spent: number;
}

export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';

export interface Order extends RaRecord {
    status: OrderStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export interface BasketItem {
    product_id: Identifier;
    quantity: number;
}

export type Invoice = RaRecord;

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends RaRecord {
    date: Date;
    status: ReviewStatus;
    customer_id: Identifier;
    product_id: Identifier;
}

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
