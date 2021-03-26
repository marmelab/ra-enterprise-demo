import * as React from 'react';
import { ReactElement } from 'react';
import {
    EditActions as RaEditActions,
    EditActionsProps,
} from '@react-admin/ra-enterprise';
import CustomBreadcrumbForActions from '../layout/BreadcrumbForActions';

export const EditActions = (props: EditActionsProps): ReactElement => (
    <RaEditActions breadcrumb={<CustomBreadcrumbForActions />} {...props} />
);
