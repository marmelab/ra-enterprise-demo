import React, { FC } from 'react';
import { ReferenceField, ReferenceFieldProps, TextField } from 'react-admin';

const ProductReferenceField: FC<Omit<
    ReferenceFieldProps,
    'children' | 'source' | 'reference'
>> = props => (
    <ReferenceField
        label="Product"
        source="product_id"
        reference="products"
        {...props}
    >
        <TextField source="reference" />
    </ReferenceField>
);

ProductReferenceField.defaultProps = {
    addLabel: true,
};

export default ProductReferenceField;
