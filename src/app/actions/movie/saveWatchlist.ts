'use server';

import { db } from '@/db/index';
import { watchlistTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export default async function saveMovieToWatchlist(
    userId: number,
    movieId: number
): Promise<string> {
    // Check if the movie already exists in the user's watchlist
    const doesMovieAlreadyExist = await db
        .select({
            id: watchlistTable.id,
            userId: watchlistTable.userid,
            movieId: watchlistTable.movieid,
        })
        .from(watchlistTable)
        .where(
            and(
                eq(watchlistTable.userid, userId),
                eq(watchlistTable.movieid, movieId)
            )
        );

    if (doesMovieAlreadyExist[0] !== undefined) {
        return 'Movie is already in the watchlist.';
    }

    try {
        // Insert the movie into the user's watchlist
        const result = await db
            .insert(watchlistTable)
            .values({
                userid: userId,
                movieid: movieId,
            })
            .returning();

        if (result.length === 0) {
            throw new Error('Failed to add movie to the watchlist.');
        }
        return 'Successfully added the Movie to the watchlist.';
    } catch (error) {
        console.error('Error adding movie to the watchlist: ', error);
        throw new Error('An error occurred while adding the movie.');
    }
}
