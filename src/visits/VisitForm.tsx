import * as React from 'react';
import {
    DateTimeInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    useTranslate,
    useRecordContext,
} from 'react-admin';
import { Stack, Typography, Box } from '@mui/material';
import { useWatch } from 'react-hook-form';

const Color = () => {
    const record = useRecordContext();
    const color = record?.id;
    if (!color) return null;
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Box
                sx={{
                    height: '1em',
                    width: '1em',
                    borderRadius: '50%',
                    backgroundColor: color,
                }}
            />
            <Typography>{color}</Typography>
        </Stack>
    );
};

const EndDateInput = (props: any) => {
    const value = useWatch({ name: 'start' });
    return <DateTimeInput defaultValue={value} {...props} />;
};

export const VisitForm = () => {
    const translate = useTranslate();

    const validateEvent = (values: {
        storeId?: number;
        start?: string | Date;
        end?: string | Date;
        interval?: number;
        freq?: number;
        count?: number;
        color?: string;
    }) => {
        const errors: {
            storeId?: string;
            start?: string;
            end?: string;
            interval?: string;
            freq?: string;
            count?: string;
            color?: string;
        } = {};
        if (values.storeId == null) errors.storeId = 'ra.validation.required';
        if (!values.start) errors.start = 'ra.validation.required';
        if (!values.end) errors.end = 'ra.validation.required';
        if (!values.interval) errors.interval = 'ra.validation.required';
        if (!values.freq) errors.freq = 'ra.validation.required';
        if (values.count == null) errors.count = 'ra.validation.required';
        if (values.color == null) errors.color = 'ra.validation.required';
        if (
            values.start &&
            values.end &&
            new Date(values.start) > new Date(values.end)
        ) {
            errors.end = 'resources.visits.error.start_greater_than_end';
        }
        return errors;
    };

    return (
        <SimpleForm validate={validateEvent}>
            <ReferenceInput source="storeId" reference="stores">
                <SelectInput optionText="city" fullWidth isRequired />
            </ReferenceInput>
            <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <DateTimeInput
                        source="start"
                        inputProps={{ 'data-testid': 'start-input' }}
                        isRequired
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <EndDateInput
                        source="end"
                        inputProps={{ 'data-testid': 'end-input' }}
                        isRequired
                    />
                </Box>
            </Box>
            <Stack direction="row" spacing={1}>
                <Typography sx={{ py: 1 }}>
                    {translate('resources.visits.freq.repeats')}
                </Typography>
                <NumberInput
                    source="interval"
                    label={false}
                    hiddenLabel
                    aria-label="interval"
                    sx={{ width: '4em' }}
                    inputProps={{ 'data-testid': 'interval-input' }}
                    isRequired
                />
                <SelectInput
                    source="freq"
                    choices={[
                        { id: 'daily', name: 'resources.visits.freq.daily' },
                        { id: 'weekly', name: 'resources.visits.freq.weekly' },
                        {
                            id: 'monthly',
                            name: 'resources.visits.freq.monthly',
                        },
                        { id: 'yearly', name: 'resources.visits.freq.yearly' },
                    ]}
                    label={false}
                    hiddenLabel
                    InputLabelProps={{ disabled: true }}
                    aria-label="freq"
                    inputProps={{ 'data-testid': 'freq-input' }}
                    isRequired
                    fullWidth={false}
                />
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography sx={{ py: 1 }}>
                    {translate('resources.visits.freq.until')}
                </Typography>
                <NumberInput
                    source="count"
                    label={false}
                    hiddenLabel
                    aria-label="count"
                    sx={{ width: '4em' }}
                    inputProps={{ 'data-testid': 'count-input' }}
                    isRequired
                />
                <Typography sx={{ py: 1 }}>
                    {translate('resources.visits.freq.occurrences')}
                </Typography>
            </Stack>
            <SelectInput
                source="color"
                choices={[
                    { id: '#05445e', name: '#05445e' },
                    { id: '#b68d40', name: '#b68d40' },
                    { id: '#189ab4', name: '#189ab4' },
                    { id: '#75e6da', name: '#75e6da' },
                    { id: '#d4f1f4', name: '#d4f1f4' },
                    { id: '#d6ad60', name: '#d6ad60' },
                ]}
                optionText={<Color />}
                fullWidth
                isRequired
            />
        </SimpleForm>
    );
};
