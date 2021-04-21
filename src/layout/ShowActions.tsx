import * as React from 'react';
import { ReactElement } from 'react';
import {
    ShowActions as RaShowActions,
    ShowActionsProps,
} from '@react-admin/ra-enterprise';
import CustomBreadcrumb from '../layout/Breadcrumb';

export const ShowActions = (props: ShowActionsProps): ReactElement => (
    <RaShowActions
        breadcrumb={<CustomBreadcrumb variant="actions" />}
        {...props}
    />
);
