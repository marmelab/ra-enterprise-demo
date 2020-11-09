import React, { FC, ReactNode } from 'react';
import { FunctionField, FunctionFieldProps, Record } from 'react-admin';

const render = (record?: Record): ReactNode =>
    record ? record.basket.length : null;

const NbItemsField: FC<Omit<FunctionFieldProps, 'render'>> = props => (
    <FunctionField {...props} render={render} />
);

NbItemsField.defaultProps = {
    label: 'Nb Items',
    textAlign: 'right',
};

export default NbItemsField;
