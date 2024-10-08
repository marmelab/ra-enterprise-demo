import { useEffect, useRef } from 'react';
import {
    useRefresh,
    useRedirect,
    useResourceContext,
    Identifier,
} from 'react-admin';
import { useAddChildNode, useGetRootNodes } from '@react-admin/ra-tree';
import { useLocation } from 'react-router';

type CategoryCreateLocationState = {
    parentId?: Identifier;
};

const Prompt = () => {
    const resource = useResourceContext();
    const location = useLocation();
    const state = location.state as CategoryCreateLocationState;
    const { data } = useGetRootNodes(resource as string);
    const [addChildNode] = useAddChildNode(resource as string);
    const refresh = useRefresh();
    const redirect = useRedirect();
    const prompted = useRef(false);

    useEffect(() => {
        if (prompted.current) {
            return;
        }
        if (!data || data.length === 0) {
            return;
        }
        const rootNodes = data.filter(node => node.isRoot);
        if (!rootNodes || rootNodes.length === 0) {
            return;
        }
        prompted.current = true;
        const result = window.prompt('Category');
        if (result) {
            addChildNode(
                'categories',
                {
                    // We know that we only have one root node in this demo
                    parentId: state?.parentId ?? rootNodes[0].id,
                    data: { name: result, children: [] },
                    position: 0,
                },
                {
                    onSuccess: () => {
                        redirect('/categories');
                        refresh();
                    },
                }
            );
            return;
        }

        redirect('/categories');
    }, [data, redirect, refresh, addChildNode, state]);

    return null;
};

export default Prompt;
