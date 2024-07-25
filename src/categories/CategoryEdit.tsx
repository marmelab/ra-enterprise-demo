import * as React from 'react';
import {
    ListContextProvider,
    Pagination,
    SimpleForm,
    TextInput,
    useRecordContext,
    useGetList,
    usePaginationState,
    useTranslate,
} from 'react-admin';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { EditNode } from '@react-admin/ra-tree';

import ImageList from '../products/GridList';

const CategoryEdit = () => {
    const translate = useTranslate();

    return (
        <EditNode
            title={<CategoryTitle />}
            sx={{
                '& .RaEdit-main': {
                    display: 'flex',
                    flexDirection: 'column',
                    '& > *': { width: '100%' },
                },
            }}
            aside={
                <>
                    <Typography marginTop={6} variant="h5">
                        {translate('resources.products.name', {
                            smart_count: 2,
                        })}
                    </Typography>
                    <CategoryEditAside />
                </>
            }
        >
            <SimpleForm>
                <TextInput source="name" />
            </SimpleForm>
        </EditNode>
    );
};

const CategoryTitle = () => {
    const record = useRecordContext();
    useDefineAppLocation('catalog.categories.edit', { record });
    return <span>{record?.name}</span>;
};

const CategoryEditAside = () => {
    const record = useRecordContext();

    const { setPerPage, setPage, page, perPage } = usePaginationState({
        page: 1,
        perPage: 20,
    });
    const { data, total, isPending } = useGetList(
        'products',
        {
            pagination: { page, perPage },
            sort: { field: 'reference', order: 'ASC' },
            filter: { category_id: record?.id },
        },
        {
            enabled: record?.id != null,
        }
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <ListContextProvider
            value={
                {
                    data,
                    total,
                    isPending,
                    resource: 'products',
                    filterValues: {},
                    showFilter: (): void => undefined,
                    hideFilter: (): void => undefined,
                    setSort: (): void => undefined,
                    setPage,
                    setPerPage,
                    sort: { field: 'reference', order: 'ASC' },
                    page,
                    perPage,
                } as any
            }
        >
            <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
                <ImageList />
                <Pagination rowsPerPageOptions={[12, 24, 48, 72]} />
            </Box>
        </ListContextProvider>
    );
};

export default CategoryEdit;
