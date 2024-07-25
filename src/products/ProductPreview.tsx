import * as React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, lighten, darken, Typography, useTheme } from '@mui/material';
import { formatNumberAsUSD } from '../formatUtils';

const MarkdownField = React.lazy(() =>
    import('@react-admin/ra-markdown').then(module => ({
        default: module.MarkdownField,
    }))
);

const ProductPreview = (props: any) => {
    const record = useRecordContext(props);
    const theme = useTheme();

    if (!record) return null;

    const { image, height, width, price, reference } = record;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 20px',
                width: 350,
                '& > p': {
                    fontSize: 12,
                    color: 'text.primary',
                    textAlign: 'right',
                },
            }}
        >
            <Box padding={2}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '82.5%',
                        background: 'black',
                        boxShadow: '0 10px 7px -5px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            background: theme.palette.background.paper,
                            top: '3.0303%',
                            bottom: '3.0303%',
                            left: '2.5%',
                            right: '2.5%',
                            boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.5) inset',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '16.129%',
                                bottom: '16.129%',
                                left: '13.158%',
                                right: '13.158%',
                                '& img': {
                                    width: '100%',
                                },
                            }}
                        >
                            <img src={image} alt="" />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    py: 2,
                    px: 3,
                    '& h1': {
                        fontSize: 18,
                        color: 'text.primary',
                        fontWeight: 'normal',
                    },
                    '& h2': {
                        fontSize: 14,
                        color:
                            theme.palette.mode === 'light'
                                ? lighten(theme.palette.text.primary, 0.38)
                                : darken(theme.palette.text.primary, 0.38),
                        fontWeight: 'normal',
                    },
                    '& .MuiFormControl-root': {
                        margin: 0,
                        '& > div': {
                            padding: 0,
                        },
                    },
                }}
            >
                <Typography variant="h1">{reference}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="caption">
                        {width} x {height} cm
                    </Typography>
                    <Typography variant="caption">
                        {formatNumberAsUSD(price, 2)}
                    </Typography>
                </Box>
                <MarkdownField record={record} label="" source="description" />
            </Box>
        </Box>
    );
};

export default ProductPreview;
