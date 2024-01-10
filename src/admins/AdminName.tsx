import * as React from 'react';
import { useGetManyAggregate, Identifier } from 'react-admin';

export const AdminName = ({ id }: { id: Identifier }) => {
    const { data: users } = useGetManyAggregate('admins', { ids: [id] });
    if (!users) return null;
    return <>{users[0].fullName}</>;
};
