import * as React from 'react';
import { ReactElement } from 'react';
import {
    CreateActions as RaCreateActions,
    CreateActionsProps,
} from '@react-admin/ra-enterprise';
import CustomBreadcrumbForActions from '../layout/BreadcrumbForActions';

export const CreateActions = (props: CreateActionsProps): ReactElement => (
    <RaCreateActions breadcrumb={<CustomBreadcrumbForActions />} {...props} />
);
