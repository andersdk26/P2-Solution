'use server';

import { cookies } from 'next/headers';

export default async function checkLoggedIn(): Promise<boolean> {
    const cookieStore = await cookies();

    // Check the token cookie
    return cookieStore.has('token');
}
