'use server';

import { db } from 'db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import argon2 from 'argon2';
import defaultResponse from '@/components/defaultResponse';

export default async function handler(
    userId: number,
    currentPassword: string,
    newPassword: string
): Promise<defaultResponse> {
    if (!userId || !currentPassword || !newPassword) {
        return { status: 400, message: 'Missing required fields' };
    }

    try {
        // Fetch the user from the database
        const user = await db
            .select({ password: usersTable.password })
            .from(usersTable)
            .where(eq(usersTable.id, userId));

        if (user.length === 0) {
            return { status: 404, message: 'User not found' };
        }

        // Verify the current password
        const isPasswordValid = await argon2.verify(
            user[0].password,
            currentPassword
        );
        if (!isPasswordValid) {
            return { status: 401, message: 'Incorrect current password' };
        }

        // Hash the new password
        const hashedPassword = await argon2.hash(newPassword);

        // Update the password in the database
        await db
            .update(usersTable)
            .set({ password: hashedPassword })
            .where(eq(usersTable.id, userId));

        return { status: 200, message: 'Password updated successfully' };
    } catch (error) {
        console.error('Error changing password:', error);
        return { status: 500, message: 'Internal server error' };
    }
}
