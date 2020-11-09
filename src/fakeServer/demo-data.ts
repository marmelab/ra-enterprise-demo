export default {
    categories: [
        {
            id: 5,
            name: 'categories',
            isRoot: true,
            children: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        },

        { id: 0, name: 'animals', isRoot: false, children: [1, 2, 3] },
        { id: 1, name: 'cute', isRoot: false, children: [] },
        { id: 2, name: 'scary', isRoot: false, children: [] },
        { id: 3, name: 'weird', isRoot: false, children: [] },

        { id: 10, name: 'beard', isRoot: false, children: [11, 12] },
        { id: 11, name: 'curly', isRoot: false, children: [] },
        { id: 12, name: 'straight', isRoot: false, children: [] },

        { id: 20, name: 'business', isRoot: false, children: [] },

        { id: 30, name: 'cars', isRoot: false, children: [31, 32] },
        { id: 31, name: 'fast', isRoot: false, children: [] },
        { id: 32, name: 'slow', isRoot: false, children: [] },

        { id: 40, name: 'city', isRoot: false, children: [] },
        { id: 50, name: 'flowers', isRoot: false, children: [] },

        { id: 60, name: 'food', isRoot: false, children: [61, 62] },
        { id: 61, name: 'liquid', isRoot: false, children: [] },
        { id: 62, name: 'solid', isRoot: false, children: [] },

        { id: 70, name: 'nature', isRoot: false, children: [] },

        { id: 80, name: 'people', isRoot: false, children: [81, 82, 83] },
        { id: 81, name: 'one', isRoot: false, children: [] },
        { id: 82, name: 'couple', isRoot: false, children: [] },
        { id: 83, name: 'many', isRoot: false, children: [] },

        { id: 90, name: 'sports', isRoot: false, children: [] },
        { id: 100, name: 'tech', isRoot: false, children: [] },
        { id: 110, name: 'travel', isRoot: false, children: [] },
        { id: 120, name: 'water', isRoot: false, children: [] },
    ],
    stores: [
        {
            id: 0,
            city: 'Paris',
            country: 'France',
            address: '8 rue de Rivoli',
            created_at: new Date(1988, 4, 20),
        },
        {
            id: 1,
            city: 'Lyon',
            country: 'France',
            address: '14 rue de la République',
            created_at: new Date(1992, 3, 11),
        },
        {
            id: 2,
            city: 'Nice',
            country: 'France',
            address: '5 cours Saleya',
            created_at: new Date(1993, 6, 27),
        },
        {
            id: 3,
            city: 'Toulouse',
            country: 'France',
            address: '43 rue de la Pomme',
            created_at: new Date(1994, 1, 2),
        },
        {
            id: 4,
            city: 'Dijon',
            country: 'France',
            address: '89 rue de la liberté',
            created_at: new Date(2001, 11, 5),
        },
        {
            id: 5,
            city: 'Nancy',
            country: 'France',
            address: '27 rue Ordener',
            created_at: new Date(2008, 7, 15),
        },
    ],
    locks: [],
};
