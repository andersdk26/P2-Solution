'use server';

import { db } from '@/db/index';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// gets user id from table. returns id
export default async function getUserID(
    id: number | Promise<number>
): Promise<number> {
    const result = await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(eq(usersTable.id, await id));

    if (result.length === 0) {
        throw new Error(`No user found with ID ${await id}`);
    }

    // result is array of objects. need to get the first object's id
    return result[0].id;
}
