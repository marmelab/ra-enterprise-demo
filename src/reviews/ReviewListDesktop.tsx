import * as React from 'react';
import {
    Identifier,
    DatagridConfigurable,
    DateField,
    TextField,
    BulkDeleteButton,
    useCreatePath,
} from 'react-admin';

import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import rowStyle from './rowStyle';

import BulkAcceptButton from './BulkAcceptButton';
import BulkRejectButton from './BulkRejectButton';
import { useNavigate } from 'react-router';

export interface ReviewListDesktopProps {
    selectedRow?: Identifier;
}

const ReviewsBulkActionButtons = () => (
    <>
        <BulkAcceptButton />
        <BulkRejectButton />
        <BulkDeleteButton />
    </>
);

const ReviewListDesktop = ({ selectedRow }: ReviewListDesktopProps) => {
    const navigate = useNavigate();
    const createPath = useCreatePath();

    return (
        <DatagridConfigurable
            rowClick={(id, resource) => {
                navigate(createPath({ resource, id, type: 'edit' }));
                return false;
            }}
            rowStyle={rowStyle(selectedRow)}
            bulkActionButtons={<ReviewsBulkActionButtons />}
            sx={{
                '& .RaDatagrid-thead': {
                    borderLeftColor: 'transparent',
                    borderLeftWidth: 5,
                    borderLeftStyle: 'solid',
                },
                '& .column-comment': {
                    maxWidth: '18em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
            }}
        >
            <DateField source="date" />
            <CustomerReferenceField link={false} />
            <ProductReferenceField link={false} />
            <StarRatingField
                size="small"
                label="resources.reviews.fields.rating"
                source="rating"
            />
            <TextField source="comment" />
            <TextField source="status" />
        </DatagridConfigurable>
    );
};

export default ReviewListDesktop;
