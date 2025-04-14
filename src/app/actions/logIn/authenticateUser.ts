'use server';

import { verifyToken } from '@/components/authentication/cookieAuthentication';
import { cookies } from 'next/headers';

export default async function verifyUser(): Promise<number> {
    const cookieStore = await cookies();
    // Get the token cookie
    const response = cookieStore.get('token');

    // Check if the token cookie is defined
    if (response === undefined) {
        // todo: add more validation
        return 0;
    }

    // Verify the token
    const userId: string = await verifyToken(response?.value || '');

    // Return the user ID
    return parseInt(userId);
}
