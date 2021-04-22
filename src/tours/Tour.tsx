import React, { FC } from 'react';
import { Record } from 'react-admin';
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
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { useTourState } from './useTourState';

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
        minHeight: 125,
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

const Tour: FC<{ record: Record }> = ({ record }) => {
    const classes = useStyles();
    const [playedOn, tourStateActions] = useTourState(record.id.toString());
    // eslint-disable-next-line no-unused-vars
    const [_, { start }] = useTour();

    const handlePlayClicked = (): void => {
        if (start) {
            start(record.tour);
        }
        tourStateActions.markAsPlayed();
    };

    return (
        <Card
            className={classnames(classes.root, {
                [classes.visited]: !!playedOn,
            })}
            onClick={handlePlayClicked}
        >
            <CardMedia
                className={classes.media}
                image={`${process.env.PUBLIC_URL}/${record.image}`}
                title={record.title}
            />
            <CardContent className={classes.content}>
                {!record.playedOn && (
                    <NewReleasesIcon
                        color="error"
                        fontSize="large"
                        className={classes.newIcon}
                    />
                )}
                <Typography variant="h5" component="h2" gutterBottom>
                    {record.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {record.comment}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" startIcon={<PlayIcon />} color="primary">
                    Play
                </Button>
            </CardActions>
            <div className={classes.playedOnIndicator}>
                <Typography
                    variant="caption"
                    display="block"
                    color="textSecondary"
                >
                    {!!playedOn
                        ? `Last played on ${new Date(
                              playedOn
                          ).toLocaleString()}`
                        : `Never played before`}
                </Typography>
            </div>
        </Card>
    );
};

export default Tour;
