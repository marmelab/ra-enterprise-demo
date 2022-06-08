import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';
import { useTour } from '@react-admin/ra-tour';

const TourLauncher = () => {
    const { tour } = useParams<{ tour: string }>();
    const [{ running }, { start }] = useTour();

    useEffect(() => {
        if (start && !running && tour) {
            start(tour);
            return;
        }
    }, [running, start, tour]);

    return running ? <Navigate to="/" /> : null;
};

export default TourLauncher;
