'use server';

import { getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';
import levenshtein from 'fast-levenshtein';

export default async function nameBasedFiltering(
    targetUserId: number
): Promise<movie[]> {
    // Fetch the target user's ratings.
    const targetUserRatings = await db
        .select({
            userId: testRatings.userId,
            movieId: testRatings.movieId,
            movieRating: testRatings.rating,
        })
        .from(testRatings)
        .where(eq(testRatings.userId, targetUserId));

    console.log('Got target user ratings.');
    console.log(targetUserRatings);

    // Initialise name score map.
    const nameScoreMap = new Map<string, number>();

    // Iterate through each rating made by the target user.
    for (const rating of targetUserRatings) {
        // Fetch the movie in question.
        const movie = await getMovieById(rating.movieId);

        // Check that the movie exists.
        if (movie !== null) {
            const movieTitle = movie.movieTitle;

            // Store the rated movie's title and weight by its rating.
            nameScoreMap.set(movieTitle, rating.movieRating);
        }
    }

    console.log('Names have been scored.');
    console.log(nameScoreMap);

    // Fetch all movies from the database.
    const movies = await db
        .select({
            movieId: moviesTable.id,
            movieTitle: moviesTable.title,
        })
        .from(moviesTable);

    console.log('Movies have been fetched.');

    // Create map for storing scores for each movie.
    const movieScoreMap = new Map<number, number>();

    // For every movie in the dataset.
    for (const movie of movies) {
        // Check if movie has already been rated by the target user.
        let movieHasBeenRated = false;

        for (const rating of targetUserRatings) {
            if (rating.movieId === movie.movieId) {
                movieHasBeenRated = true;
                break;
            }
        }

        // Continue to next movie if already rated.
        if (movieHasBeenRated) {
            continue;
        }

        // Initialise movie score.
        let score = 0;

        // Compare this movie's title with each rated movie's title.
        for (const [ratedTitle, ratedScore] of nameScoreMap) {
            score +=
                ratedScore /
                (levenshtein.get(
                    ratedTitle.toLowerCase(),
                    movie.movieTitle.toLowerCase()
                ) +
                    1);
        }

        // Set movie score.
        movieScoreMap.set(movie.movieId, score);
    }

    // Turn map into array.
    const scoredMovieIds = Array.from(movieScoreMap);

    // Sort by name similarity score (descending) and get top 30 recommendations.
    const sortedMovies = scoredMovieIds
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30);

    console.log('Sorted movies by name similarity and got top 30.');

    // Create array for storing recommended movies.
    const recommendedMovies: movie[] = [];

    // Iterate through all movies in the sorted array.
    for (const movie of sortedMovies) {
        // Fetch movie from database.
        const m = await getMovieById(movie[0]);

        // If the movie exists, add it to the recommended movies array.
        if (m !== null) {
            recommendedMovies.push(m);
        }
    }

    console.log('Fetched all recommended movies');

    // Return recommended movies.
    return recommendedMovies;
}
