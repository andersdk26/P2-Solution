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
    ratingsGenreBoostTable,
    ratingsTable,
} from '../../db/schema';
import { and, inArray } from 'drizzle-orm';

async function scoreIndContent(
    userId: number,
    movieId: number
): Promise<{ scoreIndContent: number }> {
    // Fetch the movie property
    const movie = await db
        .select({
            InternalGenre: moviesTable.internalGenre,
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
    // Fetch GenreBoosts from the user
    const genreBoosts: { genre: string; boost: number }[] = await db
        .select({
            // The properties we want to fetch
            genre: genreBoostTable.genre,
            boost: genreBoostTable.boost,
        })
        .from(genreBoostTable) // The table we want to fetch from
        .where(
            inArray(
                //
                genreBoostTable.id,
                db
                    .select(
                        // ratingsGenreBoostTable.genreBoostId is the foreign key to GenreBoostTable})
                        { genreBoostId: ratingsGenreBoostTable.genreBoostId }
                    )
                    .from(ratingsGenreBoostTable)
                    .innerJoin(
                        // join the ratingsGenreBoostTable with the ratingsTable via if their ids match.
                        ratingsTable,
                        eq(ratingsTable.id, ratingsGenreBoostTable.genreBoostId)
                    )
                    .where(eq(ratingsTable.userId, userId)) // Ensure we only get the genre boosts for the userId
            )
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
