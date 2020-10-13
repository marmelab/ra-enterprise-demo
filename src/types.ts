import { ReduxState, Record, Identifier } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Category extends Record {
    id: Identifier;
    name: string;
}

export interface Product extends Record {
    id: Identifier;
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

export interface Customer extends Record {
    id: Identifier;
    first_name: string;
    last_name: string;
    address: string;
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

export interface Order extends Record {
    id: Identifier;
    status: OrderStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
    customer_id: Identifier;
}

export interface BasketItem {
    product_id: Identifier;
    quantity: number;
}

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends Record {
    id: Identifier;
    date: Date;
    status: ReviewStatus;
    customer_id: Identifier;
    product_id: Identifier;
    comment: any;
}

declare global {
    interface Window {
        restServer: any;
    }
}
