import * as React from 'react';
import {
    Link,
    NumberField,
    TextField,
    DateField,
    useTranslate,
    useGetList,
    RecordContextProvider,
    useRecordContext,
    useReference,
    useLocaleState,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import order from '../orders';
import review from '../reviews';
import StarRatingField from '../reviews/StarRatingField';
import {
    Order as OrderRecord,
    Review as ReviewRecord,
    Customer,
} from '../types';

const Aside = () => {
    const record = useRecordContext<Customer>();
    return (
        <Box
            sx={{
                width: 400,
                display: { xs: 'none', lg: 'block' },
            }}
        >
            {record && <EventList />}
        </Box>
    );
};

const EventList = () => {
    const record = useRecordContext<Customer>();
    const translate = useTranslate();

    const { data: orders } = useGetList<OrderRecord>(
        'orders',
        {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'date', order: 'DESC' },
            filter: { customer_id: record?.id },
        },
        { enabled: !!record?.id }
    );
    const { data: reviews } = useGetList<ReviewRecord>(
        'reviews',
        {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'date', order: 'DESC' },
            filter: { customer_id: record?.id },
        },
        { enabled: !!record?.id }
    );
    const events = mixOrdersAndReviews(orders, reviews);

    return (
        <Box
            sx={{
                ml: 2,
            }}
        >
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate('resources.customers.fieldGroups.history')}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                            size={6}
                        >
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <Typography variant="body2">
                                    {translate(
                                        'resources.customers.fields.first_seen'
                                    )}
                                </Typography>
                                <DateField
                                    record={record}
                                    source="first_seen"
                                />
                            </Box>
                        </Grid>
                        {orders && (
                            <Grid
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                                size={6}
                            >
                                <order.icon fontSize="small" color="disabled" />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    {translate('resources.orders.amount', {
                                        smart_count: orders.length,
                                    })}
                                </Typography>
                            </Grid>
                        )}
                        <Grid
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                            size={6}
                        >
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <Typography variant="body2">
                                    {translate(
                                        'resources.customers.fields.last_seen'
                                    )}
                                </Typography>
                                <DateField record={record} source="last_seen" />
                            </Box>
                        </Grid>
                        {reviews && (
                            <Grid
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                                size={6}
                            >
                                <review.icon
                                    fontSize="small"
                                    color="disabled"
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    {translate('resources.reviews.amount', {
                                        smart_count: reviews.length,
                                    })}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
            {events && <Timeline events={events} />}
        </Box>
    );
};

interface AsideEvent {
    type: string;
    date: string;
    data: OrderRecord | ReviewRecord;
}

const mixOrdersAndReviews = (
    orders?: OrderRecord[],
    reviews?: ReviewRecord[]
): AsideEvent[] => {
    const eventsFromOrders = orders
        ? orders.map<AsideEvent>(order => ({
              type: 'order',
              date: order.date,
              data: order,
          }))
        : [];
    const eventsFromReviews = reviews
        ? reviews.map<AsideEvent>(review => ({
              type: 'review',
              date: review.date,
              data: review,
          }))
        : [];
    const events = eventsFromOrders.concat(eventsFromReviews);
    events.sort(
        (e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime()
    );
    return events;
};

const OrderTitle = () => {
    const record = useRecordContext();
    const translate = useTranslate();
    if (!record) return null;
    return (
        <>
            {translate('pos.events.order.title', {
                smart_count: record.basket.length,
            })}
        </>
    );
};

const Order = () => {
    const record = useRecordContext();
    const [locale] = useLocaleState();
    if (!record) return null;
    return (
        <>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {new Date(record.date).toLocaleString(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Reference &nbsp;#{record.reference}&nbsp;-&nbsp;
                <TextField source="status" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <NumberField
                    source="total"
                    options={{ style: 'currency', currency: 'USD' }}
                />
            </Typography>
        </>
    );
};

const ReviewTitle = () => {
    const record = useRecordContext();
    const translate = useTranslate();
    const { referenceRecord } = useReference({
        reference: 'products',
        id: record?.product_id,
    });
    if (!record) return null;
    return (
        <>
            {translate('pos.events.review.title', {
                product: referenceRecord?.reference,
            })}
        </>
    );
};

const Review = () => {
    const [locale] = useLocaleState();
    const record = useRecordContext();
    if (!record) return null;
    return (
        <>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {new Date(record.date).toLocaleString(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })}
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
                gutterBottom
            >
                {record.comment}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <StarRatingField source="rating" />
            </Typography>
        </>
    );
};

const Timeline = ({ events }: { events: AsideEvent[] }) => (
    <Stepper orientation="vertical" sx={{ my: 1, ml: 1.5 }}>
        {events.map(event => (
            <Step
                key={`${event.type}-${event.data.id}`}
                expanded
                active
                completed
            >
                <Link
                    to={`/${event.type === 'order' ? 'orders' : 'reviews'}/${
                        event.data.id
                    }`}
                    underline="none"
                >
                    <RecordContextProvider value={event.data}>
                        <StepLabel
                            icon={
                                event.type === 'order' ? (
                                    <order.icon
                                        color="disabled"
                                        sx={{ pl: 0.5 }}
                                    />
                                ) : (
                                    <review.icon
                                        color="disabled"
                                        sx={{ pl: 0.5 }}
                                    />
                                )
                            }
                        >
                            {event.type === 'order' ? (
                                <OrderTitle />
                            ) : (
                                <ReviewTitle />
                            )}
                        </StepLabel>
                        <StepContent>
                            {event.type === 'order' ? <Order /> : <Review />}
                        </StepContent>
                    </RecordContextProvider>
                </Link>
            </Step>
        ))}
    </Stepper>
);

export default Aside;
