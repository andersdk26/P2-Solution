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
    ratingsGenreBoostTable,
    ratingsTable,
    usersTable,
} from '../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { and, inArray } from 'drizzle-orm';
import { int } from 'drizzle-orm/mysql-core';

async function calculatePreferredGenres(userId: number): Promise<{
    userId: number;
    genreBoosts: { genre: string; boost: number }[];
}> {
    // Fetch the user's genres and PersonalRatings from seen_list
    const seenMovies: {
        internalGenre: string;
        personalRating: number;
    }[] = await db
        .select({
            internalGenre: moviesTable.internalGenre,
            personalRating: ratingsTable.personalRating,
        })
        .from(moviesTable)
        .innerJoin(
            ratingsTable,
            eq(moviesTable.id, ratingsTable.movieId) // Join moviesTable with ratingsTable via foreign keys
        )
        .where(eq(ratingsTable.userId, userId)); // Ensure we only get the movies for the userId

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
        await db
            .update(genreBoostTable) // The table we want to update the boost property in
            .set({ boost }) // The property we want to update
            .where(
                // Following conditions must be met to update the property
                and(
                    inArray(
                        genreBoostTable.id,
                        db
                            .select({
                                // The genreBoostTable.id is the foreign key in ratingsGenreBoostTable connecting the two tables
                                genreBoostTableId:
                                    ratingsGenreBoostTable.genreBoostId,
                            })
                            .from(ratingsGenreBoostTable)
                            .innerJoin(
                                ratingsGenreBoostTable,
                                eq(
                                    // if the ratingsTable.id is the same as the ratingsGenreBoostTable.ratingsId join tables.
                                    ratingsTable.id,
                                    ratingsGenreBoostTable.ratingsId
                                )
                            )
                            .where(eq(ratingsTable.userId, usersTable.id)) // Ensure we do it for the right userId (userstable has foreign key to the ratingsTable)
                    ),
                    eq(genreBoostTable.genre, genre) // Ensure the genre is the same as the one we want to update
                )
            );
    }
    return { userId, genreBoosts };
}

export default calculatePreferredGenres;
