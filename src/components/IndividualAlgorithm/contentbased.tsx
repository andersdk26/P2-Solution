/* 
Description: A function to return a movie's score based on how compatible it is to a user, with the use of content-based filtering.
*/

'use client';
import React, { JSX } from 'react';
import { User, Movie } from '../../components/types';

function scoreIndContent(movie: Movie, user: User): number {
    let scoreIndContent = movie.InternalRating;

    // Compare Movie's Genre with movies from User object
    if (user.WatchList.GenreBoost) {
        for (const boostedGenre of user.WatchList.GenreBoost) {
            if (movie.InternalGenre === boostedGenre.Genre) {
                scoreIndContent += boostedGenre.Boost;
            }
        }
    }
    return scoreIndContent; // ScoreIndividualContent
}
export default scoreIndContent;
