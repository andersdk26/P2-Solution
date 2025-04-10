/* 
Description: A function to return a movie's score based on how compatible it is to a user, with the use of collaborative filtering.
---------------------------------------------------------------
Documentation:
https://www.w3schools.com/js/js_array_sort.asp 
https://www.w3schools.com/jsref/jsref_slice_array.asp 
https://www.w3schools.com/jsref/jsref_find.asp
*/
'use client';
import React, { JSX } from 'react';
import { eq, sql } from 'drizzle-orm';
import { db } from '../../db';
import {
    usersTable,
    seenListTable,
    seenListMoviesTable,
    moviesTable,
    genreBoostTable,
    seenListGenreBoostTable,
} from '../../db/schema';

async function scoreIndCollab(
    movieId: number,
    userId: number
): Promise<number> {
    let score = 0; // weighed ratings from similar users = similarity * rating + .... x5
    let totalWeight = 0; // similarity + similarity + .... x5

    // Fetch the user's genre boosts
    const userGenreBoosts: { genre: string; boost: number }[] = await db
        .select({
            userId: usersTable.id,
            genre: genreBoostTable.genre,
            boost: genreBoostTable.boost,
        })
        .from(usersTable) // select from users table
        .innerJoin(seenListTable, eq(usersTable.id, seenListTable.userId)) // join if ids the same as userId
        .innerJoin(
            seenListGenreBoostTable,
            eq(seenListTable.id, seenListGenreBoostTable.seenListId)
        ) // join if ids the same as seenListId
        .innerJoin(
            genreBoostTable,
            eq(seenListGenreBoostTable.genreBoostId, genreBoostTable.id)
        ) // join if ids the same as genreBoostId
        .where(eq(usersTable.id, userId)); // where the userId = userId

    // fetch other users' genre boosts
    const otherUsersArray = await db
        .select({ userId: usersTable.id })
        .from(usersTable)
        .where(sql`${usersTable.id} != ${userId}`); // ensure we don't include the current user

    const userSimilarities: { userId: string; similarity: number }[] = [];
    for (const otherUsersObject of otherUsersArray) {
        const otherUserGenres = await db
            .select({
                genre: genreBoostTable.genre,
                boost: genreBoostTable.boost,
            })
            .from(usersTable) // select from users table
            .innerJoin(seenListTable, eq(usersTable.id, seenListTable.userId)) // join if ids the same as userId
            .innerJoin(
                seenListGenreBoostTable,
                eq(seenListTable.id, seenListGenreBoostTable.seenListId)
            ) // join if ids the same as seenListId
            .innerJoin(
                genreBoostTable,
                eq(seenListGenreBoostTable.genreBoostId, genreBoostTable.id)
            ) // join if ids the same as genreBoostId
            .where(eq(usersTable.id, otherUsersObject.userId)); // where the userId == otherUsers.userId

        // Calculate similarity score between the current user and other users
        const similarity = calculateUserSimilarity(
            userGenreBoosts,
            otherUserGenres
        ); // calculate similarity score
        if (similarity > 0) {
            // push return value to array
            userSimilarities.push({
                // create array object with userId and similarity
                userId: String(otherUsersObject.userId),
                similarity,
            });
        }
    }
    // Sort the users by similarity score in descending order
    userSimilarities.sort(function (a, b) {
        // Sort in descending order (https://www.w3schools.com/jsref/jsref_sort.asp)
        return b.similarity - a.similarity;
    });

    const topSimilarUsers = userSimilarities.slice(0, 5); // Get top 5 similar users
    // Get movie ratings from the top 5 similar users
    for (const { userId: similarUserId, similarity } of topSimilarUsers) {
        const ratedmovie = await db
            .select({ rating: moviesTable.PersonalRating })
            .from(moviesTable)
            .innerJoin(
                seenListMoviesTable,
                eq(moviesTable.id, seenListMoviesTable.movieId)
            )
            .innerJoin(
                seenListTable,
                eq(seenListMoviesTable.seenListId, seenListTable.id)
            )
            .where(
                sql`${eq(seenListTable.userId, Number(similarUserId))} AND ${eq(moviesTable.id, movieId)}`
            )
            .limit(1); // We are expecting only one rating per user for a movie

        // Check if the otherUser[i] has rated the movie
        if (ratedmovie.length > 0) {
            const rating = ratedmovie[0].rating ?? 0; // Get the rating from otherUser[i]
            score += similarity * rating;
            totalWeight += similarity;
        }
    }
    return score / totalWeight;

    // Function to compute similarity between users based on genres
    function calculateUserSimilarity(
        userGenres: { genre: string; boost: number }[],
        otherUserGenres: { genre: string; boost: number }[]
    ): number {
        let similarityScore = 0; // EX: similarityScore Action + similarityScore Horror .... x5 for each user.
        let totalWeight = 0; // EX: totalWeight Action + totalWeight Horror .... x5 for each user.

        for (const { genre, boost } of userGenres) {
            // for each genre in userGenres
            const match = otherUserGenres.find(
                (otherUser) => otherUser.genre === genre
            ); // find the genre in otherUserGenres that matches the genre in userGenres
            if (match) {
                similarityScore += boost * match.boost;
                totalWeight += boost + match.boost;
            }
        }

        return totalWeight > 0 ? similarityScore / totalWeight : 0; // returns similarity (line 74)
    }
}

export default scoreIndCollab;
