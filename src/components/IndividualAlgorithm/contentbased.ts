/* 
Description: A function to return a movie's score based on how compatible it is to a user, with the use of content-based filtering.
*/

'use client';
import React, { JSX } from 'react';
import { db } from '../../db';
import { eq, sql } from 'drizzle-orm';
import {
    genreBoostTable,
    moviesTable,
    seenListGenreBoostTable,
    seenListTable,
} from '../../db/schema';

async function scoreIndContent(
    userId: string,
    movieId: number
): Promise<{ scoreIndContent: number }> {
    // Fetch the movie properties
    const movie = await db
        .select({
            InternalRating: moviesTable.InternalRating,
            InternalGenre: moviesTable.InternalGenre,
        })
        .from(moviesTable)
        .where(eq(moviesTable.id, movieId)) // Fetch the movie with the given movieId
        .limit(1)
        .get();

    // Handle the case where the movie does not exist
    if (!movie) {
        throw new Error('Movie not found.');
    }
    let scoreIndContent = 0; // Initialize score to 0.
    // Fetch GenreBoosts for the user
    const genreBoosts: { genre: string; boost: number }[] = await db
        .select({
            genre: genreBoostTable.genre,
            boost: genreBoostTable.boost,
        })
        .from(genreBoostTable)
        .where(
            sql`${genreBoostTable.id} IN (
                SELECT seen_list_genre_boost.genre_boost_id
                FROM seen_list_genre_boost
                INNER JOIN seen_list ON seen_list.id = seen_list_genre_boost.seen_list_id
                WHERE seen_list.user_id = ${userId}
                )
            )`
        );

    // Apply GenreBoosts
    genreBoosts.forEach((boostedGenre) => {
        if (movie.InternalGenre === boostedGenre.genre) {
            scoreIndContent += boostedGenre.boost; // Add the boost value to the score
        }
    });

    return { scoreIndContent }; // Return calculated score for the movie
}

export default scoreIndContent;
