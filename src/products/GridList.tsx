import * as React from 'react';
import { FC } from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { linkToRecord, NumberField, useListContext } from 'react-admin';
import { Record } from 'ra-core';
import { Link } from 'react-router-dom';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Lock, useHasLocks } from '@react-admin/ra-realtime';

import { LockOverlay } from './LockOverlay';
import { DatagridProps, Product } from '../types';

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    tile: {
        position: 'relative',
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
}));

const getColsForWidth = (width: Breakpoint): number => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 4;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren: number, fn: (key: number) => any): Array<any> =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList: FC<GridProps & { nbItems?: number }> = ({
    width,
    nbItems = 20,
}) => {
    const classes = useStyles();

    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

type ProductTitleProps = {
    record: Record;
};

const ProductTile: FC<ProductTitleProps> = ({ record }) => {
    const classes = useStyles();

    return (
        <>
            <img src={record.thumbnail} alt="" />
            <GridListTileBar
                className={classes.tileBar}
                title={record.reference}
                subtitle={
                    <span>
                        {record.width}x{record.height},{' '}
                        <NumberField
                            className={classes.price}
                            source="price"
                            record={record}
                            color="inherit"
                            options={{
                                style: 'currency',
                                currency: 'USD',
                            }}
                        />
                    </span>
                }
            />
        </>
    );
};

const LoadedGridList: FC<GridProps> = ({ width }) => {
    const { ids, data, basePath, resource } = useListContext();
    const { data: locks } = useHasLocks(resource);
    const classes = useStyles();

    const firstLockRecordId = React.useRef();

    if (!ids || !data) return null;

    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
            data-tour-id="grid-line"
        >
            {ids.map(id => {
                const lock = locks.find((l: Lock) => l.recordId === id);
                if (lock && !firstLockRecordId.current) {
                    firstLockRecordId.current = lock.recordId;
                }

                const isFirstLock = firstLockRecordId.current === id;

                return (
                    <GridListTile
                        key={id}
                        component={lock ? 'span' : Link}
                        to={linkToRecord(basePath, id)}
                        className={classes.tile}
                        data-productid={id}
                        data-lockidentity={lock ? lock.identity : undefined}
                        data-testid={
                            isFirstLock ? 'productlocktile' : undefined
                        }
                    >
                        <ProductTile record={data[id]} />
                        {lock && <LockOverlay lock={lock} />}
                    </GridListTile>
                );
            })}
        </MuiGridList>
    );
};

interface GridProps extends DatagridProps<Product>, WithWidth {}

const GridList: FC<WithWidth> = ({ width }) => {
    const { loaded } = useListContext();

    return loaded ? (
        <LoadedGridList width={width} />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
