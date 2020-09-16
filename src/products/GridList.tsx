import * as React from 'react';
import { FC } from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { linkToRecord, NumberField, useListContext } from 'react-admin';
import { Link } from 'react-router-dom';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Lock, useHasLocks } from '@react-admin/ra-realtime';
import LockIcon from '@material-ui/icons/Lock';

import { DatagridProps, Product } from '../types';

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    tile: {
        position: 'relative',
    },
    lockOverlay: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.9)',
        position: 'absolute',
        textAlign: 'center',
        color: 'white',
        padding: '25% 0',
    },
    lockIdentity: {
        paddingTop: '1em',
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

const getColsForWidth = (width: Breakpoint) => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 4;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren: number, fn: (key: number) => any) =>
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

const ProductTile = ({ record }) => {
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

const LockOverlay: FC<any> = ({ lock, ...rest }) => {
    const classes = useStyles();

    return (
        <div className={classes.lockOverlay} {...rest}>
            <LockIcon />
            <div className={classes.lockIdentity}>
                Locked by
                <br />
                {lock.identity}
            </div>
        </div>
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
            {ids.map((id: string) => {
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
