import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    Datagrid,
    DateField,
    DateInput,
    ExportButton,
    FilterButton,
    List,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    TopToolbar,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';

import SegmentsField from './SegmentsField';
import SegmentInput from './SegmentInput';
import CustomerLinkField from './CustomerLinkField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';
import VisitorListAside from './VisitorListAside';
import { ListViewButton } from './ListViewButton';
import { useListView } from './useListView';
import DesktopGrid from './DesktopGrid';

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
    <DateInput source="last_seen_gte" />,
    <NullableBooleanInput source="has_ordered" />,
    <NullableBooleanInput source="has_newsletter" defaultValue />,
    <SegmentInput source="groups" />,
];

const ListActions = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <TopToolbar>
            {isSmall ? <FilterButton /> : null}
            <CreateButton />
            <ExportButton />
            <ListViewButton />
        </TopToolbar>
    );
};

const VisitorList = () => {
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const [view] = useListView();
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
            aside={<VisitorListAside />}
            actions={<ListActions />}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : view === 'grid' ? (
                <DesktopGrid>{columns}</DesktopGrid>
            ) : (
                <Datagrid
                    optimized
                    rowClick="edit"
                    sx={{
                        '& .column-groups': {
                            md: { display: 'none' },
                            lg: { display: 'table-cell' },
                        },
                    }}
                >
                    {columns}
                </Datagrid>
            )}
        </List>
    );
};

const columns = [
    <CustomerLinkField key="customer" />,
    <DateField source="last_seen" key="last_seen" />,
    <NumberField
        source="nb_commands"
        key="nb_commands"
        label="resources.customers.fields.commands"
        sx={{ color: 'purple' }}
    />,
    <ColoredNumberField
        source="total_spent"
        key="total_spent"
        options={{ style: 'currency', currency: 'USD' }}
    />,
    <DateField source="latest_purchase" key="latest_purchase" showTime />,
    <BooleanField source="has_newsletter" key="has_newsletter" label="News." />,
    <SegmentsField source="groups" key="groups" />,
];

export default VisitorList;
