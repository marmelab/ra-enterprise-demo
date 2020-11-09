import React, { cloneElement, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {
    TopToolbar,
    Button,
    sanitizeListRestProps,
    List,
    Pagination,
    useMutation,
    useRefresh,
    ListActionsProps,
    useListContext,
    ListProps,
} from 'react-admin';

import Tour from './Tour';

const useStyles = makeStyles({
    content: {
        border: 'none',
        background: 'none',
        boxShadow: 'none',
    },
});

const useListStyles = makeStyles({
    gridContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

const ListActions: FC<ListActionsProps> = ({ className, filters, ...rest }) => {
    const refresh = useRefresh();
    const {
        ids,
        filterValues,
        resource,
        displayedFilters,
        showFilter,
    } = useListContext(rest);

    const [reset, { loading: resetLoading }] = useMutation(
        {
            type: 'updateMany',
            resource: 'tours',
            payload: { ids: ids, data: { playedOn: null } },
        },
        {
            onSuccess: () => {
                refresh();
            },
        }
    );

    const [markAsPlayed, { loading: markAsPlayedLoading }] = useMutation(
        {
            type: 'updateMany',
            resource: 'tours',
            payload: { ids: ids, data: { playedOn: new Date() } },
        },
        {
            onSuccess: () => {
                refresh();
            },
        }
    );

    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters &&
                cloneElement(filters, {
                    resource,
                    showFilter,
                    displayedFilters,
                    filterValues,
                    context: 'button',
                })}
            {/* Add your custom actions */}
            <Button
                onClick={markAsPlayed}
                label="Mark all as played"
                disabled={markAsPlayedLoading}
            >
                <PlaylistAddCheckIcon />
            </Button>
            <Button onClick={reset} label="Reset" disabled={resetLoading}>
                <RotateLeftIcon />
            </Button>
        </TopToolbar>
    );
};

const GridList: FC = () => {
    const classes = useListStyles();
    const { ids, data } = useListContext();
    return (
        <div className={classes.gridContainer}>
            {ids.map(id => (
                <Tour key={id} record={data[id]} />
            ))}
        </div>
    );
};

const TourList: FC<ListProps> = props => {
    const classes = useStyles();

    return (
        <List
            {...props}
            perPage={20}
            pagination={<Pagination rowsPerPageOptions={[10, 20, 40]} />}
            sort={{ field: 'id', order: 'ASC' }}
            classes={classes}
            actions={<ListActions />}
        >
            <GridList />
        </List>
    );
};

export default TourList;
