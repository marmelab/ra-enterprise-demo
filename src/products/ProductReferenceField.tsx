import React, { ReactElement } from 'react';
import { ReferenceField, TextField } from 'react-admin';

const ProductReferenceField = (props: any): ReactElement => (
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
    source: 'product_id',
    addLabel: true,
};

export default ProductReferenceField;
