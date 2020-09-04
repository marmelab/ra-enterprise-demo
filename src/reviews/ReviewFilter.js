import React from 'react';
import {
    AutocompleteInput,
    DateInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import { useTranslate } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import Filter from '../layout/Filter';

const useFilterStyles = makeStyles({
    status: { width: 150 },
});

const ReviewFilter = props => {
    const classes = useFilterStyles();
    const translate = useTranslate();
    return (
        <Filter {...props}>
            <SearchInput source="q" alwaysOn />
            <SelectInput
                source="status"
                choices={[
                    { id: 'accepted', name: translate(`pos.reviews.accepted`) },
                    { id: 'pending', name: translate(`pos.reviews.pending`) },
                    { id: 'rejected', name: translate(`pos.reviews.rejected`) },
                ]}
                className={classes.status}
            />
            <ReferenceInput source="customer_id" reference="customers">
                <AutocompleteInput
                    optionText={choice =>
                        `${choice.first_name} ${choice.last_name}`
                    }
                />
            </ReferenceInput>
            <ReferenceInput source="product_id" reference="products">
                <AutocompleteInput optionText="reference" />
            </ReferenceInput>
            <DateInput source="date_gte" />
            <DateInput source="date_lte" />
        </Filter>
    );
};

export default ReviewFilter;
