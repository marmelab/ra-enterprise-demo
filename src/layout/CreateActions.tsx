import * as React from 'react';
import { ReactElement } from 'react';
import {
    CreateActions as RaCreateActions,
    CreateActionsProps,
} from '@react-admin/ra-enterprise';
import CustomBreadcrumb from '../layout/Breadcrumb';

export const CreateActions = (props: CreateActionsProps): ReactElement => (
    <RaCreateActions
        breadcrumb={<CustomBreadcrumb variant="actions" />}
        {...props}
    />
);
