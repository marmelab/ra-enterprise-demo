import React from 'react';
import { useMutation, useRefresh } from 'react-admin';
import { MarkdownField } from '@react-admin/ra-markdown';
import { useTour } from '@react-admin/ra-tour';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        cursor: 'pointer',
        margin: 20,
        opacity: 0.9,
        transition: 'opacity 0.3s ease-in-out',
        '&:hover,&:focus-within': {
            opacity: 1,
        },
    },
    visited: {
        opacity: 0.6,
    },
    media: {
        height: 140,
    },
    rightButton: {
        marginLeft: 'auto',
    },
    content: {
        position: 'relative',
    },
    newIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    actions: {
        paddingBottom: 0,
    },
    buyIcon: {
        marginLeft: 'auto !important',
    },
    playedOnIndicator: {
        paddingLeft: 16,
        paddingTop: 0,
        paddingBottom: 16,
    },
});

export default ({ record }) => {
    const classes = useStyles();
    const refresh = useRefresh();
    // eslint-disable-next-line no-unused-vars
    const [_, { start }] = useTour();

    const [setPlayed] = useMutation(
        {
            type: 'update',
            resource: 'tours',
            payload: { id: record.id, data: { playedOn: new Date() } },
        },
        {
            onSuccess: refresh,
        }
    );

    const handlePlayClicked = () => {
        start(record.tour);
        setPlayed();
    };

    return (
        <Card
            className={classnames(classes.root, {
                [classes.visited]: record.playedOn,
            })}
            onClick={handlePlayClicked}
        >
            <CardMedia
                className={classes.media}
                image={`${process.env.PUBLIC_URL}/${record.image}`}
                title={record.title}
            ></CardMedia>
            <CardContent className={classes.content}>
                {!record.playedOn && (
                    <NewReleasesIcon
                        color="error"
                        fontSize="large"
                        className={classes.newIcon}
                    />
                )}
                <Typography gutterBottom variant="h5" component="h2">
                    {record.title}
                </Typography>
                <MarkdownField record={record} source="comment" />
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" startIcon={<PlayIcon />} color="primary">
                    Play
                </Button>
                <Button
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    color="secondary"
                    className={classes.buyIcon}
                    href={record.href}
                >
                    Buy
                </Button>
            </CardActions>
            <div className={classes.playedOnIndicator}>
                <Typography
                    variant="caption"
                    display="block"
                    color="textSecondary"
                >
                    {record.playedOn
                        ? `Last played on ${new Date(
                              record.playedOn
                          ).toLocaleString()}`
                        : `Never played before`}
                </Typography>
            </div>
        </Card>
    );
};
