import React, { FC } from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    FormDataConsumer,
    FormWithRedirect,
} from 'react-admin';
import { MarkdownInput } from '@react-admin/ra-markdown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';
import Preview from './Preview';
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
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    root: { padding: '0 !important' },
});

const TabbedFormWithPreview = props => {
    const classes = useStyles();

    return (
        <FormWithRedirect
            {...props}
            render={formProps => (
                <div className={classes.container}>
                    <Card>
                        <CardContent className={classes.root}>
                            <TabbedForm {...formProps} />
                        </CardContent>
                    </Card>
                    <div
                        data-testid="product-edit-preview"
                    >
                        <FormDataConsumer>
                            {({ formData, ...rest }) => {
                                return <Preview record={formData} />;
                            }}
                        </FormDataConsumer>
                    </div>
                </div>
            )}
        />
    );
};

const ProductEdit = props => {
    const classes = useStyles();
    return (
        <Edit {...props} title={<ProductTitle />} component="div">
            <TabbedFormWithPreview>
                <FormTab label="resources.products.tabs.image">
                    <Poster />
                    <TextInput source="image" fullWidth />
                    <TextInput source="thumbnail" fullWidth />
                </FormTab>
                <FormTab label="resources.products.tabs.details" path="details">
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
                </FormTab>
                <FormTab
                    label="resources.products.tabs.description"
                    path="description"
                    data-tour-id="description-tab"
                >
                    <MarkdownInput source="description" label="" />
                </FormTab>
                <FormTab label="resources.products.tabs.reviews" path="reviews">
                    <ReferenceManyField
                        reference="reviews"
                        target="product_id"
                        addLabel={false}
                        pagination={<Pagination />}
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
                </FormTab>
            </TabbedFormWithPreview>
        </Edit>
    );
};

export default ProductEdit;
