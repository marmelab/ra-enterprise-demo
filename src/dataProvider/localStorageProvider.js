const VALID_UNTIL = new Date() + 3600 * 24 * 365;

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
export default (defaultState = {}) => {
    const get = name => {
        const collection = JSON.parse(localStorage.getItem(name)) || [];
        return mergeById(defaultState[name], collection);
    };

    const set = (name, item) => {
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

            return {
                data: collection,
                total,
            };
        },

        getOne: (resource, { id }) => {
            const collection = get(resource);

            const item = collection.find(item => item.id === id);

            return {
                data: item,
                validUntil: VALID_UNTIL,
            };
        },

        getMany: (resource, { ids }) => {
            const collection = get(resource);

            const items = collection.filter(item => ids.include(item.id));

            return {
                data: items,
                validUntil: VALID_UNTIL,
            };
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

            return {
                data: collection,
                total,
            };
        },

        update,
        updateMany: (resource, { ids, data }) => {
            const updateResults = ids.map(id => update(resource, { id, data }));

            return {
                data: updateResults
                    .filter(res => res.data && res.data.id)
                    .map(res => res.data.id),
            };
        },

        create: (resource, { data }) => {
            const collection = get(resource);

            const id = collection.length + 1;
            const item = collection.find(item => item.id === id);

            if (item) {
                return;
            }

            const newItem = { ...data, id: id };
            collection.push(newItem);

            set(resource, collection);

            return newItem;
        },

        delete: remove,

        deleteMany: (resource, { ids }) => {
            const deleteResults = ids.map(id => remove(resource, { id }));

            return {
                data: deleteResults
                    .filter(res => res.data && res.data.id)
                    .map(res => res.data.id),
            };
        },
    };
};
