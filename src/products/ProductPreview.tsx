import React, { FC } from 'react';
import { MarkdownField } from '@react-admin/ra-markdown';
import { Typography } from '@material-ui/core';
import { makeStyles, lighten, darken } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px',
        width: 350,
        '& > p': {
            fontSize: 12,
            color: theme.palette.text.primary,
            textAlign: 'right',
        },
        // Temporary until darkmode is correctly implemented in ra-markdown
        '& .tui-editor-contents p': {
            color:
                theme.palette.type === 'light'
                    ? lighten(theme.palette.text.primary, 0.38)
                    : darken(theme.palette.text.primary, 0.38),
        },
    },
    info: {
        padding: theme.spacing(2, 3),
        '& h1': {
            fontSize: 18,
            color: theme.palette.text.primary,
            fontWeight: 'normal',
        },
        '& h2': {
            fontSize: 14,
            color:
                theme.palette.type === 'light'
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
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    preview: {
        padding: theme.spacing(2),
    },
    frame: {
        position: 'relative',
        width: '100%',
        paddingBottom: '82.5%',
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
        boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.5) inset',
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

const Preview: FC<{ record: any }> = ({ record }) => {
    const { image, height, width, price, reference } = record;
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.preview}>
                <div className={classes.frame}>
                    <div className={classes.mat}>
                        <div className={classes.art}>
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.info}>
                <Typography variant="h1">{reference}</Typography>
                <div className={classes.details}>
                    <Typography variant="caption">
                        {width} x {height}
                    </Typography>
                    <Typography variant="caption">{price} €</Typography>
                </div>
                <MarkdownField record={record} label="" source="description" />
            </div>
        </div>
    );
};

export default Preview;
