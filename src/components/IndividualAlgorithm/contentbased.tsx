/* 
Description: A function to return a movie's score based on how compatible it is to a user, with the use of content-based filtering.
Notes: We use PersonalRating becouse this is content-based an inner-rating is IMDB rating = collaborative outout. 
*/

'use client';
import React, { JSX } from 'react';
import { User, Movie } from '../../components/types';

function scoreIndContent(movie: Movie, user: User): number {
    let scoreIndContent = // The let statement ensures that we use Personalrating and if we dont have it we use InternalRating.
        movie.PersonalRating !== undefined
            ? movie.PersonalRating
            : movie.InternalRating;

    // Compare Movie's Genre with movies from User object
    if (user.SeenList.GenreBoost) {
        for (const boostedGenre of user.SeenList.GenreBoost) {
            if (movie.InternalGenre === boostedGenre.Genre) {
                scoreIndContent += boostedGenre.Boost;
            }
        }
    }
    return scoreIndContent; // ScoreIndividualContent
}
export default scoreIndContent;
