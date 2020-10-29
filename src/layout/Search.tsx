import React, { FC } from 'react';
import { Search, SearchProps } from '@react-admin/ra-search';

const CustomSearch: FC<SearchProps> = props => {
    return <Search {...props} />;
};

export default CustomSearch;
