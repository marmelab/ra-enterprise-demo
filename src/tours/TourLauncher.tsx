import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
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

    return null;
};

export default TourLauncher;
