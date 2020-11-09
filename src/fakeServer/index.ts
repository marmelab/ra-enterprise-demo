import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import generateData from 'data-generator-retail';
import { random } from 'faker/locale/en';
import { Identifier } from 'react-admin';

import demoData from './demo-data';
import { Category, Product } from '../types';

const getAllChildrenCategories = (
    categories: Category[],
    parentId: Identifier
) => {
    const parentCategory = categories.find(({ id }) => id === parentId);
    if (!parentCategory) {
        return [];
    }
    const children = parentCategory.children.map(childId =>
        getAllChildrenCategories(categories, childId)
    );

    return [parentId, ...children];
};

const rebindProductToCategories = (
    originalCategories: Category[],
    newCategories: Category[]
) => (product: Product) => {
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
    const data = generateData({ serializeDate: true });
    const products = data.products.map(
        rebindProductToCategories(data.categories, demoData.categories)
    );

    const mergedData = { ...data, ...demoData, products };

    const restServer = new FakeRest.FetchServer('http://localhost:4000');
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    restServer.addRequestInterceptor(request => {
        // intercepts list of products with a category filter
        if (
            request.method === 'GET' &&
            request.url.includes('/products') &&
            request.params.filter &&
            request.params.filter.category_id !== undefined
        ) {
            // to include all sub categories of the selected category in the filter
            request.params.filter.category_id = getAllChildrenCategories(
                mergedData.categories,
                parseInt(request.params.filter.category_id)
            );
        }
        return request;
    });
    restServer.init(mergedData);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock('begin:http://localhost:4000', restServer.getHandler());
    return () => fetchMock.restore();
};
