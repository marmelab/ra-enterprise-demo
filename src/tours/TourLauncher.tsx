import React, { FC, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { useTour } from '@react-admin/ra-tour';

const TourLauncher: FC = () => {
    const { tour } = useParams();
    const [{ running }, { start }] = useTour();

    useEffect(() => {
        if (start && !running) {
            start(tour);
            return;
        }
    });

    return running ? <Redirect to="/" /> : null;
};

export default TourLauncher;
