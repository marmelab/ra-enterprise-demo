const addSearchMethod = (dataProvider, options = {}) => {
    const builderOptions = getBuilderOptions(options);
    const defaultFacets = getDefaultFacetsFromOptions(options);
    return {
        ...dataProvider,
        search: async ({ facets, query }) => {
            const finalFacets = facets || defaultFacets;

            const resultsByResource = await Promise.all(
                finalFacets.map(resource =>
                    searchInResource(
                        dataProvider,
                        resource,
                        query,
                        builderOptions[resource]
                    )
                )
            );

            return {
                data: resultsByResource.reduce(
                    (acc, resultForResource) => [
                        ...acc,
                        ...resultForResource.data,
                    ],
                    []
                ),
                total: resultsByResource.reduce(
                    (acc, resultForResource) => acc + resultForResource.total,
                    0
                ),
            };
        },
    };
};

export default addSearchMethod;

const getDefaultFacetsFromOptions = options => {
    if (Array.isArray(options)) {
        return options;
    }

    return Object.keys(options);
};

const getBuilderOptions = options => {
    if (Array.isArray(options)) {
        return buildOptionsFromArrayOfResources(options);
    }

    return options;
};

const buildOptionsFromArrayOfResources = resources =>
    resources.reduce(
        (acc, resource) => ({
            ...acc,
            [resource]: {},
        }),
        {}
    );

const defaultGetLabel = record => record.label || record.name || record.title;

const defaultGetDescription = record => record.description || record.body;

const searchInResource = async (
    dataProvider,
    resource,
    query,
    options = {}
) => {
    const { data, total } = await dataProvider.getList(resource, {
        filter: { q: query },
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
    });

    const {
        label = defaultGetLabel,
        description = defaultGetDescription,
        getResult,
    } = options;

    return {
        data: await Promise.all(
            data.map(async record => ({
                id: `${resource}/${record.id}`,
                type: resource,
                url: `/${resource}/${record.id}`,
                content: {
                    id: record.id,
                    label:
                        typeof label === 'string'
                            ? record[label]
                            : label(record),
                    description:
                        typeof description === 'string'
                            ? record[description]
                            : description(record),
                    record: await (getResult
                        ? getResult(record, dataProvider)
                        : record),
                },
            }))
        ),
        total,
    };
};
