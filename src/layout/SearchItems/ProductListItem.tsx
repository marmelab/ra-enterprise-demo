import * as React from 'react';
import {
    Box,
    ListItem,
    ListItemAvatar,
    ListItemButton,
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
                px: 0,
            }}
        >
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
                        mt: 0.5,
                    }}
                >
                    <Box sx={{ '& img': { width: '100%' } }}>
                        <img src={content.thumbnail} alt={content.reference} />
                    </Box>
                </ListItemAvatar>
                <ListItemText
                    className="highlight"
                    primary={
                        <Typography
                            color="textPrimary"
                            variant="body2"
                            gutterBottom
                        >
                            {content.reference}
                        </Typography>
                    }
                    secondary={
                        content.reviews > 0 ? (
                            <Box
                                component="ul"
                                display="flex"
                                justifyContent="space-between"
                                p={0}
                                m={0}
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
                    sx={{ my: 0 }}
                />
            </ListItemButton>
        </ListItem>
    );
};
