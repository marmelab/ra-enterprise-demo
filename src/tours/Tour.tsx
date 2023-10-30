import React from 'react';
import { RaRecord, useTranslate } from 'react-admin';
import { useTour } from '@react-admin/ra-tour';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useTourState } from './useTourState';

const Tour = ({ record }: { record: RaRecord }) => {
    const translate = useTranslate();
    const [playedOn, tourStateActions] = useTourState(record.id.toString());
    // eslint-disable-next-line no-unused-vars
    const [, { start }] = useTour();

    const handlePlayClicked = (): void => {
        if (start) {
            start(record.tour);
        }
        tourStateActions.markAsPlayed();
    };

    const basePath = import.meta.env.BASE_URL;

    return (
        <Card
            sx={{
                cursor: 'pointer',
                opacity: playedOn ? 0.6 : 0.9,
                transition: 'opacity 0.3s ease-in-out',
                '&:hover,&:focus-within': {
                    opacity: 1,
                },
                height: '100%',
            }}
            onClick={handlePlayClicked}
        >
            <CardMedia
                sx={{
                    height: 140,
                    filter: 'brightness(0.9) drop-shadow(0 0 0 blue)',
                }}
                image={`${basePath}${record.image}`}
                title={record.title}
            />
            <CardContent sx={{ position: 'relative' }}>
                {!playedOn && (
                    <NewReleasesIcon
                        color="error"
                        fontSize="large"
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    />
                )}
                <Typography variant="h5" component="h2" gutterBottom>
                    {record.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {translate(record.comment, { _: record.comment })}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" startIcon={<PlayIcon />} color="primary">
                    {translate('tours.action.play')}
                </Button>
                <Box pl={1}>
                    <Typography variant="caption" color="textSecondary">
                        {!!playedOn
                            ? translate('tours.message.played_on', {
                                  date: new Date(playedOn).toLocaleString(),
                              })
                            : translate('tours.message.never_played')}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    );
};

export default Tour;
