import { demoUser } from '../authProvider';
import avatars from './avatars';
import { AdminUser } from '../types';

export const admins: AdminUser[] = [
    demoUser,
    {
        id: 0,
        avatar: avatars[0],
        fullName: 'Toni Rosser',
    },
    {
        id: 1,
        avatar: avatars[1],
        fullName: 'Iris Bailey',
    },
    {
        id: 2,
        avatar: avatars[2],
        fullName: 'Rocky Coon',
    },
    {
        id: 3,
        avatar: avatars[3],
        fullName: 'Victoria Scott',
    },
    {
        id: 4,
        avatar: avatars[4],
        fullName: 'Sharon Stephenson',
    },
];
