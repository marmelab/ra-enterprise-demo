import React, { Fragment, useRef } from 'react';
import { useTranslate } from 'react-admin';
import {
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import {
    Search,
    SearchProps,
    SearchPanelProps,
    useSearchResults,
    groupSearchResultsByResource,
    useArrowKeysToNavigate,
} from '@react-admin/ra-search';

import {
    CommandListItem,
    CustomerListItem,
    ProductListItem,
    ReviewListItem,
} from './SearchItems';

const CustomSearch = (props: SearchProps) => (
    <Search {...props}>
        <CustomSearchPanel />
    </Search>
);

export default CustomSearch;

const CustomSearchPanel = (props: SearchPanelProps) => {
    const listRef = useRef<HTMLUListElement>(
        null
    ) as React.MutableRefObject<HTMLUListElement>;
    const translate = useTranslate();
    useArrowKeysToNavigate(listRef);
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
            sx={{
                maxHeight: 'calc(100vh - 100px)',
                maxWidth: 512,
                overflowX: 'hidden',
                p: 1,
            }}
            data-testid="search-panel"
            dense
            ref={listRef}
            {...props}
        >
            {groupedData.map(group => (
                <Fragment key={group.label}>
                    <ListSubheader
                        role="presentation"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 1,
                            px: 2,
                        }}
                        disableSticky
                    >
                        <>
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                }}
                                variant="subtitle1"
                            >
                                {translate(group.label.toString(), {
                                    _: group.label,
                                })}
                            </Typography>
                            <Typography
                                sx={{
                                    textTransform: 'lowercase',
                                }}
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

const CustomSearchResultItem = (props: any) => {
    const { data, onClose, ...rest } = props;

    if (!data) {
        return null;
    }

    switch (data.type) {
        case 'customers':
            return <CustomerListItem {...rest} data={data} onClick={onClose} />;
        case 'products':
            return <ProductListItem {...rest} data={data} onClick={onClose} />;
        case 'orders':
            return <CommandListItem {...rest} data={data} onClick={onClose} />;
        case 'reviews':
            return <ReviewListItem {...rest} data={data} onClick={onClose} />;
        default:
            return null;
    }
};
