import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTour } from '@react-admin/ra-tour';

const TourLauncher = () => {
    const { tour } = useParams();
    const [_, { start }] = useTour();

    useEffect(() => {
        if (start) {
            start(tour);
        }
    }, [start, tour]);
    return null;
};

export default TourLauncher;
