import * as React from 'react';
import { ReactElement } from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import {
    linkToRecord,
    NumberField,
    TitleProps,
    useListContext,
} from 'react-admin';
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

const LoadingGridList = ({
    width,
    nbItems = 20,
}: GridProps & { nbItems?: number }): ReactElement => {
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

const ProductTile = ({ record }: TitleProps): ReactElement => {
    const classes = useStyles();

    return (
        <GridListTileBar
            className={classes.tileBar}
            title={record?.reference}
            subtitle={
                <span>
                    {record?.width}x{record?.height},{' '}
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
    );
};

const LoadedGridList = ({ width }: GridProps): ReactElement | null => {
    const { ids, data, resource } = useListContext();
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
                        to={linkToRecord('/products', id)}
                        className={classes.tile}
                        data-productid={id}
                        data-lockidentity={lock ? lock.identity : undefined}
                        data-testid={
                            isFirstLock ? 'productlocktile' : undefined
                        }
                    >
                        <img src={data[id].thumbnail} alt="" />
                        <ProductTile record={data[id]} />
                        {lock && <LockOverlay lock={lock} />}
                    </GridListTile>
                );
            })}
        </MuiGridList>
    );
};

interface GridProps extends DatagridProps<Product>, WithWidth {}

const GridList = ({ width }: WithWidth): ReactElement => {
    const { loaded } = useListContext();

    return loaded ? (
        <LoadedGridList width={width} />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
