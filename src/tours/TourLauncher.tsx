import React, { useEffect } from 'react';
import { useTour } from '@react-admin/ra-tour';
import { Navigate, useParams } from 'react-admin';

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
