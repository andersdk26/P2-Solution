/* 
Description: Function to return af score for a movie based on ratings from similar users.
*/
/* Documentation:
https://www.w3schools.com/js/js_array_sort.asp 
https://www.w3schools.com/jsref/jsref_slice_array.asp 
*/
'use client';
import React, { JSX } from 'react';
import { User, Movie } from '../../components/types';
import calculatePreferredGenres from './PreferredGenre';

//
function scoreIndCollab(movie: Movie, user: User, allUsers: User[]): number {
    let score = 0;
    let totalWeight = 0;

    const similarUsers = allUsers
        .filter(
            (otherUser) => otherUser.UserInfo.UserID !== user.UserInfo.UserID
        )
        .map((otherUser) => ({
            user: otherUser,
            similarity: calculateUserSimilarity(user, otherUser),
        }))
        .sort((a, b) => b.similarity - a.similarity) // Sort in descending
        .slice(0, 10);

    similarUsers.forEach(({ user: similarUser, similarity }) => {
        const ratedMovie = similarUser.WatchList.Movies.find(
            (m) => m.Title === movie.Title
        );
        if (ratedMovie && ratedMovie.PersonalRating !== undefined) {
            score += similarity * ratedMovie.PersonalRating;
            totalWeight += similarity;
        }
    });

    return totalWeight > 0 ? score / totalWeight : movie.InternalRating;
}

function calculateUserSimilarity(user1: User, user2: User): number {
    const user1Genres = calculatePreferredGenres(user1).WatchList.GenreBoost;
    const user2Genres = calculatePreferredGenres(user2).WatchList.GenreBoost;
    let similarityScore = 0;
    let totalWeight = 0;

    user1Genres.forEach(({ Genre, Boost }) => {
        const match = user2Genres.find((g) => g.Genre === Genre);
        if (match) {
            similarityScore += Boost * match.Boost;
            totalWeight += Boost + match.Boost;
        }
    });

    return totalWeight > 0 ? similarityScore / totalWeight : 0;
}
