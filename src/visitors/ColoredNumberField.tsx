import * as React from 'react';
import { useRecordContext, NumberField, NumberFieldProps } from 'react-admin';

const ColoredNumberField = (props: NumberFieldProps) => {
    const record = useRecordContext(props);
    if (!record || !props.source) {
        return null;
    }
    return record[props.source] > 500 ? (
        <NumberField
            {...props}
            sx={{ color: 'error.main', fontWeight: 'fontWeightBold' }}
        />
    ) : (
        <NumberField {...props} />
    );
};

export default ColoredNumberField;
