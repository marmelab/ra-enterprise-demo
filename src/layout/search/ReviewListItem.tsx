import React, { FC } from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import CommentIcon from '@material-ui/icons/Comment';

import { SearchListItemLink } from './index';

const secondaryTypographyProps = {
    component: 'div',
};

export const ReviewListItem: FC<any> = props => {
    const { data, onClick } = props;
    const classes = useStyles();
    const {
        content: { record },
    } = data;

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
                <Avatar alt={record.reference}>
                    <CommentIcon fontSize="large" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<Rating value={record.rating} readOnly />}
                secondary={<ReviewComment comment={record.comment} />}
                // @ts-ignore Could not make TS happy
                secondaryTypographyProps={secondaryTypographyProps}
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

export function truncateString(text: string, max: number): string {
    // If the length of text is less than or equal to num
    // just return text--don't truncate it.
    if (text.length <= max) {
        return text;
    }
    // Return text truncated with '...' concatenated to the end of text.
    return text.slice(0, max) + '...';
}

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 112, // Double the default MUI value
        height: 112, // Double the default MUI value
        paddingRight: theme.spacing(2),

        '& > *': {
            width: '100%',
            height: '100%',
        },
    },
}));
