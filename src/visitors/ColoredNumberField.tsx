import React, { ReactElement } from 'react';
import { NumberField, NumberFieldProps } from 'react-admin';

const ColoredNumberField = (props: NumberFieldProps): ReactElement | null =>
    props.record && props.source ? (
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <NumberField {...props} />
            </span>
        ) : (
            <NumberField {...props} />
        )
    ) : null;

// @ts-ignore
ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
