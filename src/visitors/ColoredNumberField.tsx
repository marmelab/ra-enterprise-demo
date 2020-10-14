import * as React from 'react';
import { FC } from 'react';
import { NumberField, NumberFieldProps } from 'react-admin';

const ColoredNumberField: FC<NumberFieldProps> = props =>
    props.record && props.source ? (
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <NumberField {...props} />
            </span>
        ) : (
            <NumberField {...props} />
        )
    ) : null;

ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
