import * as React from 'react';
import {
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import { SearchListItemLink } from './index';
import { useTranslate } from 'react-admin';
import { LinkedData } from './LinkedData';

const secondaryTypographyProps = {
    component: 'div',
};

export const ProductListItem = (props: any) => {
    const { data, onClick } = props;
    const { content } = data;

    const translate = useTranslate();

    if (!content) {
        return null;
    }

    return (
        <ListItem
            button
            component={SearchListItemLink}
            data={data}
            onClick={onClick}
            alignItems="flex-start"
            sx={{
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'none',
                },
                '& a': {
                    textDecoration: 'none',
                },
                '& a:hover': {
                    textDecoration: 'none',
                },
            }}
        >
            <ListItemAvatar
                sx={{
                    width: 64,
                    height: 64,
                    paddingRight: 2,
                }}
            >
                <Box
                    sx={{
                        '& img': {
                            width: '100%',
                        },
                    }}
                >
                    <img src={content.thumbnail} alt={content.reference} />
                </Box>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography color="textPrimary">
                        {content.reference}
                    </Typography>
                }
                secondary={
                    content.reviews > 0 ? (
                        <Box
                            component="ul"
                            display="flex"
                            justifyContent="space-between"
                            padding={0}
                            marginTop={1}
                            marginBottom={1}
                        >
                            <LinkedData
                                icon={<CommentIcon />}
                                label={translate('resources.reviews.name', {
                                    smart_count: 2,
                                })}
                                to={`/reviews?filter=%7B"product_id"%3A${content.id}%7D`}
                            >
                                {content.reviews}
                            </LinkedData>
                        </Box>
                    ) : undefined
                }
                // @ts-ignore Could not make TS happy
                secondaryTypographyProps={secondaryTypographyProps}
            />
        </ListItem>
    );
};
