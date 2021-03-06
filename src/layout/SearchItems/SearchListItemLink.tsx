import React, { FC, forwardRef } from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

// This component could be added to ra-search
export const SearchListItemLink: FC<any> = forwardRef((props, ref) => {
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
