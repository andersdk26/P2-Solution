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
import {
    genreBoostTable,
    moviesTable,
    seenListGenreBoostTable,
    seenListTable,
    seenListMoviesTable,
} from '../../db/schema';
import { eq, sql } from 'drizzle-orm';

async function calculatePreferredGenres(userId: string): Promise<{
    userId: string;
    genreBoosts: { genre: string; boost: number }[];
}> {
    // Fetch the user's genres and PersonalRatings from seen_list
    const seenMovies: {
        internalGenre: string;
        personalRating: number | null;
    }[] = await db
        .select({
            internalGenre: moviesTable.InternalGenre,
            personalRating: moviesTable.PersonalRating,
        })
        .from(moviesTable)
        .where(
            sql`${moviesTable.id} IN (
                SELECT seen_list_movies.movie_id
                FROM seen_list_movies
                WHERE seen_list_movies.seen_list_id = (
                    SELECT seen_list.id
                    FROM seen_list
                    WHERE seen_list.user_id = ${userId}
                )
            )`
        );

    // Create a type called genreRatings, that holds strings as keys and objects with totalRating and count as properties.
    const genreRatings: Record<string, { totalRating: number; count: number }> =
        {};
    seenMovies.forEach((movie) => {
        if (movie.personalRating !== null) {
            const genre = movie.internalGenre;
            if (!genreRatings[genre]) {
                genreRatings[genre] = { totalRating: 0, count: 0 }; // Initialze the genre if it do not exist (We can acces the object with the genre as key since it is a string)
            }
            genreRatings[genre].totalRating += movie.personalRating; // Sum the ratings for the genre we acces the .totalRating property of the object with the genre as key
            genreRatings[genre].count += 1; // Count the number of ratings for the genre we acces the .count property of the object with the genre as key
        }
    });

    // create objects from the genreRatings object with the genre: string and
    const averageGenreObject = Object.entries(genreRatings).map(
        ([genre, genreRatingObject]) => ({
            genre,
            averageRating:
                genreRatingObject.totalRating / genreRatingObject.count, // Compute average
        })
    );

    // Sort genres by average rating in descending order and take the top 5
    const topGenresSort = averageGenreObject
        .sort(function (a, b) {
            return b.averageRating - a.averageRating; // Sort in descending order (https://www.w3schools.com/jsref/jsref_sort.asp)
        })
        .slice(0, 5); // Take the top 5 genres (https://www.w3schools.com/jsref/jsref_slice_array.asp)

    // Assign boost values based on the computed average ratings
    const genreBoosts = topGenresSort.map((topGenres) => ({
        // Maps the topGenresSort array to a new array with the genre and boost properties
        genre: topGenres.genre,
        boost: topGenres.averageRating, // Use averageRating as the boost
    }));

    // Update the genre boosts in the database for the user's genres
    for (const { genre, boost } of genreBoosts) {
        await db.run(sql`
           UPDATE genre_boost
            SET boost = ${boost}
            WHERE genre_boost.id IN (
                SELECT seen_list_genre_boost.genre_boost_id
                FROM seen_list_genre_boost
                INNER JOIN seen_list ON seen_list.id = seen_list_genre_boost.seen_list_id
                WHERE seen_list.user_id = ${userId}
            )
            AND genre_boost.genre = ${genre};
        `);
    }

    return { userId, genreBoosts }; // Return the userId and the calculated genreBoosts
}

export default calculatePreferredGenres;
