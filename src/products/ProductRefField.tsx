import * as React from 'react';
import { useRecordContext, Link } from 'react-admin';
import { Product } from '../types';

const ProductRefField = () => {
    const record = useRecordContext<Product>();
    return record ? (
        <Link to={`/products/${record.id}`}>{record.reference}</Link>
    ) : null;
};

export default ProductRefField;
