'use server';

import { db } from '@/db/index';
import { watchlistTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export default async function removeMovieToWatchlist(
    userId: number,
    movieId: number
): Promise<string> {
    try {
        // delete the movie in watchlist
        const result = await db
            .delete(watchlistTable)
            .where(
                and(
                    eq(watchlistTable.userid, userId),
                    eq(watchlistTable.movieid, movieId)
                )
            )
            .returning();

        // Check if the movie is not in the user's watchlist
        if (result[0] === undefined) {
            return 'Movie is not in the watchlist.';
        }

        if (result.length === 0) {
            throw new Error('Failed to remove movie from the watchlist.');
        }
        return 'successfully removed the Movie from the watchlist.';
    } catch (error) {
        console.error('Error removing movie from the watchlist: ', error);
        throw new Error('An error occurred while removing the movie.');
    }
}
