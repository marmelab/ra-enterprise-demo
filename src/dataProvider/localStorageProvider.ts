import { DataProvider } from 'react-admin';

const VALID_UNTIL = new Date(new Date().valueOf() + 3600 * 24 * 365);

const mergeById = (a, b) => {
    const notInB = a.filter(aItem => !b.find(bItem => aItem.id === bItem.id));
    const inBoth = a.filter(aItem => b.find(bItem => aItem.id === bItem.id));
    const notInA = b.filter(bItem => !a.find(aItem => bItem.id === aItem.id));
    return [
        ...notInB,
        ...inBoth.map(aItem => {
            const bItem = b.find(bItem => aItem.id === bItem.id);
            return { ...aItem, playedOn: bItem.playedOn };
        }),
        ...notInA,
    ].sort((c, d) => c.id - d.id);
};
export default (defaultState = {}): DataProvider => {
    const get = (name: string) => {
        const item = localStorage.getItem(name);
        const collection = item ? JSON.parse(item) : [];
        return mergeById(defaultState[name], collection);
    };

    const set = (name: string, item: any) => {
        return localStorage.setItem(name, JSON.stringify(item));
    };

    const update = (resource, { id, data }) => {
        const collection = get(resource);

        const item = collection.find(item => item.id === id);

        if (!item) {
            return { data: null };
        }

        const newItem = { ...item, ...data, id };

        set(resource, [
            ...collection.filter(otherItem => otherItem.id !== id),
            newItem,
        ]);

        return { data: newItem };
    };

    const remove = (resource, { id }) => {
        let collection = get(resource);

        const item = collection.find(item => item.id === id);

        if (!item) {
            return { data: null };
        }

        collection = collection.filter(item => item.id !== id);

        set(resource, collection);

        return { data: item };
    };

    return {
        getList: (resource, { filter, sort, pagination }) => {
            let collection = get(resource);

            if (filter) {
                collection = Object.keys(filter).reduce(
                    (acc, key) => {
                        const value = filter[key];
                        return acc.filter(o => o[key] === value);
                    },
                    [...collection]
                );
            }
            const total = collection.length;
            if (sort) {
                const { field, order } = sort;
                collection = collection.sort((a, b) =>
                    order === 'ASC' ? a[field] - b[field] : b[field] - a[field]
                );
            }
            if (pagination) {
                const { page, perPage } = pagination;
                collection = collection.slice(
                    (page - 1) * perPage,
                    page * perPage - 1
                );
            }

            return Promise.resolve({
                data: collection,
                total,
            });
        },

        getOne: (resource, { id }) => {
            const collection = get(resource);

            const item = collection.find(item => item.id === id);

            return Promise.resolve({
                data: item,
                validUntil: VALID_UNTIL,
            });
        },

        getMany: (resource, { ids }) => {
            const collection = get(resource);

            const items = collection.filter(item => ids.includes(item.id));

            return Promise.resolve({
                data: items,
                validUntil: VALID_UNTIL,
            });
        },

        getManyReference: (resource, { filter, sort, pagination }) => {
            let collection = get(resource);

            if (filter) {
                collection = Object.keys(filter).reduce(
                    (acc, key) => {
                        const value = filter[key];
                        return acc.filter(o => o[key] === value);
                    },
                    [...collection]
                );
            }
            const total = collection.length;
            if (sort) {
                const { field, order } = sort;
                collection = collection.sort((a, b) =>
                    order === 'ASC' ? a[field] - b[field] : b[field] - a[field]
                );
            }
            if (pagination) {
                const { page, perPage } = pagination;
                collection = collection.slice(
                    (page - 1) * perPage,
                    page * perPage - 1
                );
            }

            return Promise.resolve({
                data: collection,
                total,
            });
        },

        update: (resource, params) => {
            return Promise.resolve(update(resource, params));
        },
        updateMany: (resource, { ids, data }) => {
            const updateResults = ids.map(id => update(resource, { id, data }));

            return Promise.resolve({
                data: updateResults
                    .filter(res => res.data && res.data.id)
                    .map(res => res.data.id),
            });
        },

        create: (resource, { data }) => {
            const collection = get(resource);

            const id = collection.length + 1;
            const item = collection.find(item => item.id === id);

            if (item) {
                return Promise.resolve({ data: item });
            }

            const newItem = { ...data, id: id };
            collection.push(newItem);

            set(resource, collection);

            return Promise.resolve({ data: newItem });
        },

        delete: (resource, params) => Promise.resolve(remove(resource, params)),

        deleteMany: (resource, { ids }) => {
            const deleteResults = ids.map(id => remove(resource, { id }));

            return Promise.resolve({
                data: deleteResults
                    .filter(res => res.data && res.data.id)
                    .map(res => res.data.id),
            });
        },
    };
};
