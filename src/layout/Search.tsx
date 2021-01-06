import React, { FC, Fragment } from 'react';
import { useTranslate } from 'react-admin';
import {
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    Search,
    SearchProps,
    SearchPanelProps,
    useSearchResults,
    groupSearchResultsByResource,
} from '@react-admin/ra-search';

import {
    CommandListItem,
    CustomerListItem,
    ProductListItem,
    ReviewListItem,
} from './search';

const CustomSearch: FC<SearchProps> = props => {
    return (
        <div data-testid="search">
            <Search {...props}>
                <CustomSearchPanel></CustomSearchPanel>
            </Search>
        </div>
    );
};

export default CustomSearch;

const CustomSearchPanel: FC<SearchPanelProps> = props => {
    const translate = useTranslate();
    const classes = useCustomSearchPanelStyles(props);

    const { data, onClose } = useSearchResults();

    if (!data || data.length === 0) {
        return (
            <List data-testid="search-panel" dense {...props}>
                <ListItem>
                    <ListItemText
                        primary={translate('ra.navigation.no_results')}
                    />
                </ListItem>
            </List>
        );
    }
    const groupedData = groupSearchResultsByResource(data, translate);

    return (
        <List
            data-testid="search-panel"
            dense
            className={classes.root}
            {...props}
        >
            {groupedData.map(group => (
                <Fragment key={group.label}>
                    <ListSubheader
                        role="presentation"
                        className={classes.header}
                        disableSticky
                    >
                        <>
                            <Typography
                                className={classes.headerGroup}
                                variant="subtitle1"
                            >
                                {translate(group.label.toString(), {
                                    _: group.label,
                                })}
                            </Typography>
                            <Typography
                                className={classes.headerCount}
                                variant="subtitle1"
                            >
                                {translate('ra-search.result', {
                                    smart_count: group.data.length,
                                })}
                            </Typography>
                        </>
                    </ListSubheader>
                    {group.data.map(searchResultItem => (
                        <CustomSearchResultItem
                            key={searchResultItem.id}
                            data={searchResultItem}
                            onClose={onClose}
                        />
                    ))}
                </Fragment>
            ))}
        </List>
    );
};

const useCustomSearchPanelStyles = makeStyles(theme => ({
    root: {
        maxHeight: 'calc(100vh - 100px)',
        maxWidth: 512,
        overflowX: 'hidden',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 2),
    },
    headerGroup: {
        textTransform: 'capitalize',
    },
    headerCount: {
        textTransform: 'lowercase',
    },
}));

const CustomSearchResultItem: FC<any> = props => {
    const { data, onClose, ...rest } = props;

    if (!data) {
        return null;
    }

    switch (data.type) {
        case 'customers':
            return <CustomerListItem {...rest} data={data} onClick={onClose} />;
        case 'products':
            return <ProductListItem {...rest} data={data} onClick={onClose} />;
        case 'commands':
            return <CommandListItem {...rest} data={data} onClick={onClose} />;
        case 'reviews':
            return <ReviewListItem {...rest} data={data} onClick={onClose} />;
        default:
            return null;
    }
};
