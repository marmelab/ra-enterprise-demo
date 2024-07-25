import React from 'react';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin';
import { InputAdornment, Stack } from '@mui/material';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const MarkdownInput = React.lazy(() =>
    import('@react-admin/ra-markdown').then(module => ({
        default: module.MarkdownInput,
    }))
);

const ProductCreate = () => {
    useDefineAppLocation('catalog.products.create');
    return (
        <Create>
            <TabbedForm>
                <FormTab label="resources.products.tabs.image">
                    <TextInput source="image" validate={required()} />
                    <TextInput source="thumbnail" validate={required()} />
                </FormTab>
                <FormTab
                    sx={{ maxWidth: '24em' }}
                    label="resources.products.tabs.details"
                    path="details"
                >
                    <TextInput source="reference" validate={required()} />
                    <NumberInput
                        source="price"
                        validate={required()}
                        sx={{ width: '50%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    €
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" gap={2} sx={{ width: '100%' }}>
                        <NumberInput
                            source="width"
                            validate={required()}
                            sx={{ width: '50%' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        cm
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <NumberInput
                            source="height"
                            validate={required()}
                            sx={{
                                width: '50%',
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        cm
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <ReferenceInput
                        source="category_id"
                        reference="categories"
                        allowEmpty
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <NumberInput
                        source="stock"
                        validate={required()}
                        sx={{ width: '50%' }}
                    />
                </FormTab>
                <FormTab
                    label="resources.products.tabs.description"
                    path="description"
                >
                    <MarkdownInput source="description" label="" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
