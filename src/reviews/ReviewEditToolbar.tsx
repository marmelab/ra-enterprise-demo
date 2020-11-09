import React, { FC, Fragment } from 'react';
import MuiToolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import { SaveButton, DeleteButton, ToolbarProps } from 'react-admin';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const ReviewEditToolbar: FC<ToolbarProps> = ({
    basePath,
    handleSubmitWithRedirect,
    invalid,
    record,
    resource,
    saving,
}) => {
    const classes = useStyles();
    if (!record) {
        return null;
    }

    return (
        <MuiToolbar className={classes.root}>
            {record.status === 'pending' ? (
                <Fragment>
                    <AcceptButton record={record} />
                    <RejectButton record={record} />
                </Fragment>
            ) : (
                <Fragment>
                    <SaveButton
                        handleSubmitWithRedirect={handleSubmitWithRedirect}
                        invalid={invalid}
                        saving={saving}
                        redirect="list"
                        submitOnEnter={true}
                    />
                    <DeleteButton
                        basePath={basePath}
                        record={record}
                        resource={resource}
                    />
                </Fragment>
            )}
        </MuiToolbar>
    );
};

export default ReviewEditToolbar;
