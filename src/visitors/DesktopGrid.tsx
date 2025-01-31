import React, { Children, ReactElement } from 'react';
import { Box, Card, CardContent, IconButton, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import {
    FieldProps,
    RecordContextProvider,
    useCreatePath,
    useListContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';

import EditIcon from '@mui/icons-material/Edit';

import AvatarField from './AvatarField';

const DesktopGrid = ({ children }: { children: ReactElement[] }) => {
    const translate = useTranslate();
    const { data } = useListContext();
    const createPath = useCreatePath();
    const resource = useResourceContext();
    const theme = useTheme();

    if (!data) {
        return null;
    }

    return (
        <Box
            sx={{
                margin: '1em',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                justifyContent: 'space-between',
            }}
        >
            {data.map(record => (
                <RecordContextProvider value={record} key={record.id}>
                    <Card
                        sx={{
                            width: 265,
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '0.5rem 0',
                        }}
                    >
                        <CardContent
                            sx={{
                                ...theme.typography.body1,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <AvatarField record={record} size="120" />
                                <h2>{`${record.first_name} ${record.last_name}`}</h2>

                                <IconButton
                                    color="secondary"
                                    aria-label="Edit"
                                    component={RouterLink}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                    }}
                                    to={createPath({
                                        resource,
                                        id: record.id,
                                        type: 'edit',
                                    })}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            {Children.map(children, field => {
                                const fieldName = (
                                    field as ReactElement<FieldProps>
                                ).props.source;

                                // We already display the customer above
                                if (fieldName === 'customer_id') {
                                    return null;
                                }

                                return (
                                    <div
                                        key={fieldName}
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginRight: '1em',
                                                marginBottom: '0.5em',
                                                marginTop: '1em',
                                            }}
                                        >
                                            {translate(
                                                `resources.customers.fields.${fieldName}`
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                whiteSpace: 'nowrap',
                                                marginBottom: '0.5em',
                                                marginTop: '1em',
                                            }}
                                        >
                                            {field}
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default DesktopGrid;
