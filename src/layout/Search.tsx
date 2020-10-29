import React, { FC } from 'react';
import {
    Avatar,
    Box,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
    Search,
    SearchProps,
    SearchResultsPanel,
} from '@react-admin/ra-search';

const CustomSearch: FC<SearchProps> = props => {
    return (
        <Search {...props}>
            <SearchResultsPanel>
                <CustomSearchResultItem />
            </SearchResultsPanel>
        </Search>
    );
};

export default CustomSearch;

const CustomSearchResultItem = props => {
    const { data, onClose, ...rest } = props;

    if (!data) {
        return null;
    }

    switch (data.type) {
        case 'customers':
            return <CustomerListItem {...rest} data={data} onClick={onClose} />;
        case 'products':
            return <ProductListItem {...rest} data={data} onClick={onClose} />;
        default:
            return null;
    }
};

const CustomerListItem = props => {
    const { data, onClick } = props;

    const {
        content: { record },
    } = data;

    if (!record) {
        return null;
    }

    const fullname = `${record.first_name} ${record.last_name}`;

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

const ProductListItem = props => {
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

const CustomLink = props => {
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
