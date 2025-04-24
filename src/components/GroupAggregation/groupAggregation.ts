'use server';

import { groupsTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq } from 'drizzle-orm';

type averageRating = {
    runningTotal: number;
    timesRated: number;
};

type groupRatings = {
    memberIds: string;
    movieId: number;
    movieRating: number;
};

export default async function groupAggregation(
    groupId: number
): Promise<groupRatings[]> {
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
    const averageGroupRatings = new Map<number, averageRating>();

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
            if (!averageGroupRatings.has(rating.movieId)) {
                // If the movie does not exist in the map, add it.
                averageGroupRatings.set(rating.movieId, {
                    runningTotal: rating.movieRating,
                    timesRated: 1,
                });
            } else {
                // If the movie does exist in the map, update score and times rated.
                averageGroupRatings.set(rating.movieId, {
                    runningTotal:
                        averageGroupRatings.get(rating.movieId)!.runningTotal +
                        rating.movieRating,
                    timesRated:
                        averageGroupRatings.get(rating.movieId)!.runningTotal +
                        1,
                });
            }
        }
    }

    // Create map of average ratings.
    const groupRatingsMap = new Map<number, number>();

    for (const rating of averageGroupRatings) {
        groupRatingsMap.set(
            rating[0],
            rating[1].runningTotal / rating[1].timesRated
        );
    }

    // Convert to groupRatings array
    const groupRatingsArray: groupRatings[] = Array.from(
        groupRatingsMap.entries()
    ).map(([movieId, movieRating]) => ({
        memberIds: memberIds[0].members,
        movieId,
        movieRating,
    }));

    return groupRatingsArray;
}
