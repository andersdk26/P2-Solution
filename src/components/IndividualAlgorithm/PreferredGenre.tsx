/*
Description: A function to calculate and implement weights to create a User object with a users top 5 genre's.
This is crucial for the content-based filtering function, since we use these favorite genre's and their weights for a score. 
*/
/* Documentation:
https://www.w3schools.com/js/js_array_sort.asp 
https://www.w3schools.com/jsref/jsref_slice_array.asp 
https://graphite.dev/guides/typescript-record-utility-type 
https://www.w3schools.com/sql/sql_primarykey.asp
https://www.w3schools.com/sql/sql_foreignkey.asp
*/

'use client';
import React from 'react';
import { db } from '../../db';
import { genreBoostTable, moviesTable } from '../../db/schema';

async function calculatePreferredGenres(userId: string): Promise<{
    userId: string;
    genreBoosts: { genre: string; boost: number }[];
}> {
    // Fetch the user's seen movies from the database
    const seenMovies: { InternalGenre: string }[] = await db // outer query to get the genres
        .select({ InternalGenre: moviesTable.InternalGenre })
        .from(moviesTable)
        .where(
            moviesTable.id.in(
                db // inner query to get the movie ids
                    .select({ movieId: 'movie_id' })
                    .from('seen_list_movies')
                    .where(
                        'seen_list_id',
                        '=',
                        db // inner query to get the seen_list id
                            .select({ id: 'id' })
                            .from('seen_list')
                            .where('user_id', '=', userId)
                    )
            )
        );

    // Count occurrences of each genre
    const genreCount: Record<string, number> = {};
    seenMovies.forEach((movie) => {
        genreCount[movie.InternalGenre] =
            (genreCount[movie.InternalGenre] || 0) + 1;
    });

    // Sort genres by count in descending order and take the top 5
    const topGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Assign boost values
    const boostValues = [1.5, 1.4, 1.3, 1.2, 1.1];
    const genreBoosts = topGenres.map(([genre], index) => ({
        genre,
        boost: boostValues[index],
    }));

    // Insert or update the genre boosts in the database
    for (const { genre, boost } of genreBoosts) {
        await db
            .insert(genreBoostTable)
            .values({
                genre,
                boost,
                userId,
            })
            .onConflict(['genre', 'userId'])
            .doUpdateSet({ boost });
    }

    return { userId, genreBoosts };
}

export default calculatePreferredGenres;
