'use server';

import { cookies } from 'next/headers';

export default async function userLogout(): Promise<boolean> {
    const cookieStore = await cookies();

    // Delete the token cookie
    cookieStore.delete('token');

    return cookieStore.has('token') === false;
}
