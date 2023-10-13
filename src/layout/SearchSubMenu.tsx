import React, {
    Fragment,
    useRef,
    useState,
    useMemo,
    useCallback,
    ChangeEvent,
} from 'react';
import { useTranslate } from 'react-admin';
import {
    Box,
    List,
    ListSubheader,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import {
    SearchInput,
    SearchPanelProps,
    useSearch,
    useSearchResults,
    groupSearchResultsByResource,
    useArrowKeysToNavigate,
    SearchResultContextProvider,
} from '@react-admin/ra-search';
import { useSolarSidebarActiveMenu } from '@react-admin/ra-navigation';
import debounce from 'lodash/debounce';

import {
    CommandListItem,
    CustomerListItem,
    ProductListItem,
    ReviewListItem,
} from './SearchItems';

export const SearchSubMenu = () => {
    const [query, setQuery] = useState('');
    const [search, state] = useSearch();
    const debouncedSearch = useMemo(() => debounce(search, 500), [search]);
    const [, setActiveMenu] = useSolarSidebarActiveMenu();

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const query = event.target
                ? event.target.value
                : (event as unknown as string);
            setQuery(query);
            debouncedSearch(query);
        },
        [setQuery, debouncedSearch]
    );

    return (
        <Box data-testid="search" m={-1}>
            <SearchInput
                onChange={handleChange}
                value={query}
                sx={{ m: 1, '& .RaSearchInput-input': { width: 170 } }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
            />
            <SearchResultContextProvider
                value={{
                    ...state,
                    onClose: () => setActiveMenu(''),
                }}
            >
                <CustomSearchPanel />
            </SearchResultContextProvider>
        </Box>
    );
};

const CustomSearchPanel = (props: SearchPanelProps) => {
    const listRef = useRef<HTMLUListElement>(
        null
    ) as React.MutableRefObject<HTMLUListElement>;
    const translate = useTranslate();
    useArrowKeysToNavigate(listRef);
    const { query, isLoading, data, onClose } = useSearchResults();

    if (!query || isLoading) {
        return null;
    }
    if (!data || data.length === 0) {
        return (
            <List data-testid="search-panel" dense sx={{ px: 1 }} {...props}>
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
                maxHeight: 'calc(100vh - 65px)',
                maxWidth: '18em',
                overflowX: 'hidden',
                marginBlockEnd: 0,
                px: 1,
            }}
            data-testid="search-panel"
            dense
            ref={listRef}
            {...props}
        >
            {groupedData.map(group => (
                <Box key={group.label} mb={1}>
                    <ListSubheader
                        role="presentation"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 0,
                        }}
                        disableSticky
                    >
                        <>
                            <Typography
                                sx={{ textTransform: 'capitalize' }}
                                variant="subtitle1"
                            >
                                {translate(group.label.toString(), {
                                    _: group.label,
                                })}
                            </Typography>
                            <Typography variant="subtitle1">
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
                </Box>
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
        case 'commands':
            return <CommandListItem {...rest} data={data} onClick={onClose} />;
        case 'reviews':
            return <ReviewListItem {...rest} data={data} onClick={onClose} />;
        default:
            return null;
    }
};
