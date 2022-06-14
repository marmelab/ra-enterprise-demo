import * as React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Form,
    FormDataConsumer,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    TextField,
    TextInput,
    useResourceContext,
    useRecordContext,
    Toolbar,
    SaveButton,
    useNotify,
    useGetIdentity,
} from 'react-admin';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material';
import { MarkdownInput } from '@react-admin/ra-markdown';
import { useGetLock, useLockRecord } from '@react-admin/ra-realtime';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { AccordionSection } from '@react-admin/ra-form-layout';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import Poster from './Poster';
import ProductPreview from './ProductPreview';
import { Product } from '../types';

const ProductEdit = () => {
    return (
        <Edit title={<ProductTitle />}>
            <ProductEditFormWithPreview>
                <Poster />
                <TextInput source="image" fullWidth validate={req} />
                <TextInput source="thumbnail" fullWidth validate={req} />
                <AccordionSection
                    label="resources.products.tabs.description"
                    data-tour-id="description-tab"
                    fullWidth
                >
                    <MarkdownInput
                        source="description"
                        label=""
                        validate={req}
                    />
                </AccordionSection>
                <AccordionSection
                    label="resources.products.tabs.details"
                    fullWidth
                >
                    <TextInput source="reference" fullWidth validate={req} />
                    <NumberInput
                        source="price"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                        validate={req}
                        fullWidth
                    />
                    <NumberInput
                        source="width"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                        validate={req}
                        fullWidth
                    />
                    <NumberInput
                        source="height"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                        validate={req}
                        fullWidth
                    />
                    <ReferenceInput source="category_id" reference="categories">
                        <SelectInput source="name" validate={req} fullWidth />
                    </ReferenceInput>
                    <NumberInput source="stock" validate={req} fullWidth />
                </AccordionSection>
                <AccordionSection
                    label="resources.products.tabs.reviews"
                    fullWidth
                >
                    <ReferenceManyField
                        reference="reviews"
                        target="product_id"
                        pagination={<Pagination />}
                    >
                        <Datagrid
                            sx={{
                                width: '100%',
                                '& .column-comment': {
                                    maxWidth: '20em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                },
                            }}
                        >
                            <DateField source="date" />
                            <CustomerReferenceField />
                            <StarRatingField />
                            <TextField source="comment" />
                            <TextField source="status" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </AccordionSection>
            </ProductEditFormWithPreview>
        </Edit>
    );
};

const req = [required()];

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>Poster "{record.reference}"</span> : null;
};

const ProductEditFormWithPreview = ({ children, ...props }: any) => {
    const resource = useResourceContext();
    const record = useRecordContext();
    useDefineAppLocation('catalog.products.edit', { record });
    const notify = useNotify();

    const { isLoading } = useLockRecord({
        resource,
        id: record.id,
        lockMutationOptions: {
            onError: () => {
                notify('ra-realtime.notification.lock.lockedBySomeoneElse');
            },
        },
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Form {...props}>
            <Box
                sx={{
                    display: 'flex',
                    '& > :first-child': {
                        flex: 1,
                        minWidth: '60%',
                        maxWidth: '70%',
                    },
                    '& > :last-child': {
                        width: '25%',
                        flexShrink: 0,
                    },
                }}
            >
                <Card>
                    <CardContent>
                        <Stack alignItems="flex-start">{children}</Stack>
                    </CardContent>
                    <CustomToolbar />
                </Card>
                <div data-testid="product-edit-preview">
                    <FormDataConsumer>
                        {({ formData }) => {
                            return <ProductPreview record={formData} />;
                        }}
                    </FormDataConsumer>
                </div>
            </Box>
        </Form>
    );
};

const CustomToolbar = () => {
    const resource = useResourceContext();
    const record = useRecordContext();

    const { identity } = useGetIdentity();
    const { data: lock } = useGetLock(resource, { id: record.id });
    const isMeLocker = lock?.identity === identity?.id;

    return (
        <Toolbar>
            <SaveButton disabled={!isMeLocker} />
            {!isMeLocker && <LockMessage identity={lock?.identity} />}
        </Toolbar>
    );
};

const LockMessage = (props: any) => {
    const { identity, variant = 'body1' } = props;

    return (
        <Typography py={0} px={1} variant={variant}>
            This record is locked by another user: {identity}.
        </Typography>
    );
};

export default ProductEdit;
