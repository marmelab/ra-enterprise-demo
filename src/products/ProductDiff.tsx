import * as React from 'react';
import { Stack } from '@mui/material';
import { NumberField } from 'react-admin';
import { FieldDiff, SmartFieldDiff } from '@react-admin/ra-history';

export const ProductDiff = () => (
    <Stack gap={1}>
        <FieldDiff source="reference" />
        <SmartFieldDiff source="description" />
        <SmartFieldDiff source="image" />
        <Stack direction="row" gap={2}>
            <FieldDiff inline>
                <NumberField source="width" />
            </FieldDiff>
            <FieldDiff inline>
                <NumberField source="height" />
            </FieldDiff>
        </Stack>
        <Stack direction="row" gap={2}>
            <FieldDiff inline>
                <NumberField source="price" />
            </FieldDiff>
            <FieldDiff inline>
                <NumberField source="stock" />
            </FieldDiff>
            <FieldDiff inline>
                <NumberField source="sales" />
            </FieldDiff>
        </Stack>
    </Stack>
);
