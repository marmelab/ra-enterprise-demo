import { DataProvider } from 'ra-core';
import { TreeDataProvider, TreeRecord } from '@react-admin/ra-tree';

/**
 * Provided the records contain an array of children ids,
 * augment a dataProvider by adding the Tree methods (getTree, getRootNodes, etc).
 *
 * These methods will call regular dataProvider methods (getList, getOne, update).
 *
 * @warning Do not use in production.
 *
 * The added Tree methods call the API way too much, sometimes asking for the
 * entire tree. In practice, you should implement an optimized API route for
 * each of the Tree methods.
 *
 * @example // Compatible APIs should return records like
 * {
 *     id: 1234,
 *     name: 'hello',
 *     isRoot: false,
 *     children: [45, 356, 1],
 * }
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} childrenField The name of the field containing the children ids. Defaults to 'children'
 * @param {string} isRootField The name of the field containing the root status. Defaults to 'isRoot'
 */
const addTreeMethodsBasedOnChildren = (
    dataProvider: DataProvider,
    childrenField = 'children',
    isRootField = 'isRoot'
): DataProvider & TreeDataProvider => {
    return {
        ...dataProvider,

        getTree: async (resource: string): Promise<{ data: TreeRecord[] }> => {
            const { data } = await dataProvider.getList(resource, {
                filter: {},
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            return {
                data: data as TreeRecord[],
            };
        },

        getRootNodes: async (
            resource: string
        ): Promise<{ data: TreeRecord[] }> => {
            const { data } = await dataProvider.getList(resource, {
                filter: { [isRootField]: true },
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            return {
                data: data as TreeRecord[],
            };
        },

        getChildNodes: async (
            resource: string,
            { parentId }
        ): Promise<{ data: TreeRecord[] }> => {
            // get element
            const { data: parent } = await dataProvider.getOne(resource, {
                id: parentId,
            });
            // get child records
            const { data } = await dataProvider.getList(resource, {
                filter: { id: parent[childrenField] },
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            return {
                data: data as TreeRecord[],
            };
        },

        moveAsNthChildOf: async (
            resource: string,
            { source, destination, position }
        ): Promise<{ data: {} }> => {
            // 1. Fetch entire tree to find source and destination parent
            const { data: nodes } = await dataProvider.getList(resource, {
                filter: {},
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            // 2. Find source parent
            // we need the entire tree client-side for that because it's unlikely that the API provides search inside children
            const sourceParent = nodes
                .filter(node => node.children.includes(source.id))
                .pop();
            // 3. Remove source from sourceParent children
            if (sourceParent) {
                // sourceParent doesn't exist for root nodes
                await dataProvider.update(resource, {
                    id: sourceParent.id,
                    data: {
                        [childrenField]: sourceParent[childrenField].filter(
                            childId => childId !== source.id
                        ),
                    },
                    previousData: sourceParent,
                });
            }
            // 4. Add source in destinationParent children
            if (position === 0) {
                await dataProvider.update(resource, {
                    id: destination.id,
                    data: {
                        [childrenField]: [
                            source.id,
                            ...destination[childrenField],
                        ],
                    },
                    previousData: destination,
                });
            } else {
                const children = [
                    ...destination[childrenField].slice(0, position - 1),
                    source.id,
                    ...destination[childrenField].slice(position),
                ];
                await dataProvider.update(resource, {
                    id: destination.id,
                    data: {
                        [childrenField]: children,
                    },
                    previousData: destination,
                });
            }
            return { data: {} };
        },

        moveAsNthSiblingOf: async (
            resource: string,
            { source, destination, position }
        ): Promise<{ data: {} }> => {
            // 1. Fetch entire tree to find source and destination parent
            const { data: nodes } = await dataProvider.getList(resource, {
                filter: {},
                sort: { field: 'id', order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            // 2. Find source and destination parent
            // we need the entire tree client-side for that because it's unlikely that the API provides search inside children
            const sourceParent = nodes
                .filter(node => node.children.includes(source.id))
                .pop();
            const destinationParent = nodes
                .filter(node => node.children.includes(destination.id))
                .pop();
            if (!sourceParent || !destinationParent) {
                return { data: {} };
            }
            if (sourceParent.id === destinationParent.id) {
                // 3. Move child to another position in the same parent
                const children = [...destinationParent.children];
                children.splice(
                    position,
                    0,
                    children.splice(children.indexOf(source.id), 1)[0]
                );
                await dataProvider.update(resource, {
                    id: destinationParent.id,
                    data: {
                        [childrenField]: children,
                    },
                    previousData: destinationParent,
                });
            } else {
                // 3. Remove source from sourceParent children
                await dataProvider.update(resource, {
                    id: sourceParent.id,
                    data: {
                        [childrenField]: sourceParent[childrenField].filter(
                            childId => childId !== source.id
                        ),
                    },
                    previousData: sourceParent,
                });
                // 4. Add source in destinationParent children
                await dataProvider.update(resource, {
                    id: destinationParent.id,
                    data: {
                        [childrenField]: destinationParent[childrenField]
                            .slice(0, position)
                            .concat(
                                source.id,
                                destinationParent[childrenField].slice(position)
                            ),
                    },
                    previousData: destinationParent,
                });
            }
            return { data: {} };
        },

        addRootNode: async (
            resource: string,
            { data }
        ): Promise<{ data: TreeRecord }> =>
            dataProvider.create(resource, {
                data: {
                    ...data,
                    [isRootField]: true,
                    [childrenField]: [],
                },
            }) as Promise<{ data: TreeRecord }>,

        addChildNode: async (
            resource: string,
            { parentId, data }
        ): Promise<{ data: TreeRecord }> => {
            // get Parent
            const { data: parent } = await dataProvider.getOne(resource, {
                id: parentId,
            });
            // create child
            const newChild = await dataProvider.create(resource, {
                data: {
                    ...data,
                    [isRootField]: false,
                    [childrenField]: [],
                },
            });
            // update parent children
            await dataProvider.update(resource, {
                id: parentId,
                data: {
                    ...parent,
                    children: parent.children.concat(newChild.data.id),
                },
                previousData: parent,
            });

            return newChild as { data: TreeRecord };
        },
    };
};

export default addTreeMethodsBasedOnChildren;
