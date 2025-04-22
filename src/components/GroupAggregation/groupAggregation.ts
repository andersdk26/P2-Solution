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

    // Split string into individual IDs.
    const individualIds = memberIds[0].members.split('|');

    // Map of group members average ratings.

    // Iterate through each group member's ID.
    for (const id of individualIds) {
    }

    return 0;
}
