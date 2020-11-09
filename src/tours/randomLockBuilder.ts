import { Lock } from '@react-admin/ra-realtime';
import { Identifier } from 'react-admin';

const defaultIdentities = [
    'Stacey Warner',
    'Jasmine Morgan',
    'Gildas Bullock',
    'Adrien King',
    'Julien Andrews',
    'Laila Robinson',
    'Abigail Bryan',
    'Felix Mccoy',
    'Charlie Bradshaw',
    'Yasmine Hoffman',
];

export function generateIdentity(identities = defaultIdentities): string {
    return identities[Math.floor(Math.random() * identities.length)];
}

export function generateLock({
    id = 0,
    resource = 'products',
    recordId = 0,
}: {
    id: Identifier;
    resource: string;
    recordId?: Identifier;
}): Lock {
    const identity = generateIdentity();
    const createdAt = new Date();

    return {
        id,
        resource,
        recordId,
        identity,
        createdAt,
    };
}

export function generateLocks(resource = 'products'): Lock[] {
    return Array(20)
        .fill(0)
        .filter((_, i) => i % (1 + Math.floor(Math.random() * 6)) === 0)
        .map((_, i) =>
            generateLock({
                id: i,
                resource,
            })
        );
}

/**
 * Generate random locks
 *
 * This generator assumes that:
 * - Product ids exist up to 20
 */
const randomLockBuilder = (): { data: Lock[]; total: number } => {
    const locks = generateLocks();

    return {
        data: locks,
        total: (Math.round(Math.random() * 10000) / 100) * locks.length,
    };
};

export default randomLockBuilder;
