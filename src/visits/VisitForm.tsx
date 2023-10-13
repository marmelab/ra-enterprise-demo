import * as React from 'react';
import {
    DateTimeInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    useTranslate,
    useRecordContext,
    required,
} from 'react-admin';
import { Stack, Typography, Box } from '@mui/material';

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

export const VisitForm = () => {
    const translate = useTranslate();
    return (
        <SimpleForm>
            <ReferenceInput source="storeId" reference="stores">
                <SelectInput
                    optionText="city"
                    fullWidth
                    validate={required()}
                />
            </ReferenceInput>
            <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <DateTimeInput
                        source="start"
                        validate={required()}
                        inputProps={{ 'data-testid': 'start-input' }}
                    />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <DateTimeInput
                        source="end"
                        validate={required()}
                        inputProps={{ 'data-testid': 'end-input' }}
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
                    validate={required()}
                    inputProps={{ 'data-testid': 'interval-input' }}
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
                    validate={required()}
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
                    validate={required()}
                    inputProps={{ 'data-testid': 'count-input' }}
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
                validate={required()}
            />
        </SimpleForm>
    );
};
