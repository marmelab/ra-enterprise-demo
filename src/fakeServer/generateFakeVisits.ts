import * as fns from 'date-fns';
import { Store, Visit } from '../types';

const colors = [
    '#05445e',
    '#b68d40',
    '#189ab4',
    '#75e6da',
    '#d4f1f4',
    '#d6ad60',
];

const startTimes = [
    { hours: 9, minutes: 30 },
    { hours: 10, minutes: 30 },
    { hours: 14, minutes: 0 },
];
const durations = [1, 2, 4];

const createVisit = (
    store: Store,
    start: Date,
    end: Date,
    color: string
): Omit<Visit, 'id'> => {
    return {
        storeId: store.id,
        start: start.toISOString(),
        end: end.toISOString(),
        freq: 'monthly',
        interval: 1,
        count: 6,
        color,
    };
};

const generateFakeVisits = (data: { stores: Store[] }): Visit[] => {
    const now = new Date();
    return data.stores.map((store, index) => {
        const daysOffest = (30 * index) / data.stores.length;
        const startTime = startTimes[index % startTimes.length];
        const duration = durations[index % durations.length];
        const start = fns.addDays(now, daysOffest);
        start.setHours(startTime.hours);
        start.setMinutes(startTime.minutes);
        start.setSeconds(0);
        const end = fns.addHours(start, duration);
        const color = colors[index % colors.length];
        return { id: index, ...createVisit(store, start, end, color) } as Visit;
    });
};

export default generateFakeVisits;
