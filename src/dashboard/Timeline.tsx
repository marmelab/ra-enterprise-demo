import React, { ReactElement } from 'react';
import { EventRecord, Timeline } from '@react-admin/ra-audit-log';
import { CardHeader } from '@material-ui/core';
import { useTranslate, useGetList } from 'ra-core';

const MyTimeline = (): ReactElement => {
    const translate = useTranslate();
    const { data: events, loaded, ids } = useGetList<EventRecord>(
        'events',
        { perPage: 100, page: 1 },
        { field: 'date', order: 'DESC' },
        {}
    );
    const records = ids.map(id => events[id]);
    return (
        <>
            <CardHeader title={translate('pos.dashboard.timeline')} />
            <Timeline loaded={loaded} records={records} />
        </>
    );
};

export default MyTimeline;
