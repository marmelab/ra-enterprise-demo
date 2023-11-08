import * as React from 'react';
import { Box } from '@mui/material';
import { SearchWithResult, SearchResultsPanel } from '@react-admin/ra-search';

import {
    CommandListItem,
    CustomerListItem,
    ProductListItem,
    ReviewListItem,
} from './SearchItems';
import { useSolarSidebarActiveMenu } from '@react-admin/ra-navigation';

export const SearchSubMenu = () => {
    const [, setActiveMenu] = useSolarSidebarActiveMenu();
    const handleClose = () => {
        setActiveMenu('');
    };
    return (
        <Box data-testid="search" m={-1}>
            <SearchWithResult
                onNavigate={handleClose}
                sx={{ m: 1, width: 270 }}
            >
                <SearchResultsPanel
                    sx={{
                        maxHeight: 'calc(100vh - 65px)',
                        maxWidth: '18em',
                        overflowX: 'hidden',
                        marginBlockEnd: 0,
                        px: 1,
                    }}
                    disablePadding
                    data-testid="search-panel"
                >
                    <CustomSearchResultItem />
                </SearchResultsPanel>
            </SearchWithResult>
        </Box>
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
