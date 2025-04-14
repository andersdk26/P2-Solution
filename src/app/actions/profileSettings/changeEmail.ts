'use server';

import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import defaultResponse from '@/components/defaultResponse';

export default async function changeEmail(
    userId: number,
    newEmail: string
): Promise<defaultResponse> {
    if (!userId || !newEmail) {
        return { status: 400, message: 'Missing required fields' };
    }

    try {
        // Check if the new email already exists
        const existingUser = await db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(eq(usersTable.email, newEmail));

        if (existingUser.length > 0) {
            return { status: 409, message: 'Email already taken' };
        }

        // opdatere Email i databasen
        await db
            .update(usersTable)
            .set({ email: newEmail })
            .where(eq(usersTable.id, userId));

        return { status: 200, message: 'Email updated successfully' };
    } catch (error) {
        console.error('Error changing email:', error);
        return { status: 500, message: 'Internal server error' };
    }
}
