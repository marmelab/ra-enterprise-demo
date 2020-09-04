import React, { useEffect } from 'react';
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

const ReviewMobileList = ({
    basePath,
    data,
    ids,
    loading,
    total,
    ...props
}) => {
    const classes = useStyles();
    const [, setLocation] = useAppLocationState();
    const resourceLocation = useResourceAppLocation();
    useEffect(() => {
        const { status } = props.filterValues;
        if (typeof status !== 'undefined') {
            setLocation('reviews.status_filter', { status });
        } else {
            setLocation('reviews');
        }
    }, [
        setLocation,
        props.filterValues,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify({
            resourceLocation,
            filter: props.filterValues,
        }),
    ]);
    return (
        (loading || total > 0) && (
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
                                    <AvatarField size={40} />
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
                                                render={record =>
                                                    `${record.first_name} ${record.last_name}`
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
        )
    );
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
