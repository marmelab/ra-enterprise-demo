import { Identifier, useStore } from 'react-admin';
import tours from './data';

type TourStateMap = {
    [key: string]: TourState;
};

type TourState = Date | undefined | false;
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
    const [storedTourStates, setTourStates] = useStore<TourStateMap>(
        'tours',
        {}
    );

    const tourStates = tours.reduce((acc, tour) => {
        acc[tour.id] = storedTourStates[tour.id] || false;
        return acc;
    }, {} as TourStateMap);

    const actions = {
        markAsPlayed: (tourId: Identifier): void => {
            const newTourStates = { ...storedTourStates };
            newTourStates[tourId] = new Date();
            setTourStates(newTourStates);
        },
        markAllAsPlayed: (): void => {
            const newTourStates = tours.reduce((acc, tour) => {
                acc[tour.id] = new Date();
                return acc;
            }, {} as TourStateMap);
            setTourStates(newTourStates);
        },
        reset: (tourId: Identifier): void => {
            const newTourStates = { ...storedTourStates } as TourStateMap;
            newTourStates[tourId] = undefined;
            setTourStates(newTourStates);
        },
        resetAll: (): void => {
            setTourStates({});
        },
    };

    return [tourStates, actions];
};

export const useTourState = (tourId: string): [TourState, TourStateActions] => {
    const [tourStates, tourStateActions] = useTourStates();
    const tourState = tourStates[tourId];

    const actions = {
        markAsPlayed: () => tourStateActions.markAsPlayed(tourId),
        reset: () => tourStateActions.reset(tourId),
    };

    return [tourState, actions];
};
