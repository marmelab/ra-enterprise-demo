import React from 'react';
import {
    AutocompleteInput,
    DateInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
    Filter,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useFilterStyles = makeStyles({
    status: { width: 150 },
});

const ReviewFilter = props => {
    const classes = useFilterStyles();
    return (
        <Filter {...props}>
            <SearchInput source="q" alwaysOn />
            <SelectInput
                source="status"
                choices={[
                    { id: 'accepted', name: 'pos.reviews.accepted' },
                    { id: 'pending', name: 'pos.reviews.pending' },
                    { id: 'rejected', name: 'pos.reviews.rejected' },
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
