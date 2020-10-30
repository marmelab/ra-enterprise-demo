import React, { useEffect, useState, FC } from 'react';
import classnames from 'classnames';
import { useTranslate, useDataProvider } from 'react-admin';
import {
    Avatar,
    Box,
    Grid,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CircularProgress,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Rating } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import {
    Search,
    SearchProps,
    SearchResultsPanel,
} from '@react-admin/ra-search';

const CustomSearch: FC<SearchProps> = props => {
    const resultsPanelClasses = useSearchResultsPanelStyles();

    return (
        <Search {...props}>
            <SearchResultsPanel classes={resultsPanelClasses}>
                <CustomSearchResultItem />
            </SearchResultsPanel>
        </Search>
    );
};

const useSearchResultsPanelStyles = makeStyles(() => ({
    root: {
        maxHeight: 'calc(100vh - 100px)',
        maxWidth: 512,
    },
}));

export default CustomSearch;

const CustomSearchResultItem: FC<any> = props => {
    const { data, onClose, ...rest } = props;

    if (!data) {
        return null;
    }

    switch (data.type) {
        case 'customers':
            return <CustomerListItem {...rest} data={data} onClick={onClose} />;
        case 'products':
            return <ProductListItem {...rest} data={data} onClick={onClose} />;
        case 'commands':
            return <CommandListItem {...rest} data={data} onClick={onClose} />;
        case 'reviews':
            return <ReviewListItem {...rest} data={data} onClick={onClose} />;
        default:
            return null;
    }
};

const CustomerListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    if (!record) {
        return null;
    }

    const fullname = getFullname({
        firstName: record.first_name,
        lastName: record.last_name,
    });

    return (
        <ListItem
            button
            component={CustomLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <ListItemAvatar>
                <Avatar alt={fullname} src={record.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body1" color="textPrimary">
                        {fullname}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="textPrimary">
                        {record.email}
                    </Typography>
                }
            />
        </ListItem>
    );
};

const ProductListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    const classes = useProductListItemStyles();

    if (!record) {
        return null;
    }

    return (
        <ListItem
            button
            component={CustomLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <ListItemAvatar>
                <div className={classes.preview}>
                    <div className={classes.frame}>
                        <div className={classes.mat}>
                            <div className={classes.art}>
                                <img
                                    src={record.thumbnail}
                                    alt={record.reference}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body1" color="textPrimary">
                        {record.reference}
                    </Typography>
                }
                secondary={
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <Typography variant="caption" color="textPrimary">
                            {record.width} x {record.height}
                        </Typography>
                        <Typography variant="caption" color="textPrimary">
                            {record.price}€
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
    );
};

const useProductListItemStyles = makeStyles(theme => ({
    preview: {
        padding: theme.spacing(0, 1, 0, 0),
    },
    frame: {
        position: 'relative',
        width: '100%',
        paddingBottom: '85%',
        background: theme.palette.common.black,
        boxShadow: '0 10px 7px -5px rgba(0, 0, 0, 0.3)',
    },
    mat: {
        position: 'absolute',
        background: theme.palette.background.paper,
        top: '3.0303%',
        bottom: '3.0303%',
        left: '2.5%',
        right: '2.5%',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.5) inset',
    },
    art: {
        position: 'absolute',
        top: '16.129%',
        bottom: '16.129%',
        left: '13.158%',
        right: '13.158%',
        '& img': {
            width: '100%',
        },
    },
}));

const CommandListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    const classes = useCommandListItemStyles();
    const translate = useTranslate();

    if (!record) {
        return null;
    }

    return (
        <ListItem
            button
            component={CustomLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <Grid className={classes.root} container spacing={2}>
                <Grid container item xs>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.reference}
                            variant="body2"
                            color="textPrimary"
                            gutterBottom
                        >
                            {record.reference}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            gutterBottom
                        >
                            {new Date(record.date).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.total}
                            variant="caption"
                            color="textPrimary"
                        >
                            {`${translate(
                                'resources.commands.fields.basket.total'
                            )} ${record.total}`}
                            €
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <OrderStatus status={record.status} />
                    </Grid>
                </Grid>
                <Grid container item xs>
                    <Grid item xs={12}>
                        <Customer customerId={record.customer_id} />
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
};

const useCommandListItemStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 0),
    },
    reference: {
        fontWeight: theme.typography.fontWeightBold,
    },
    total: {
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const OrderStatus: FC<{ status: string }> = ({ status }) => {
    const classes = useOrderStatusStyles();

    return (
        <div
            className={classnames(classes.root, {
                [classes.ordered]: status === 'ordered',
                [classes.delivered]: status === 'delivered',
                [classes.cancelled]: status === 'cancelled',
            })}
        >
            <Typography className={classes.status} variant="caption">
                {status}
            </Typography>
        </div>
    );
};

const useOrderStatusStyles = makeStyles(theme => ({
    root: {
        maxWidth: 64,
        padding: theme.spacing(0.25, 1),
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
    },
    ordered: {
        backgroundColor: lighten(blue[300], 0.3),
        color: theme.palette.getContrastText(lighten(blue[300], 0.3)),
    },
    delivered: {
        backgroundColor: lighten(theme.palette.success.main, 0.3),
        color: theme.palette.getContrastText(
            lighten(theme.palette.success.main, 0.3)
        ),
    },
    cancelled: {
        backgroundColor: lighten(theme.palette.error.main, 0.3),
        color: theme.palette.getContrastText(
            lighten(theme.palette.error.main, 0.3)
        ),
    },
    status: {
        color: 'inherit',
        textTransform: 'capitalize',
    },
}));

const Customer: FC<{ customerId?: number | string }> = ({ customerId }) => {
    const dataProvider = useDataProvider();

    const [customerRecord, setCustomerRecord] = useState({
        first_name: '',
        last_name: '',
    });
    const [customerLoading, setCustomerLoading] = useState(true);

    useEffect(() => {
        if (!dataProvider || customerId == null) {
            return;
        }
        dataProvider
            .getOne('customers', { id: customerId })
            .then(({ data }) => {
                setCustomerRecord(data);
                setCustomerLoading(false);
            })
            .catch(() => {
                setCustomerLoading(false);
            });
    }, [dataProvider, customerId]);

    const fullname = getFullname({
        firstName: customerRecord.first_name,
        lastName: customerRecord.last_name,
    });

    return customerLoading ? (
        <CircularProgress size={20} />
    ) : (
        <Typography variant="body2" color="textPrimary" gutterBottom>
            {fullname}
        </Typography>
    );
};

const ReviewListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    if (!record) {
        return null;
    }

    return (
        <ListItem
            button
            component={CustomLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
        >
            <ListItemText
                primary={<Rating value={record.rating} readOnly />}
                secondary={<ReviewComment comment={record.comment} />}
            />
        </ListItem>
    );
};

const ReviewComment: FC<{ comment: string }> = ({ comment }) => {
    return (
        <div>
            {comment.length <= 300 ? (
                <Typography variant="caption" color="textPrimary">
                    {comment}
                </Typography>
            ) : (
                <Tooltip title={comment}>
                    <Typography variant="caption" color="textPrimary">
                        {truncateString(comment, 300)}
                    </Typography>
                </Tooltip>
            )}
        </div>
    );
};

const CustomLink: FC<any> = props => {
    const { data, onClick, ...rest } = props;

    return (
        <Link
            component={RouterLink}
            to={data.url}
            onClick={onClick}
            {...rest}
        />
    );
};

function getFullname({
    firstName,
    lastName,
}: {
    firstName: string;
    lastName: string;
}): string {
    return `${firstName} ${lastName}`;
}

function truncateString(text: string, max: number): string {
    // If the length of text is less than or equal to num
    // just return text--don't truncate it.
    if (text.length <= max) {
        return text;
    }
    // Return text truncated with '...' concatenated to the end of text.
    return text.slice(0, max) + '...';
}
