const commandBuilder = batchLevel => {
    //This generator assume that:
    // - Customers id exists until 50
    // - Products id exists until 20
    const basket = new Array(Math.round(Math.random() * 2) + 1).map(() => ({
        product_id: Math.round(Math.random() * 20),
        quantity: Math.round(Math.random() * 2) + 1,
    }));

    return {
        date: new Date(),
        total: (Math.round(Math.random() * 10000) / 100) * basket.length,
        status: 'ordered',
        reference: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 6)
            .toUpperCase(),
        customer_id: Math.round(Math.random() * 50),
        basket,
        batch: batchLevel,
    };
};

export default commandBuilder;
