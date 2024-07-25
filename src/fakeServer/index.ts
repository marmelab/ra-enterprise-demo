import fetchMock from 'fetch-mock';
import generateData from 'data-generator-retail';
// @ts-ignore
import { random } from 'faker/locale/en';
import { Identifier } from 'react-admin';
import { RecordRevision } from '@react-admin/ra-history';
import { EventRecord } from '@react-admin/ra-audit-log';

import demoData from './demo-data';
import { admins } from './admins';
import {
    Category,
    Customer,
    Order,
    Product,
    Review,
    AdminUser,
    Visit,
} from '../types';
import generateFakeEvents from './generateFakeEvents';
import generateFakeVisits from './generateFakeVisits';
import generateFakeRevisions from './generateFakeRevisions';
import { FetchMockAdapter, Middleware } from 'fakerest';

const getAllChildrenCategories = (
    categories: (Category & { children: Identifier[] })[],
    parentId: Identifier
): Array<Identifier | any> => {
    const parentCategory = categories.find(({ id }) => id === parentId);
    if (!parentCategory) {
        return [];
    }
    const children = parentCategory.children.map((childId: any) =>
        getAllChildrenCategories(categories, childId)
    );

    return [parentId, ...children];
};

const rebindProductToCategories =
    (
        originalCategories: Category[],
        newCategories: (Category & { children: Identifier[] })[]
    ) =>
    (product: Product) => {
        const originalCategory = originalCategories.find(
            c => c.id === product.category_id
        );

        if (!originalCategory) {
            return product;
        }

        const matchingNewCategory = newCategories.find(
            c => c.name === originalCategory.name
        );

        if (!matchingNewCategory) {
            return product;
        }

        // If the new category does not have sub categories, just ensure we have the correct id
        if (matchingNewCategory.children.length === 0) {
            return {
                ...product,
                category_id: matchingNewCategory.id,
            };
        }

        const newCategoryId = random.arrayElement(
            matchingNewCategory.children || []
        );

        return {
            ...product,
            category_id: newCategoryId,
        };
    };

export default (): (() => void) => {
    // @ts-ignore
    const data: Data = generateData();
    const products = data.products.map(
        rebindProductToCategories(data.categories, demoData.categories)
    );
    const events = generateFakeEvents(data);
    const visits = generateFakeVisits(demoData);
    const product_revisions = generateFakeRevisions(data);

    const mergedData: Data = {
        ...data,
        ...demoData,
        products,
        product_revisions,
        events,
        visits,
        admins,
    };

    const middleware: Middleware = async (context, next) => {
        if (
            context.method === 'GET' &&
            context.collection === 'products' &&
            context.params.filter &&
            context.params.filter.category_id !== undefined
        ) {
            // to include all sub categories of the selected category in the filter
            context.params.filter.category_id = getAllChildrenCategories(
                mergedData.categories,
                parseInt(context.params.filter.category_id)
            );
        }
        return next(context);
    };

    const restServer = new FetchMockAdapter({
        baseUrl: 'http://localhost:4000',
        data: mergedData,
        middlewares: [middleware],
        loggingEnabled: true,
    });
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }

    fetchMock.mock('begin:http://localhost:4000', restServer.getHandler());
    return () => fetchMock.restore();
};

export interface Data extends Record<string, any> {
    admins: AdminUser[];
    categories: (Category & { children: Identifier[] })[];
    orders: Order[];
    customers: Customer[];
    events: EventRecord[];
    products: Product[];
    product_revisions: Omit<RecordRevision, 'resource'>[];
    reviews: Review[];
    visits: Visit[];
}
