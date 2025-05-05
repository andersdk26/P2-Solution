'use server';

import { getMovieById, movie } from '@/actions/movie/movie';
import { ratingsTable, moviesTable } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';

type rating = {
    movieId: number;
    rating: number;
};

type user = {
    userId: number;
    ratings: rating[];
};

type similarity = {
    userId: number;
    similarity: number;
};

export default async function collaborativeFiltering(
    targetUserId: number
): Promise<movie[]> {
    // Fetch all ratings from the table ratingsTable that have only been made by the target user.
    const targetUserRatings = await db
        .select({
            userId: ratingsTable.userId,
            movieId: ratingsTable.movieId,
            movieRating: ratingsTable.rating,
        })
        .from(ratingsTable)
        .where(eq(ratingsTable.userId, targetUserId));

    console.log('Target user ratings have been fetched.');

    // Abort recommendation algorithm if user has not rated enough movies.
    if (targetUserRatings.length < 10) {
        console.log('Target user has not rated enough movies.');
        return [];
    }

    // Fetch all user ratings from the table ratingsTable, except those from the target user.
    const userRatingsFromDataset = await db
        .select({
            userId: ratingsTable.userId,
            movieId: ratingsTable.movieId,
            movieRating: ratingsTable.rating,
        })
        .from(ratingsTable)
        .where(ne(ratingsTable.userId, targetUserId));

    console.log('Other user ratings have been fetched.');

    // Fetch all movies from the database.
    const movies = await db
        .select({
            movieId: moviesTable.id,
        })
        .from(moviesTable);

    console.log('Movies have been fetched.');

    // Create a map for all the other users and their ratings: (userId, { rating(movieId, rating) }).
    const otherUserRatingsMap = new Map<number, rating[]>();

    // Populate the map.
    for (const row of userRatingsFromDataset) {
        // Check if map already has a user entry for the current row being checked.
        if (!otherUserRatingsMap.has(row.userId)) {
            // If the map does not contain an entry for the user ID, create one and initialise it with an empty array.
            otherUserRatingsMap.set(row.userId, []);
        }

        // Check if an entry for the user ID exists (TypeScript gets angry if you don't: Object is possibly 'undefined'.).
        otherUserRatingsMap.get(row.userId)?.push({
            // If the entry does exist, add the movie ID and rating to the rating array for the specified user ID.
            movieId: row.movieId,
            rating: row.movieRating,
        });
    }

    console.log('Other user ratings have been mapped.');

    // Convert the map to an array of users instead for easier operations later on.
    const otherUserRatings: user[] = Array.from(
        otherUserRatingsMap.entries()
    ).map(([userId, ratings]) => ({
        userId,
        ratings,
    }));

    console.log('Map has been converted to array.');

    // Create a new map for the target users ratings: (movieId, rating).
    const targetRatingMap = new Map<number, number>();

    // Populate the map with the ratings fetched from earlier.
    for (const rating of targetUserRatings) {
        targetRatingMap.set(rating.movieId, rating.movieRating);
    }

    // Create an array for storing the similarity between the target user and some user from the array otherUserRatings.
    const similarityScores: similarity[] = [];

    // Iterate through each rating from other users
    for (const otherUser of otherUserRatings) {
        // Define array for movies that the target user and the "other user" currently being checked has in common.
        const commonMovies: number[] = [];

        // Create two arrays for storing the target user and the "other user's" ratings for a movie that they have in common.
        const targetUserRatings: number[] = [];
        const otherUserRatings: number[] = [];

        // For every rating of the current "other user".
        for (const rating of otherUser.ratings) {
            // Check if the target user's map contains the key (movie ID) of the current rating being checked. In other words, check if the they have both rated a movie.
            if (targetRatingMap.has(rating.movieId)) {
                // If they have, then add that movie ID to their common movies.
                commonMovies.push(rating.movieId);

                // And then add their respective ratings to the rating arrays.
                // Note: targetRatingMap does contain a rating for the movie in question, but TypeScript gets angry if it is not explicitly stated that the key (movie ID) actually holds a value (a rating) (Argument of type 'number | undefined' is not assignable to parameter of type 'number'.), hence the exclamation mark.
                targetUserRatings.push(targetRatingMap.get(rating.movieId)!);
                otherUserRatings.push(rating.rating);
            }
        }

        // Now, if the target user and the "other user" has at least 10 movies in common.
        if (commonMovies.length >= 6) {
            // Calculate a similarity between the two.
            const similarity = cosineSimilarity(
                targetUserRatings,
                otherUserRatings
            );
            // And add it to the array of similarity scores.
            similarityScores.push({ userId: otherUser.userId, similarity });
        }
    }

    if (similarityScores.length < 10) {
        // If not enough similar users were found, return an empty array.
        console.log(
            `Not enough similar users found. Only ${similarityScores.length} weere found while 10 are needed.`
        );
        return [];
    }

    console.log('Similar users have been found.');

    // Create a sorted array of the similar users.
    let mostSimilarUsers = similarityScores.sort(
        (a, b) => b.similarity - a.similarity
    );

    // Get the top 10 most similar users.
    mostSimilarUsers = mostSimilarUsers.slice(0, 10);

    // Create a map for storing an aggregated score for each rated movie.
    const movieRatingsMap = new Map<
        number,
        { movieScore: number; timesRated: number }
    >();

    // Iterate through all similar users.
    for (const user of mostSimilarUsers) {
        // Get the user's ID.
        const userId = user.userId;

        // For every rating made by the user in question.
        for (const rating of otherUserRatingsMap.get(userId)!) {
            const movieId = rating.movieId;
            const userRating = rating.rating;

            // If the target user has not rated the movie.
            if (!targetRatingMap.has(movieId)) {
                // If this movie has not been added to the map, add it with initial values.
                if (!movieRatingsMap.has(movieId)) {
                    movieRatingsMap.set(movieId, {
                        movieScore: 1,
                        timesRated: 0,
                    });
                }

                // Get the current values for movieScore and timesRated.
                const movieRatingData = movieRatingsMap.get(movieId)!;

                // Multiply the existing movieScore by the new rating.
                movieRatingData.movieScore *= userRating;

                // Increase the timesRated count by 1.
                movieRatingData.timesRated += 1;
            }
        }
    }

    console.log('Movie scores have been calculated.');

    // Create array for storing all movies rated by the similar users.
    // const moviesRatedBySimilarUsers: movieWithRating[] = [];
    const moviesRatedBySimilarUsersMap = new Map<number, number>();

    // Iterate through all entries of the movieRatingsMap.
    for (const [
        movieId,
        { movieScore, timesRated },
    ] of movieRatingsMap.entries()) {
        // If movie is not NULL and the target user has not rated the movie.
        if (!targetRatingMap.has(movieId)) {
            // Add the movie to the array of rated movies by similar users.
            moviesRatedBySimilarUsersMap.set(movieId, movieScore / timesRated);
        }
    }

    const moviesRatedBySimilarUsersArray = Array.from(
        moviesRatedBySimilarUsersMap
    );

    // Now sort the array of rated movies by their rating.
    moviesRatedBySimilarUsersArray.sort((a, b) => b[1] - a[1]);

    console.log('Movie array has been sorted.');

    // Get the top 30 movies based on similar users ratings.
    const recommendedMovies = moviesRatedBySimilarUsersArray.slice(0, 30);

    const arrayOfRecommendedMovies: movie[] = [];

    for (const recommendedMovie of recommendedMovies) {
        const result = await getMovieById(recommendedMovie[0]);
        if (result) {
            arrayOfRecommendedMovies.push(result);
        }
    }
    // ################################
    // Fetch movie details using getMovieById.
    // const movie = await getMovieById(movieId);
    // ################################

    console.log(recommendedMovies);

    // Return the sorted array of recommended movies.
    return arrayOfRecommendedMovies;
}

function cosineSimilarity(userA: number[], userB: number[]): number {
    // Find dot product between the common ratings of user A and B.
    let dotProduct = 0;

    for (let i = 0; i < userA.length; i++) {
        dotProduct += userA[i] * userB[i];
    }

    // Find the magnitude (Euclidean norm) of user A (square root of A transpose A).
    let magnitudeA = 0;

    // A transpose A.
    for (let i = 0; i < userA.length; i++) {
        magnitudeA += userA[i] * userA[i];
    }

    // Get the square root.
    magnitudeA = Math.sqrt(magnitudeA);

    // Find the magnitude (Euclidean norm) of user B (square root of B transpose B).
    let magnitudeB = 0;

    // B transpose B.
    for (let i = 0; i < userB.length; i++) {
        magnitudeB += userB[i] * userB[i];
    }

    // Get the square root.
    magnitudeB = Math.sqrt(magnitudeB);

    // Return the cosine similarity of the two users.
    return dotProduct / (magnitudeA * magnitudeB);
}
