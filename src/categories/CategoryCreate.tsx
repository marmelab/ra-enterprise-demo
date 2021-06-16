import { useAddChildNode, useGetRootNodes } from '@react-admin/ra-tree';
import { useEffect, useRef } from 'react';
import {
    useRefresh,
    useRedirect,
    CreateProps,
    useResourceContext,
} from 'react-admin';

const Prompt = (props: CreateProps) => {
    const resource = useResourceContext(props);
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
                {
                    payload: {
                        // We know that we only have one root node in this demo
                        parentId: rootNodes[0].id,
                        data: { name: result, children: [] },
                    },
                },
                {
                    onSuccess: () => {
                        redirect(props.basePath as string);
                        refresh();
                    },
                }
            );
            return;
        }

        redirect(props.basePath as string);
    }, [data, props.basePath, redirect, refresh, addChildNode]);

    return null;
};

export default Prompt;
