import React from 'react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const VisitList = React.lazy(() =>
    import('./VisitList').then(module => ({
        default: module.VisitList,
    }))
);

export default {
    icon: VerifiedUserIcon,
    list: VisitList,
};
