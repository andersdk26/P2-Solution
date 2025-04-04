/* 
Description: Function to return af score for a movie based on collaborative filtering
*/
/* Documentation:
https://www.w3schools.com/js/js_array_sort.asp 
https://www.w3schools.com/jsref/jsref_slice_array.asp 
https://www.w3schools.com/js/js_maps.asp
https://www.w3schools.com/jsref/jsref_find.asp
*/
'use client';
import React, { JSX } from 'react';
import { eq, desc, sql } from 'drizzle-orm/sqlite-core';
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
    userId: string
): Promise<number> {
    let score = 0;
    let totalWeight = 0;

    // Fetch the user's genre boosts
    const userGenreBoosts: { genre: string; boost: number }[] = await db.select(
        {
            userId: usersTable.id,
            genre: genreBoostTable.genre,
            boost: genreBoostTable.boost,
        }
    );
}

// Function to compute similarity between users based on genres
function calculateUserSimilarity(
    userGenres: { genre: string; boost: number }[],
    otherUserGenres: { genre: string; boost: number }[]
): number {
    let similarityScore = 0;
    let totalWeight = 0;

    for (const { genre, boost } of userGenres) {
        const match = otherUserGenres.find((g) => g.genre === genre);
        if (match) {
            similarityScore += boost * match.boost;
            totalWeight += boost + match.boost;
        }
    }

    return totalWeight > 0 ? similarityScore / totalWeight : 0;
}

export default scoreIndCollab;
