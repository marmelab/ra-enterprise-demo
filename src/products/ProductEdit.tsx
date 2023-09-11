import * as React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Form,
    FormDataConsumer,
    Pagination,
    ReferenceManyField,
    required,
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
    useTheme,
    Stack,
    Typography,
} from '@mui/material';
import { MarkdownInput } from '@react-admin/ra-markdown';
import { useGetLock, useLockOnMount } from '@react-admin/ra-realtime';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { AccordionSection } from '@react-admin/ra-form-layout';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import Poster from './Poster';
import ProductPreview from './ProductPreview';
import { Product } from '../types';
import { ProductEditDetails } from './ProductEditDetails';

const ProductEdit = () => {
    return (
        <Edit title={<ProductTitle />}>
            <ProductEditFormWithPreview>
                <Poster />
                <TextInput source="image" fullWidth validate={req} />
                <TextInput source="thumbnail" fullWidth validate={req} />
                <div>
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
                        <ProductEditDetails />
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
                </div>
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
    const theme = useTheme();
    const notify = useNotify();
    useDefineAppLocation('catalog.products.edit', { record });

    const { isLoading } = useLockOnMount({
        resource,
        id: record.id,
        lockMutationOptions: {
            onError: () => {
                notify('ra-realtime.notification.lock.lockedBySomeoneElse');
            },
        },
    });

    return (
        <Form {...props}>
            <Box
                sx={{
                    display: 'flex',
                    '& > :first-child': {
                        flex: 1,
                        minWidth: '60%',
                        maxWidth: '70%',
                        borderWidth: '0 1px 0 0',
                        borderRadius: `${theme?.shape?.borderRadius || 0} 0 0 ${
                            theme?.shape?.borderRadius || 0
                        }`,
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
                    <CustomToolbar disabled={isLoading} />
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

const CustomToolbar = ({ disabled }: { disabled?: boolean }) => {
    const resource = useResourceContext();
    const record = useRecordContext();

    const { identity } = useGetIdentity();
    const { data: lock } = useGetLock(resource, { id: record.id });
    const isMeLocker = lock?.identity === identity?.id;

    return (
        <Toolbar>
            <SaveButton disabled={disabled === true || !isMeLocker} />
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
