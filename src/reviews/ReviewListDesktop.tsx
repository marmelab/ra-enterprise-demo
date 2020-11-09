import React, { FC, useEffect } from 'react';
import { Datagrid, DateField, TextField, useListContext } from 'react-admin';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    useAppLocationState,
    useResourceAppLocation,
} from '@react-admin/ra-navigation';
import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';

import rowStyle from './rowStyle';

const useListStyles = makeStyles({
    headerRow: {
        borderLeftColor: 'white',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    headerCell: {
        padding: '6px 8px 6px 8px',
    },
    rowCell: {
        padding: '6px 8px 6px 8px',
    },
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

const ReviewListDesktop: FC<{ selectedRow: number | false }> = ({
    selectedRow,
    ...props
}) => {
    const classes = useListStyles();
    const theme = useTheme();
    const [, setLocation] = useAppLocationState();
    const resourceLocation = useResourceAppLocation();
    const { filterValues } = useListContext();

    const effectDependency = JSON.stringify({
        resourceLocation,
        filter: filterValues,
    });
    useEffect(() => {
        const { status } = filterValues;
        if (typeof status !== 'undefined') {
            setLocation('reviews.status_filter', { status });
        } else {
            setLocation('reviews');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setLocation, effectDependency]);
    return (
        <Datagrid
            rowClick="edit"
            rowStyle={rowStyle(selectedRow, theme)}
            classes={{
                headerRow: classes.headerRow,
                headerCell: classes.headerCell,
                rowCell: classes.rowCell,
            }}
            optimized
            {...props}
        >
            <DateField source="date" />
            <CustomerReferenceField link={false} />
            <ProductReferenceField link={false} />
            <StarRatingField size="small" />
            <TextField source="comment" cellClassName={classes.comment} />
            <TextField source="status" />
        </Datagrid>
    );
};

export default ReviewListDesktop;
