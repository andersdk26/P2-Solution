/*
Description: A function to calculate and implement weights to create a User object with a users top 5 genre's.
This is crucial for the content-based filtering function, since we use these favorite genre and their weight for a score. 
MISSIN = WRITING ABOUT immutability and mutability (Something with react)
*/
/* Documentation:
https://www.w3schools.com/js/js_array_sort.asp 
https://www.w3schools.com/jsref/jsref_slice_array.asp 
https://graphite.dev/guides/typescript-record-utility-type 
https://www.w3schools.com/howto/howto_js_spread_operator.asp
*/
'use client';
import React, { JSX } from 'react';
import { User } from '../../components/types';

function calculatePreferredGenres(user: User): User {
    // create a new user object for immutability.
    const UserWithGenrePreference = {
        ...user,
        SeenList: { ...user.SeenList },
    };
    // create object with genre and number for times the genre appears in the seenlist
    // record<key, value> = {}; (We have a blank notebook to start with)
    const genreCount: Record<string, number> = {};

    // Occurence of each genre:
    user.SeenList.Movies.forEach((movie) => {
        genreCount[movie.InternalGenre] =
            (genreCount[movie.InternalGenre] || 0) + 1;
    });
    // Sort in descending order and take top 5
    const topGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Assign boost values
    const boostValues = [1.5, 1.4, 1.3, 1.2, 1.1];

    // Map genres to their boost values
    UserWithGenrePreference.SeenListList.GenreBoost = topGenres.map(
        ([genre], index) => ({
            Genre: genre,
            Boost: boostValues[index],
        })
    );
    return UserWithGenrePreference;
}
export default calculatePreferredGenres;
