import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    DateInput,
    ExportButton,
    FilterButton,
    List,
    NullableBooleanInput,
    NumberField,
    SearchInput,
    SelectColumnsButton,
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
import { USDFormat } from '../formatUtils';

const visitorFilters = [
    <SearchInput key="q" source="q" alwaysOn />,
    <DateInput key="last_seen_gte" source="last_seen_gte" />,
    <NullableBooleanInput key="has_ordered" source="has_ordered" />,
    <NullableBooleanInput
        key="has_newsletter"
        source="has_newsletter"
        defaultValue
    />,
    <SegmentInput key="groups" source="groups" />,
];

const VisitorListActions = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    const [view] = useListView();
    const [showFilter, setShowFilter] = React.useState(false);

    // When resizing manually the window to go from large to small, the useMediaQuery used here
    // triggers its change before the one in the VisitorList. This leads to an error because the
    // FilterButton requires the filters prop to be set.
    React.useEffect(() => {
        // Needed to avoid react warnings
        let isMounted = true;
        setTimeout(() => {
            if (isMounted) setShowFilter(isSmall);
        }, 0);
        return () => {
            isMounted = false;
        };
    }, [isSmall]);

    return (
        <TopToolbar>
            {showFilter ? <FilterButton /> : null}
            <CreateButton />
            {view === 'table' ? <SelectColumnsButton /> : null}
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
            actions={<VisitorListActions />}
            sx={{ marginTop: isSmall ? undefined : -4 }}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : view === 'grid' ? (
                <DesktopGrid>{columns}</DesktopGrid>
            ) : (
                <DatagridConfigurable
                    rowClick="edit"
                    sx={{
                        '& .column-groups': {
                            md: { display: 'none' },
                            lg: { display: 'table-cell' },
                        },
                    }}
                    omit={['birthday']}
                >
                    {columns}
                </DatagridConfigurable>
            )}
        </List>
    );
};

const columns = [
    <CustomerLinkField key="customer" source="customer_id" />,
    <DateField source="last_seen" key="last_seen" />,
    <NumberField
        source="nb_orders"
        key="nb_orders"
        label="resources.customers.fields.orders"
        sx={{ color: 'info.main', fontWeight: 'fontWeightBold' }}
    />,
    <ColoredNumberField
        source="total_spent"
        key="total_spent"
        options={USDFormat(2)}
    />,
    <DateField source="latest_purchase" key="latest_purchase" showTime />,
    <BooleanField source="has_newsletter" key="has_newsletter" label="News." />,
    <SegmentsField source="groups" key="groups" />,
];

export default VisitorList;
