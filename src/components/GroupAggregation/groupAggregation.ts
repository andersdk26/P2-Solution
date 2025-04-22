'use server';

import { moviesTable, groupsTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';

export default async function groupAggregation(groupId: number) {
    // Get group members' ID.
    const memberIds = await db
        .select({
            members: groupsTable.members,
        })
        .from(groupsTable)
        .where(eq(groupsTable.groupId, groupId));

    for (const id of memberIds) {
        console.log(id);
    }

    return 0;
}
