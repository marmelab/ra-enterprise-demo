import { EventInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Theme, useMediaQuery } from '@mui/material';
import { CompleteCalendar } from '@react-admin/ra-calendar';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import React, { useCallback } from 'react';
import {
    useGetList,
    useGetOne,
    useLocaleState,
    useRecordContext,
    useTranslate,
} from 'react-admin';
import { Store, Visit } from '../types';
import { VisitForm } from './VisitForm';

const VisitEditTitle = () => {
    const visit = useRecordContext<Visit>();
    const { data: store } = useGetOne<Store>(
        'stores',
        { id: visit!.storeId },
        { enabled: !!visit?.storeId }
    );
    const translate = useTranslate();
    if (!store) return null;
    return <>{translate('resources.visits.edit.title', store)}</>;
};

// Default getFilterValueFromInterval won't take recurring events into account.
// Since we won't have that many anyway, we can fetch them all.
const getFilterValueFromInterval = () => ({});

export const VisitList = () => {
    useDefineAppLocation('stores.visits');
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    const translate = useTranslate();
    const [locale] = useLocaleState();

    // Fetch the stores to use their data to compute the events title.
    // We could have used useGetManyAggregate, but since there are only a few
    // stores, we can fetch them all and filter them in memory.
    const { data: stores } = useGetList('stores');

    const convertToEvent = useCallback(
        (visit: Visit): EventInput => ({
            id: String(visit.id),
            title: translate('resources.visits.event.title', {
                ...stores?.find(store => store.id === visit.storeId),
                _: 'Visit store',
            }),
            start: visit.start,
            end: visit.end,
            duration: differenceInMilliseconds(
                parseISO(visit.end),
                parseISO(visit.start)
            ),
            rrule: {
                freq: visit.freq,
                interval: visit.interval,
                dtstart: visit.start,
                count: visit.count,
            },
            backgroundColor: visit.color,
            borderColor: visit.color,
        }),
        [stores, translate]
    );
    return (
        <CompleteCalendar
            CalendarProps={{
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    rrulePlugin,
                ],
                locales: [frLocale],
                locale,
                convertToEvent,
                getFilterValueFromInterval,
                height: 'auto',
                slotMinTime: '09:00',
                slotMaxTime: '18:00',
            }}
            ListProps={{ sx: { marginTop: isSmall ? undefined : -4 } }}
            EditDialogProps={{
                title: <VisitEditTitle />,
            }}
            CreateDialogProps={{
                title: 'resources.visits.create.title',
            }}
        >
            <VisitForm />
        </CompleteCalendar>
    );
};
