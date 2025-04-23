'use server';

import { moviesTable, groupsTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq } from 'drizzle-orm';

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
    const averageGroupRatings = new Map<number, number>();

    // Iterate through each group member's ID.
    for (const id of individualIds) {
        // Get their respective ratings.
        const memberRatings = await db
            .select({
                userId: testRatings.userId,
                movieId: testRatings.movieId,
                movieRating: testRatings.rating,
            })
            .from(testRatings)
            .where(eq(testRatings.userId, parseInt(id)));

        // Add each rating to 'averageGroupRatings'.
        for (const rating of memberRatings) {
        }
    }

    return 0;
}
