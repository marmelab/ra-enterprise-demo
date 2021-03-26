import * as React from 'react';
import { ReactElement } from 'react';
import {
    ShowActions as RaShowActions,
    ShowActionsProps,
} from '@react-admin/ra-enterprise';
import CustomBreadcrumbForActions from '../layout/BreadcrumbForActions';

export const ShowActions = (props: ShowActionsProps): ReactElement => (
    <RaShowActions breadcrumb={<CustomBreadcrumbForActions />} {...props} />
);
