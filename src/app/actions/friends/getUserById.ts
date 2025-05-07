'use server';
import { db } from '@/db/index';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// returns the string/username for the id
export default async function getUserById(id: number): Promise<string> {
    const response = await db
        .select({ username: usersTable.username })
        .from(usersTable)
        .where(eq(usersTable.id, id));

    // checks if there is error / if it found something
    if (!response || !response.length) {
        throw new Error('Could not find user by id');
    }

    return response[0].username;
}
