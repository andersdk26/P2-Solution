'use server';

import { db } from '@/db/index';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// gets the email from table. returns email
export default async function getUserEmail(
    id: number | Promise<number>
): Promise<string> {
    const result = await db
        .select({ email: usersTable.email })
        .from(usersTable)
        .where(eq(usersTable.id, await id));

    if (result.length === 0) {
        throw new Error(`No user found with ID ${await id}`);
    }

    return result[0].email;
}
