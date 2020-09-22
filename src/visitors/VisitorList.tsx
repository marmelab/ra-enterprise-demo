import React, { FC } from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    Filter,
} from 'react-admin';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { useMediaQuery, Theme, makeStyles } from '@material-ui/core';

import EnterpriseList from '../ra-enterprise/List';
import SegmentsField from './SegmentsField';
import SegmentInput from './SegmentInput';
import CustomerLinkField from './CustomerLinkField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';
import DesktopGrid from './DesktopGrid';
import VisitorListAside from './VisitorListAside';

const VisitorFilter: FC = (props: any) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <DateInput source="last_seen_gte" />
        <NullableBooleanInput source="has_ordered" />
        <NullableBooleanInput source="has_newsletter" defaultValue />
        <SegmentInput />
    </Filter>
);

const visitorListColumn = {
    customer: <CustomerLinkField />,
    last_seen: <DateField source="last_seen" />,
    nb_commands: <NumberField source="nb_commands" label="Commands" />,
    total_spent: (
        <ColoredNumberField
            source="total_spent"
            options={{ style: 'currency', currency: 'USD' }}
        />
    ),
    latest_purchase: <DateField source="latest_purchase" showTime />,
    has_newsletter: <BooleanField source="has_newsletter" label="News." />,
    segments: <SegmentsField />,
};

const VisitorList: FC = (props: any) => {
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('xs')
    );
    useDefineAppLocation('audience.customers');
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

    const classes = useStyles();

    return (
        <EnterpriseList
            {...props}
            classes={classes}
            preferenceKey="visitors.list"
            hasColumnsSelector
            defaultColumns={visitorListColumn}
            defaultOmittedColumns={['last_seen']}
            hasViewSelector
            defaultView
            filters={isSmall ? <VisitorFilter /> : null}
            aside={<VisitorListAside />}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
        >
            {({
                columns,
                view,
                hasShow,
                hasList,
                hasEdit,
                hasCreate,
                ...rest
            }): JSX.Element => {
                if (isXsmall) {
                    return <MobileGrid />;
                }
                if (view === 'grid') {
                    return <DesktopGrid fields={columns} />;
                }
                return (
                    <Datagrid rowClick="edit" {...rest}>
                        {columns}
                    </Datagrid>
                );
            }}
        </EnterpriseList>
    );
};

export default VisitorList;

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: -theme.spacing(7),
    },
}));
