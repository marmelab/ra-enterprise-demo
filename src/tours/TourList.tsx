import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { TopToolbar, Button } from 'react-admin';
import tours from './data';

import Tour from './Tour';
import { useTourStates } from './useTourState';
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const useListStyles = makeStyles({
    gridContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '-20px',
        marginRight: '-20px',
    },
});

const ListActions = (): ReactElement => {
    const [_, tourStatesActions] = useTourStates();

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
    const classes = useListStyles();
    useDefineAppLocation('tours');
    return (
        <>
            <ListActions />
            <div className={classes.gridContainer}>
                {tours.map(tour => (
                    <Tour key={tour.id} record={tour} />
                ))}
            </div>
        </>
    );
};

export default TourList;
