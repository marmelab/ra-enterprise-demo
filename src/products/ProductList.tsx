import * as React from 'react';
import {
    Box,
    Chip,
    useMediaQuery,
    Theme,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    CreateButton,
    ExportButton,
    FilterButton,
    FilterForm,
    FilterContext,
    InputProps,
    ListBase,
    NumberInput,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    SortButton,
    Title,
    TopToolbar,
    useTranslate,
    useGetResourceLabel,
    useResourceContext,
    useListContext,
} from 'react-admin';
import ImageList from './GridList';
import Aside from './Aside';
import { useDefineAppLocation } from '@react-admin/ra-navigation';
import { useLockCallbacks } from '@react-admin/ra-realtime';

const ProductList = () => {
    const getResourceLabel = useGetResourceLabel();
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    useDefineAppLocation('catalog.products');
    return (
        <ListBase perPage={24} sort={{ field: 'reference', order: 'ASC' }}>
            <Title defaultTitle={getResourceLabel('products', 2)} />
            <FilterContext.Provider value={productFilters}>
                <ListActions isSmall={isSmall} />
                {isSmall && (
                    <Box
                        sx={{
                            m: 1,
                        }}
                    >
                        <FilterForm />
                    </Box>
                )}
            </FilterContext.Provider>
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <Aside />
                <Box
                    sx={{
                        width: isSmall ? 'auto' : 'calc(100% - 16em)',
                    }}
                >
                    <ImageList />
                    <Pagination rowsPerPageOptions={[12, 24, 48, 72]} />
                </Box>
            </Box>
        </ListBase>
    );
};

const QuickFilter = ({ label }: InputProps) => {
    const translate = useTranslate();
    return <Chip sx={{ mb: 1 }} label={translate(label as string)} />;
};

export const productFilters = [
    <SearchInput key="q" source="q" alwaysOn />,
    <ReferenceInput
        key="category_id"
        source="category_id"
        reference="categories"
        sort={{ field: 'id', order: 'ASC' }}
    >
        <SelectInput source="name" />
    </ReferenceInput>,
    <NumberInput key="width_gte" source="width_gte" />,
    <NumberInput key="width_lte" source="width_lte" />,
    <NumberInput key="height_gte" source="height_gte" />,
    <NumberInput key="height_lte" source="height_lte" />,
    <QuickFilter
        label="resources.products.fields.stock_lte"
        key="stock_lte"
        source="stock_lte"
        defaultValue={10}
    />,
];

const ListActions = ({ isSmall }: any) => (
    <TopToolbar
        sx={{ minHeight: { sm: 56 }, marginTop: isSmall ? undefined : -5 }}
    >
        {isSmall && <FilterButton />}
        {!isSmall && <LocksButton />}
        <SortButton fields={['reference', 'sales', 'stock']} />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const LocksButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const resource = useResourceContext();
    const { data } = useListContext();
    const firstProduct = data?.at(0);
    const { isLocked, isPending, doLock, doUnlock } = useLockCallbacks({
        resource,
        id: firstProduct?.id,
        identity: 'john',
    });

    if (isPending) {
        return null;
    }

    return (
        <>
            <Button
                id="locks-button"
                aria-controls={open ? 'locks-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="small"
                sx={{ lineHeight: 1.5 }}
            >
                Locks
            </Button>
            <Menu
                id="locks-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'locks-button',
                    },
                }}
            >
                {isLocked ? (
                    <MenuItem
                        onClick={() => {
                            doUnlock();
                            handleClose();
                        }}
                    >
                        Unlock first poster
                    </MenuItem>
                ) : (
                    <MenuItem
                        onClick={() => {
                            doLock();
                            handleClose();
                        }}
                    >
                        Simulate lock on first poster
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default ProductList;
