'use server';

import { db } from '@/db/index';
import { watchlistTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// This function saves a movie to the users watchlist in the database
export async function saveMovieToWatchlist(
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

// This function removes a movie from the users watchlist in the database
export async function removeMovieToWatchlist(
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
        return 'Successfully removed the Movie from watchlist.';
    } catch (error) {
        console.error('Error removing movie from watchlist: ', error);
        throw new Error('An error occurred while removing the movie.');
    }
}

// This function checks if a movie is in the users watchlist in the database
export async function checkWatchlistStatus(
    userId: number,
    movieId: number
): Promise<boolean> {
    try {
        // Check if the movie is in the user's watchlist
        const result = await db
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

        return result.length > 0;
    } catch (error) {
        console.error('Error checking movie in watchlist: ', error);
        throw new Error('An error occurred while checking the movie.');
    }
}
