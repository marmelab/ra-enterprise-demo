import * as React from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Rating,
    Tooltip,
    Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import { SearchListItemLink } from './index';

const secondaryTypographyProps = {
    component: 'div',
};

export const ReviewListItem = (props: any) => {
    const { data, onClick } = props;
    const { content } = data;

    if (!content) {
        return null;
    }

    return (
        <ListItem alignItems="flex-start" sx={{ pl: 0, pr: 1 }}>
            <ListItemButton
                data={data}
                component={SearchListItemLink}
                onClick={onClick}
            >
                <ListItemAvatar
                    sx={{
                        width: 64,
                        height: 64,
                        paddingRight: 2,
                        mt: 0,
                    }}
                >
                    <Avatar alt={content.reference}>
                        <CommentIcon fontSize="small" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    className="highlight"
                    primary={<Rating value={content.rating} readOnly />}
                    secondary={<ReviewComment comment={content.comment} />}
                    // @ts-ignore Could not make TS happy
                    secondaryTypographyProps={secondaryTypographyProps}
                    sx={{ my: 0 }}
                />
            </ListItemButton>
        </ListItem>
    );
};

const ReviewComment = ({ comment }: { comment: string }) => {
    return (
        <div>
            {comment.length <= 200 ? (
                <Typography variant="caption" color="textPrimary">
                    {comment}
                </Typography>
            ) : (
                <Tooltip title={comment}>
                    <Typography variant="caption" color="textPrimary">
                        {truncateString(comment, 200)}
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
