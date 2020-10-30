import React, { cloneElement, FC } from 'react';
import * as inflection from 'inflection';
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
    SearchResultDataItem,
    useSearchResults,
} from '@react-admin/ra-search';

import {
    CommandListItem,
    CustomerListItem,
    ProductListItem,
    ReviewListItem,
} from './search';

const CustomSearch: FC<SearchProps> = props => {
    return (
        <Search {...props}>
            <CustomSearchPanel>
                <CustomSearchResultItem />
            </CustomSearchPanel>
        </Search>
    );
};

export default CustomSearch;

const CustomSearchPanel: FC<SearchPanelProps> = props => {
    const { children = <CustomSearchResultItem />, ...rest } = props;
    const translate = useTranslate();
    const classes = useCustomSearchPanelStyles(rest);

    const { data, onClose } = useSearchResults();

    if (!data || data.length === 0) {
        return (
            <List dense {...rest}>
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
        <List dense className={classes.root} {...rest}>
            {groupedData.map(group => (
                <>
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
                    {group.data.map(searchResultItem =>
                        cloneElement(children, {
                            key: searchResultItem.id,
                            data: searchResultItem,
                            onClose,
                        })
                    )}
                </>
            ))}
        </List>
    );
};

const useCustomSearchPanelStyles = makeStyles(theme => ({
    root: {
        maxHeight: 'calc(100vh - 100px)',
        maxWidth: 512,
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

type GroupedSearchResultItem = {
    label: string;
    data: SearchResultDataItem[];
};

type Translate = (key: string, options?: any) => string;

function groupSearchResultsByResource(
    data: SearchResultDataItem[],
    translate: Translate
): GroupedSearchResultItem[] {
    const groupedSearchResultItems = data.reduce((acc, item) => {
        if (!acc[item.type]) {
            const resourceName = translate(`resources.${item.type}.name`, {
                smart_count: 2,
                _: inflection.capitalize(
                    inflection.humanize(inflection.pluralize(item.type))
                ),
            });

            acc[item.type] = {
                label: resourceName,
                data: [],
            };
        }

        acc[item.type].data.push(item);
        return acc;
    }, {});

    return Object.keys(groupedSearchResultItems).map(key => ({
        label: groupedSearchResultItems[key].label,
        data: groupedSearchResultItems[key].data,
    }));
}
