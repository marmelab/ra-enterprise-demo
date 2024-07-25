import * as React from 'react';
import {
    Count,
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
    WithRecord,
    SimpleForm,
    ReferenceInput,
    AutocompleteInput,
    DateInput,
} from 'react-admin';
import {
    Box,
    Card,
    CardContent,
    useTheme,
    Stack,
    Typography,
} from '@mui/material';
import { useGetLock, useLockOnMount } from '@react-admin/ra-realtime';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import {
    AccordionSection,
    CreateInDialogButton,
} from '@react-admin/ra-form-layout';
import {
    RevisionListWithDetails,
    CreateRevisionOnSave,
    useApplyChangesBasedOnSearchParam,
    useGetRevisions,
} from '@react-admin/ra-history';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import Poster from './Poster';
import ProductPreview from './ProductPreview';
import { ProductDiff } from './ProductDiff';
import { AdminName } from '../admins';
import { Product } from '../types';
import { ProductEditDetails } from './ProductEditDetails';
import StarRatingInput from '../reviews/StarRatingInput';

const MarkdownInput = React.lazy(() =>
    import('@react-admin/ra-markdown').then(module => ({
        default: module.MarkdownInput,
    }))
);

const ProductEdit = () => (
    <Edit title={<ProductTitle />}>
        <ProductEditFormWithPreview>
            <Poster />
            <TextInput id="image" source="image" validate={req} />
            <TextInput source="thumbnail" validate={req} />
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
                    count={
                        <WithRecord
                            render={record => (
                                <Count
                                    resource="reviews"
                                    filter={{ product_id: record.id }}
                                />
                            )}
                        />
                    }
                >
                    <ReferenceManyField
                        reference="reviews"
                        target="product_id"
                        pagination={<Pagination />}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 1,
                                mr: 2,
                            }}
                        >
                            <WithRecord
                                render={record => (
                                    <CreateInDialogButton
                                        record={{ product_id: record.id }}
                                        fullWidth
                                        maxWidth="sm"
                                    >
                                        <SimpleForm
                                            defaultValues={{
                                                status: 'pending',
                                            }}
                                        >
                                            <ReferenceInput
                                                source="customer_id"
                                                reference="customers"
                                            >
                                                <AutocompleteInput
                                                    optionText={
                                                        customerOptionRenderer
                                                    }
                                                    validate={req}
                                                />
                                            </ReferenceInput>
                                            <DateInput
                                                source="date"
                                                defaultValue={new Date()}
                                                validate={req}
                                            />
                                            <StarRatingInput
                                                source="rating"
                                                defaultValue={2}
                                            />
                                            <TextInput
                                                source="comment"
                                                multiline
                                                resettable
                                                validate={req}
                                            />
                                        </SimpleForm>
                                    </CreateInDialogButton>
                                )}
                            />
                        </Box>
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
                            <StarRatingField
                                label="resources.reviews.fields.rating"
                                source="rating"
                            />
                            <TextField source="comment" />
                            <TextField source="status" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </AccordionSection>
                <AccordionSection
                    label="resources.products.tabs.revisions"
                    fullWidth
                    count={<ProductRevisionsCount />}
                >
                    <RevisionListWithDetails
                        sx={{ py: 1 }}
                        diff={<ProductDiff />}
                        renderName={id => <AdminName id={id} />}
                        allowRevert
                    />
                </AccordionSection>
            </div>
        </ProductEditFormWithPreview>
    </Edit>
);

const ProductRevisionsCount = () => {
    const record = useRecordContext();
    const { data: revisions } = useGetRevisions(
        'products',
        {
            recordId: record!.id,
        },
        { enabled: !!record?.id }
    );
    return revisions ? <>{revisions?.length}</> : null;
};

const req = [required()];

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>Poster &quot;{record.reference}&quot;</span> : null;
};

const ProductEditFormWithPreview = ({ children, ...props }: any) => {
    const resource = useResourceContext();
    const record = useRecordContext();
    const theme = useTheme();
    const notify = useNotify();
    useDefineAppLocation('catalog.products.edit', { record });

    const { isLoading } = useLockOnMount({
        resource,
        id: record?.id,
        lockMutationOptions: {
            onError: () => {
                notify('ra-realtime.notification.lock.lockedBySomeoneElse');
            },
        },
    });

    return (
        <CreateRevisionOnSave record={props.record} resource={props.resource}>
            <Form {...props}>
                <ApplyChangesBasedOnSearchParam />
                <Box
                    sx={{
                        display: 'flex',
                        '& > :first-child': {
                            flex: 1,
                            minWidth: '60%',
                            maxWidth: '70%',
                            borderWidth: '0 1px 0 0',
                            borderRadius: `${
                                theme?.shape?.borderRadius || 0
                            } 0 0 ${theme?.shape?.borderRadius || 0}`,
                        },
                        '& > :last-child': {
                            width: '25%',
                            flexShrink: 0,
                        },
                    }}
                >
                    <Card>
                        <CardContent>
                            <Stack>{children}</Stack>
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
        </CreateRevisionOnSave>
    );
};

const CustomToolbar = ({ disabled }: { disabled?: boolean }) => {
    const resource = useResourceContext();
    const record = useRecordContext();

    const { identity } = useGetIdentity();
    const { data: lock } = useGetLock(
        resource!,
        { id: record!.id },
        { enabled: !!resource && !!record?.id }
    );
    const isMeLocker = lock?.identity === identity?.id;

    return (
        <Toolbar>
            <SaveButton disabled={disabled === true || !isMeLocker} />
            {!isMeLocker && <LockMessage identity={lock?.identity} />}
        </Toolbar>
    );
};

const ApplyChangesBasedOnSearchParam = () => {
    useApplyChangesBasedOnSearchParam();
    return null;
};

const LockMessage = (props: any) => {
    const { identity, variant = 'body1' } = props;

    return (
        <Typography py={0} px={1} variant={variant}>
            This record is locked by another user: {identity}.
        </Typography>
    );
};

const customerOptionRenderer = (choice: any) =>
    `${choice.first_name} ${choice.last_name}`;

export default ProductEdit;
