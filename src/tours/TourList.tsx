import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { TopToolbar, Button } from 'react-admin';
import tours from './data';

import Tour from './Tour';
import { useTourStates } from './useTourState';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const ListActions = (): ReactElement => {
    const [, tourStatesActions] = useTourStates();

    return (
        <TopToolbar>
            <Button
                label="Mark all as played"
                onClick={(): void => tourStatesActions.markAllAsPlayed()}
            >
                <PlaylistAddCheckIcon />
            </Button>
            <Button
                label="Reset"
                onClick={(): void => tourStatesActions.resetAll()}
            >
                <RotateLeftIcon />
            </Button>
        </TopToolbar>
    );
};

const TourList = (): ReactElement => {
    useDefineAppLocation('tours');
    return (
        <>
            <ListActions />
            <Grid
                container
                spacing={2}
                data-testid="tourlist"
                sx={{
                    alignItems: 'stretch',
                    px: 1,
                }}
            >
                {tours.map(tour => (
                    <Grid
                        key={tour.id}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                        }}
                    >
                        <Tour record={tour} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default TourList;
