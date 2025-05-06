'use server';

import { cookies } from 'next/headers';

// checks if has token. returns boolean
export default async function checkLoggedIn(): Promise<boolean> {
    const cookieStore = await cookies();

    // Check the token cookie
    return cookieStore.has('token');
}
