import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useTour } from '@react-admin/ra-tour';

const TourLauncher: FC = () => {
    const { tour } = useParams<{ tour: string }>();
    const [, { start }] = useTour();

    useEffect(() => {
        if (start) {
            start(tour);
        }
    }, [start, tour]);
    return null;
};

export default TourLauncher;
