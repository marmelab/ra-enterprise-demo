import React, { FC } from 'react';
import { ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { SearchListItemLink } from './index';

export const ReviewListItem: FC<any> = props => {
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
            component={SearchListItemLink}
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

export function truncateString(text: string, max: number): string {
    // If the length of text is less than or equal to num
    // just return text--don't truncate it.
    if (text.length <= max) {
        return text;
    }
    // Return text truncated with '...' concatenated to the end of text.
    return text.slice(0, max) + '...';
}
