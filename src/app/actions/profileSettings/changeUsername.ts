'use server';

import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import defaultResponse from '@/components/defaultResponse';

export default async function changeUsername(
    userId: number,
    newUsername: string
): Promise<defaultResponse> {
    if (!userId || !newUsername) {
        return { status: 400, message: 'Missing required fields' };
    }

    try {
        // Check if the new username already exists
        const existingUser = await db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(eq(usersTable.username, newUsername));

        if (existingUser.length > 0) {
            return { status: 409, message: 'Username already taken' };
        }

        // Update username in the database
        await db
            .update(usersTable)
            .set({ username: newUsername })
            .where(eq(usersTable.id, userId));

        return { status: 200, message: 'Username updated successfully' };
    } catch (error) {
        console.error('Error changing username:', error);
        return { status: 500, message: 'Internal server error' };
    }
}
