import React, { FC } from 'react';
import {
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SearchListItemLink } from './index';

export const ProductListItem: FC<any> = props => {
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
            component={SearchListItemLink}
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
                            {record.width} x {record.height} cm
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
