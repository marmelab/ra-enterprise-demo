import * as React from 'react';
import { Button } from 'react-admin';
import { ButtonGroup } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AppsIcon from '@mui/icons-material/Apps';
import { useListView } from './useListView';

export const ListViewButton = () => {
    const [view, setView] = useListView();

    return (
        <ButtonGroup key="view-selector-tool-menu">
            <Button
                color={view === 'table' ? 'primary' : 'inherit'}
                onClick={(): void => setView('table')}
                label="table"
            >
                <TableChartIcon />
            </Button>
            <Button
                color={view === 'grid' ? 'primary' : 'inherit'}
                onClick={(): void => setView('grid')}
                label="grid"
            >
                <AppsIcon />
            </Button>
        </ButtonGroup>
    );
};
