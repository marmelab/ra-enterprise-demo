import React, { ReactElement } from 'react';
import { EventRecord, Timeline } from '@react-admin/ra-audit-log';
import { CardHeader } from '@material-ui/core';
import { useTranslate } from 'ra-core';

const MyTimeline = ({ records }: { records?: EventRecord[] }): ReactElement => {
    const translate = useTranslate();
    return (
        <>
            <CardHeader title={translate('pos.dashboard.timeline')} />
            <Timeline loaded={records !== undefined} records={records} />
        </>
    );
};

export default MyTimeline;
