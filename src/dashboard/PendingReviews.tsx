import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';

import {
    ReferenceField,
    FunctionField,
    useGetList,
    useTranslate,
    useIsDataLoaded,
} from 'react-admin';

import CardWithIcon from './CardWithIcon';
import StarRatingField from '../reviews/StarRatingField';
import { Customer, Review } from '../types';

const PendingReviews = () => {
    const translate = useTranslate();
    const {
        data: reviews,
        total,
        isPending,
    } = useGetList<Review>('reviews', {
        filter: { status: 'pending' },
        sort: { field: 'date', order: 'DESC' },
        pagination: { page: 1, perPage: 100 },
    });

    // Poor man's Suspense: hide the content until all the data is loaded,
    // including the reference customers.
    // As ReferenceField aggregates the calls to reference customers,
    // if the first customer is loaded, then all the customers are loaded.
    const isCustomerDataLoaded = useIsDataLoaded(
        ['customers', 'getMany', { ids: [String(reviews?.[0].customer_id)] }],
        { enabled: !isPending && reviews && reviews.length > 0 }
    );
    const display = isPending || !isCustomerDataLoaded ? 'none' : 'block';

    return (
        <CardWithIcon
            to="/reviews"
            icon={CommentIcon}
            title={translate('pos.dashboard.pending_reviews')}
            subtitle={total}
        >
            <List sx={{ display }}>
                {reviews?.map((record: Review) => (
                    <ListItemButton
                        key={record.id}
                        component={Link}
                        to={`/reviews/${record.id}`}
                        alignItems="flex-start"
                    >
                        <ListItemAvatar>
                            <ReferenceField
                                record={record}
                                source="customer_id"
                                reference="customers"
                                link={false}
                            >
                                <FunctionField<Customer>
                                    render={customer =>
                                        customer ? (
                                            <Avatar
                                                src={`${customer.avatar}?size=32x32`}
                                                sx={{
                                                    bgcolor: 'background.paper',
                                                }}
                                            />
                                        ) : null
                                    }
                                />
                            </ReferenceField>
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <StarRatingField
                                    record={record}
                                    source="rating"
                                />
                            }
                            secondary={record.comment}
                            sx={{
                                overflowY: 'hidden',
                                height: '4em',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                paddingRight: 0,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                &nbsp;
            </Box>
            <Button
                sx={{ borderRadius: 0 }}
                component={Link}
                to="/reviews"
                size="small"
                color="primary"
            >
                <Box
                    sx={{
                        p: 1,
                        color: 'primary.main',
                    }}
                >
                    {translate('pos.dashboard.all_reviews')}
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default PendingReviews;
