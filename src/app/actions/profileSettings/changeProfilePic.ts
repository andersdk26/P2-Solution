'use server';

import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import defaultResponse from '@/components/defaultResponse';

export default async function changeEmail(
    userId: number,
    newProfileIcon: string
): Promise<defaultResponse> {
    if (!userId || !newProfileIcon) {
        return { status: 400, message: 'Missing required fields' };
    }

    // Update icon in the database
    await db
        .update(usersTable)
        .set({ profileIcon: newProfileIcon })
        .where(eq(usersTable.id, userId));

    return { status: 200, message: 'ProfileIcon updated successfully' };
}
