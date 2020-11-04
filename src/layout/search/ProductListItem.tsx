import React, { FC } from 'react';
import {
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';

import { SearchListItemLink } from './index';
import { useTranslate } from 'react-admin';
import { Stats } from './Stats';

const secondaryTypographyProps = {
    component: 'div',
};

export const ProductListItem: FC<any> = props => {
    const { data, onClick } = props;
    const {
        content: { record },
    } = data;

    const classes = useProductListItemStyles();
    const translate = useTranslate();

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
            <ListItemAvatar className={classes.avatar}>
                <div className={classes.art}>
                    <img src={record.thumbnail} alt={record.reference} />
                </div>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6" color="textPrimary">
                        {record.reference}
                    </Typography>
                }
                secondary={
                    <Box
                        component="ul"
                        display="flex"
                        justifyContent="space-between"
                        padding={0}
                        marginTop={1}
                        marginBottom={1}
                    >
                        <Stats
                            icon={<CommentIcon />}
                            label={translate('resources.reviews.name', {
                                smart_count: 2,
                            })}
                        >
                            {record.reviews}
                        </Stats>
                    </Box>
                }
                // @ts-ignore Could not make TS happy
                secondaryTypographyProps={secondaryTypographyProps}
            />
        </ListItem>
    );
};

const useProductListItemStyles = makeStyles(theme => ({
    avatar: {
        width: 64,
        height: 64,
        paddingRight: theme.spacing(2),
    },
    mat: {
        background: theme.palette.background.paper,
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.5) inset',
    },
    art: {
        '& img': {
            width: '100%',
        },
    },
}));
