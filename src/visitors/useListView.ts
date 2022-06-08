import { useStore } from 'react-admin';

export const useListView = () =>
    useStore<'table' | 'grid'>('visitors.list.view', 'table');
