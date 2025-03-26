/* 
Description: Function to return af score for a movie based on collaborative filtering
*/
/* Documentation:
https://www.w3schools.com/js/js_array_sort.asp 
https://www.w3schools.com/jsref/jsref_slice_array.asp 
*/
'use client';
import React, { JSX } from 'react';
import { User, Movie } from '../../components/types';
import calculatePreferredGenres from './PreferredGenre';

// Loops thorugh all top 5 similar user in respect to User.
function scoreIndCollab(movie: Movie, user: User, allUsers: User[]): number {
    let score = 0; // similarity between user and otherusers multiplied by the movies rating. EX: (0.8 * 5) + (0.7 * 5)
    let totalWeight = 0; // sum of Boost values EX (0.8+0.7)

    const similarUsers = allUsers
        .filter(
            (otherUser) => otherUser.UserInfo.UserID !== user.UserInfo.UserID // Validate we are not comparing the user to themselves
        )
        .map((otherUser) => ({
            user: otherUser,
            similarity: calculateUserSimilarity(user, otherUser), // Calculate similarity between User and similar user
        }))
        .sort((a, b) => b.similarity - a.similarity) // Sort in descending order
        .slice(0, 5);

    similarUsers.forEach(({ user: similarUser, similarity }) => {
        const ratedMovie = similarUser.SeenList.Movies.find(
            (m) => m.Title === movie.Title
        );
        if (ratedMovie && ratedMovie.PersonalRating !== undefined) {
            score += similarity * ratedMovie.PersonalRating;
            totalWeight += similarity;
        }
    });

    return totalWeight > 0 ? score / totalWeight : movie.InternalRating;
}
// Loops through all top 5 similar users in scoreIndCollab, and return a totalWeight of those similarityscores.
function calculateUserSimilarity(user1: User, user2: User): number {
    const user1Genres = calculatePreferredGenres(user1).SeenList.GenreBoost;
    const user2Genres = calculatePreferredGenres(user2).SeenList.GenreBoost;
    let similarityScore = 0;
    let totalWeight = 0;

    user1Genres.forEach(({ Genre, Boost }) => {
        const match = user2Genres.find((g) => g.Genre === Genre); // Do User and OtherUsers have same common PreferredGenres
        if (match) {
            similarityScore += Boost * match.Boost; // User Boost multiplied by Otheruser[i] boost.
            totalWeight += Boost + match.Boost; // Weight of Genre.
        }
    });

    return totalWeight > 0 ? similarityScore / totalWeight : 0;
}
