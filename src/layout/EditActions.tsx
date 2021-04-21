import * as React from 'react';
import { ReactElement } from 'react';
import {
    EditActions as RaEditActions,
    EditActionsProps,
} from '@react-admin/ra-enterprise';
import CustomBreadcrumb from '../layout/Breadcrumb';

export const EditActions = (props: EditActionsProps): ReactElement => (
    <RaEditActions
        breadcrumb={<CustomBreadcrumb variant="actions" />}
        {...props}
    />
);
