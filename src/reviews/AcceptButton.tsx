import * as React from 'react';
import Button from '@mui/material/Button';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
    useTranslate,
    useUpdate,
    useNotify,
    useRedirect,
    useRecordContext,
} from 'react-admin';
import { Review } from './../types';

/**
 * This custom button demonstrate using useUpdate to update data
 */
const AcceptButton = () => {
    const translate = useTranslate();
    const notify = useNotify();
    const redirectTo = useRedirect();
    const record = useRecordContext<Review>();

    const [approve, { isPending }] = useUpdate(
        'reviews',
        { id: record?.id, data: { status: 'accepted' }, previousData: record },
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('resources.reviews.notification.approved_success', {
                    type: 'info',
                    undoable: true,
                });
                redirectTo('/reviews');
            },
            onError: () => {
                notify('resources.reviews.notification.approved_error', {
                    type: 'warning',
                });
            },
        }
    );
    return record && record.status === 'pending' ? (
        <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => approve()}
            startIcon={<ThumbUp sx={{ color: 'green' }} />}
            disabled={isPending}
        >
            {translate('resources.reviews.action.accept')}
        </Button>
    ) : (
        <span />
    );
};

export default AcceptButton;
