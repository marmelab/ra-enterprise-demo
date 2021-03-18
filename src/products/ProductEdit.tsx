import React, { FC } from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    SimpleForm,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TextField,
    TextInput,
    FormDataConsumer,
    FormWithRedirect,
    useNotify,
    SaveButton,
    Toolbar,
    EditProps,
} from 'react-admin';
import { MarkdownInput } from '@react-admin/ra-markdown';
import { useLock, useHasLock } from '@react-admin/ra-realtime';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { AccordionSection } from '@react-admin/ra-form-layout';
import {
    Card,
    CardContent,
    InputAdornment,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';
import ProductPreview from './ProductPreview';

import { Product } from '../types';

interface ProductTitleProps {
    record?: Product;
}

const ProductTitle: FC<ProductTitleProps> = ({ record }) =>
    record ? <span>Poster #{record.reference}</span> : null;

const useStyles = makeStyles({
    ...createStyles,
    comment: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 256,
    },
    container: {
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
    },
    root: {
        padding: '0 !important',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .tabbed-form': {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        '& .toolbar': {
            marginTop: 'auto',
        },
    },
});

const ProductEditFormWithPreview: FC<{ toolbar: any }> = ({
    children,
    ...props
}) => {
    const classes = useStyles();
    useDefineAppLocation('catalog.products.edit', props);
    return (
        <FormWithRedirect
            {...props}
            render={({ component, ...formProps }): JSX.Element => {
                return (
                    <div className={classes.container}>
                        <Card>
                            <CardContent className={classes.root}>
                                <SimpleForm {...formProps}>
                                    {children}
                                </SimpleForm>
                            </CardContent>
                        </Card>
                        <div data-testid="product-edit-preview">
                            <FormDataConsumer>
                                {({ formData }): JSX.Element => {
                                    return <ProductPreview record={formData} />;
                                }}
                            </FormDataConsumer>
                        </div>
                    </div>
                );
            }}
        />
    );
};

const ProductEdit: FC<EditProps> = props => {
    const { resource, id } = props;

    const classes = useStyles();
    const notify = useNotify();

    const { loading } = useLock(
        resource as string,
        id as string,
        'todousername',
        {
            onFailure: () => {
                notify('ra-realtime.notification.lock.lockedBySomeoneElse');
            },
        }
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Edit {...props} title={<ProductTitle />} component="div">
            <ProductEditFormWithPreview toolbar={<CustomToolbar />}>
                <Poster />
                <TextInput source="image" fullWidth />
                <TextInput source="thumbnail" fullWidth />
                <AccordionSection
                    label="resources.products.tabs.description"
                    data-tour-id="description-tab"
                    fullWidth
                >
                    <MarkdownInput source="description" label="" />
                </AccordionSection>
                <AccordionSection
                    label="resources.products.tabs.details"
                    fullWidth
                >
                    <TextInput source="reference" />
                    <NumberInput
                        source="price"
                        className={classes.price}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    €
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="width"
                        className={classes.width}
                        formClassName={classes.widthFormGroup}
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
                        className={classes.height}
                        formClassName={classes.heightFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ReferenceInput source="category_id" reference="categories">
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <NumberInput source="stock" className={classes.stock} />
                </AccordionSection>
                <AccordionSection
                    label="resources.products.tabs.reviews"
                    fullWidth
                >
                    <ReferenceManyField
                        label=""
                        reference="reviews"
                        target="product_id"
                        pagination={<ReferenceManyFieldPagination />}
                        fullWidth
                    >
                        <Datagrid>
                            <DateField source="date" />
                            <CustomerReferenceField />
                            <StarRatingField />
                            <TextField
                                source="comment"
                                cellClassName={classes.comment}
                            />
                            <TextField source="status" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </AccordionSection>
            </ProductEditFormWithPreview>
        </Edit>
    );
};

const CustomToolbar: FC<any> = props => {
    const { resource, record } = props;

    const { data: lock } = useHasLock(resource, record.id);
    const isMeLocker = lock?.identity === 'todousername';

    return (
        <Toolbar {...props}>
            <SaveButton disabled={!isMeLocker} />
            {!isMeLocker && <LockMessage identity={lock?.identity} />}
        </Toolbar>
    );
};

const useLockMessageStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0, 1),
    },
}));

const LockMessage: FC<any> = props => {
    const { identity, variant = 'body1' } = props;
    const classes = useLockMessageStyles(props);

    return (
        <Typography className={classes.root} variant={variant}>
            This record is locked by another user: {identity}.
        </Typography>
    );
};

export default ProductEdit;

// There is an issue with the ReferenceManyField or the Pagination component
// which do not sanitize some props (addLabel, fullWidth)
// TODO: Fix react-admin and remove this component
const ReferenceManyFieldPagination: FC = ({
    addLabel,
    fullWidth,
    ...props
}: {
    addLabel?: boolean;
    fullWidth?: boolean;
    [key: string]: any;
}) => {
    return <Pagination {...props} />;
};
