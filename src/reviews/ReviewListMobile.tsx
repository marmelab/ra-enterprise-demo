import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    linkToRecord,
    ReferenceField,
    FunctionField,
    TextField,
    useListContext,
    Record,
} from 'react-admin';
import {
    useAppLocationState,
    useResourceAppLocation,
} from '@react-admin/ra-navigation';

import AvatarField from '../visitors/AvatarField';

const useStyles = makeStyles({
    root: {
        width: '100vw',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    inline: {
        display: 'inline',
    },
});

const ReviewMobileList: FC = () => {
    const classes = useStyles();
    const [, setLocation] = useAppLocationState();
    const resourceLocation = useResourceAppLocation();
    const { basePath, data, ids, loading, total, filterValues } =
        useListContext();

    const effectDependency = JSON.stringify({
        resourceLocation,
        filter: filterValues,
    });
    useEffect(() => {
        const { status } = filterValues;
        if (typeof status !== 'undefined') {
            setLocation('reviews.status_filter', { status });
        } else {
            setLocation('reviews');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setLocation, effectDependency]);
    return loading || total > 0 ? (
        <List className={classes.root}>
            {ids.map(id => (
                <Link
                    to={linkToRecord(basePath, id)}
                    className={classes.link}
                    key={id}
                >
                    <ListItem button>
                        <ListItemAvatar>
                            <ReferenceField
                                record={data[id]}
                                source="customer_id"
                                reference="customers"
                                basePath={basePath}
                                linkType={false}
                            >
                                <AvatarField size="40" />
                            </ReferenceField>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <>
                                    <ReferenceField
                                        record={data[id]}
                                        source="customer_id"
                                        reference="customers"
                                        basePath={basePath}
                                        linkType={false}
                                    >
                                        <FunctionField
                                            render={(record?: Record): string =>
                                                record
                                                    ? `${record.first_name} ${record.last_name}`
                                                    : ''
                                            }
                                            variant="subtitle1"
                                            className={classes.inline}
                                        />
                                    </ReferenceField>{' '}
                                    on{' '}
                                    <ReferenceField
                                        record={data[id]}
                                        source="product_id"
                                        reference="products"
                                        basePath={basePath}
                                        linkType={false}
                                    >
                                        <TextField
                                            source="reference"
                                            variant="subtitle1"
                                            className={classes.inline}
                                        />
                                    </ReferenceField>
                                </>
                            }
                            secondary={data[id].comment}
                            secondaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItem>
                </Link>
            ))}
        </List>
    ) : null;
};

ReviewMobileList.propTypes = {
    basePath: PropTypes.string,
    data: PropTypes.object,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    onToggleItem: PropTypes.func,
    primaryText: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    secondaryText: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    tertiaryText: PropTypes.func,
};

ReviewMobileList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: [],
};

export default ReviewMobileList;
