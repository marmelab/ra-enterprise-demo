import { usePreferences } from '@react-admin/ra-preferences';
import tours from './data';

type TourStateMap = {
    [key: string]: Date | false;
};

type TourStatesActions = {
    markAsPlayed: (tourId: string) => void;
    markAllAsPlayed: () => void;
    reset: (tourId: string) => void;
    resetAll: () => void;
};

type TourStateActions = {
    markAsPlayed: () => void;
    reset: () => void;
};

export const useTourStates = (): [TourStateMap, TourStatesActions] => {
    const [storedTourStates, setTourStates] = usePreferences('tours', {});

    const tourStates = tours.reduce((acc, tour) => {
        acc[tour.id] = storedTourStates[tour.id] || false;
        return acc;
    }, {});

    const actions = {
        markAsPlayed: (tourId): void => {
            const newTourStates = { ...storedTourStates };
            newTourStates[tourId] = new Date();
            setTourStates(newTourStates);
        },
        markAllAsPlayed: (): void => {
            const newTourStates = Object.keys(storedTourStates).reduce(
                (acc, key) => {
                    acc[key] = new Date();
                    return acc;
                },
                {}
            );
            setTourStates(newTourStates);
        },
        reset: (tourId): void => {
            const newTourStates = { ...storedTourStates };
            newTourStates[tourId] = undefined;
            setTourStates(newTourStates);
        },
        resetAll: (): void => {
            const newTourStates = Object.keys(storedTourStates).reduce(
                (acc, key) => {
                    acc[key] = undefined;
                    return acc;
                },
                {}
            );
            setTourStates(newTourStates);
        },
    };

    return [tourStates, actions];
};

export const useTourState = (
    tourId: string
): [Date | false, TourStateActions] => {
    const [tourStates, tourStateActions] = useTourStates();
    const tourState = tourStates[tourId];

    const actions = {
        markAsPlayed: () => tourStateActions.markAsPlayed(tourId),
        reset: () => tourStateActions.reset(tourId),
    };

    return [tourState, actions];
};
