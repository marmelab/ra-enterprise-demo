import * as React from 'react';
import {
    useTheme,
    useMediaQuery,
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from '@mui/material';
import {
    Identifier,
    useCreatePath,
    NumberField,
    useListContext,
    useResourceContext,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { Lock, useGetLocks } from '@react-admin/ra-realtime';
import { LockOverlay } from './LockOverlay';
import { USDFormat } from '../formatUtils';

const GridList = () => {
    const { isPending } = useListContext();
    return isPending ? <LoadingGridList /> : <LoadedGridList />;
};

const useColsForWidth = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    // there are all dividers of 24, to have full rows on each page
    if (xl) return 8;
    if (lg) return 6;
    if (md) return 4;
    if (sm) return 3;
    return 2;
};

const times = (nbChildren: number, fn: (key: number) => any) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
    const theme = useTheme();
    const { perPage } = useListContext();
    const cols = useColsForWidth();
    return (
        <ImageList
            rowHeight={180}
            cols={cols}
            sx={{ m: 0 }}
            gap={parseInt(theme.spacing(1))}
        >
            {times(perPage, key => (
                <ImageListItem key={key}>
                    <Box
                        bgcolor="grey.500"
                        height="100%"
                        sx={{ opacity: 0.5 }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

const LoadedGridList = () => {
    const theme = useTheme();
    const { data } = useListContext();
    const resource = useResourceContext();
    const { data: locks } = useGetLocks(resource!, {}, { enabled: !!resource });
    const cols = useColsForWidth();
    const createPath = useCreatePath();
    const firstLockRecordId = React.useRef<Identifier | undefined>(undefined);

    if (!data) return null;

    return (
        <ImageList
            data-tour-id="grid-line"
            rowHeight={180}
            cols={cols}
            gap={parseInt(theme.spacing(1))}
            sx={{ m: 0 }}
        >
            {data.map(record => {
                const lock = locks
                    ? locks.find((l: Lock) => l.recordId === record.id)
                    : undefined;
                if (lock && !firstLockRecordId.current) {
                    firstLockRecordId.current = lock.recordId;
                }

                const isFirstLock = firstLockRecordId.current === record.id;

                return (
                    <ImageListItem
                        component={Link}
                        key={record.id}
                        to={createPath({
                            resource: 'products',
                            id: record.id,
                            type: 'edit',
                        })}
                        data-productid={record.id}
                        data-lockidentity={lock ? lock.identity : undefined}
                        data-testid={
                            isFirstLock ? 'productlocktile' : undefined
                        }
                    >
                        <img src={record.thumbnail} alt="" />
                        {lock && <LockOverlay lock={lock} />}
                        <ImageListItemBar
                            title={record.reference}
                            subtitle={
                                <span>
                                    {record.width}x{record.height},{' '}
                                    <NumberField
                                        source="price"
                                        record={record}
                                        color="inherit"
                                        options={USDFormat(2)}
                                        sx={{
                                            display: 'inline',
                                            fontSize: '1em',
                                        }}
                                    />
                                </span>
                            }
                            sx={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
                            }}
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
};

export default GridList;
