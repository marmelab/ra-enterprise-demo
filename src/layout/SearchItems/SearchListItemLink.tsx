import * as React from 'react';
import { forwardRef } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// This component could be added to ra-search
export const SearchListItemLink = forwardRef<any, any>((props, ref) => {
    const { data, onClick, ...rest } = props;

    return (
        <Link
            component={RouterLink}
            to={data.url}
            onClick={onClick}
            ref={ref}
            {...rest}
        />
    );
});

SearchListItemLink.displayName = 'SearchListItemLink';
