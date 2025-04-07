'use server';

import { db } from '@/db/index';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getUsername(
    id: number | Promise<number>
): Promise<string> {
    const result = await db
        .select({ username: usersTable.username })
        .from(usersTable)
        .where(eq(usersTable.id, await id));

    if (result.length === 0) {
        throw new Error(`No user found with ID ${await id}`);
    }

    return result[0].username;
}
