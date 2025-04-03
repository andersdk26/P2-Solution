/* 
Description: A function to return a movie's score based on how compatible it is to a user, with the use of content-based filtering.
*/

'use client';
import React, { JSX } from 'react';
import { db } from '../../db';
import { genreBoostTable, moviesTable } from '../../db/schema';

async function scoreIndContent(
    userId: string,
    movieId: number
): Promise<{ scoreIndContent: number }> {
    // Fetch the movie properties
    const movie = await db
        .select({
            PersonalRating: moviesTable.PersonalRating,
            InternalRating: moviesTable.InternalRating,
            InternalGenre: moviesTable.InternalGenre,
        })
        .from(moviesTable)
        .where(moviesTable.id.eq(movieId)) // Fetch the movie with the given movieId
        .first();

    // Handle the case where the movie does not exist
    if (!movie) {
        throw new Error('Movie not found.');
    }
    let scoreIndContent =
        movie.PersonalRating !== undefined
            ? movie.PersonalRating
            : movie.InternalRating;

    // Fetch GenreBoosts for the user
    const genreBoosts: { genre: string; boost: number }[] = await db
        .select({
            genre: genreBoostTable.genre,
            boost: genreBoostTable.boost,
        })
        .from(genreBoostTable)
        .where(
            genreBoostTable.id.in(
                db
                    .select({ genreBoostId: 'genre_boost_id' })
                    .from('seen_list_genre_boost')
                    .where(
                        'seen_list_id',
                        '=',
                        db
                            .select({ id: 'id' })
                            .from('seen_list')
                            .where('user_id', '=', userId)
                    )
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
