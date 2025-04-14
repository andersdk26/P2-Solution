'use server';

import { getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';

export default async function contentBasedFiltering(
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

    // Initialise genre score map.
    const genreScoreMap = new Map<string, number>();

    // Iterate through each rating made by the target user.
    for (const rating of targetUserRatings) {
        // Fetch the movie in question.
        const movie = await getMovieById(rating.movieId);

        // Check that the movie exists.
        if (movie !== null) {
            // Get genres of the movie.
            const genres = movie.movieGenres;

            // If movie has no genres, continue to the next rating/movie.
            if (genres === '(no genres listed)') {
                continue;
            }

            // Split string into single genres.
            const genreArray = genres.split('|');

            // Iterate through each genre.
            for (const genre of genreArray) {
                // If the genre score map does not contain an entry for the specified genre, initialise it.
                if (!genreScoreMap.has(genre)) {
                    genreScoreMap.set(genre, 0);
                }

                // Update the score for the current genre.
                genreScoreMap.set(
                    genre,
                    genreScoreMap.get(genre)! + rating.movieRating
                );
            }
        }
    }

    console.log('Genres have been scored.');
    console.log(genreScoreMap);

    // Fetch all movies from the database.
    const movies = await db
        .select({
            movieId: moviesTable.id,
            movieTitle: moviesTable.title,
            movieGenre: moviesTable.genres,
        })
        .from(moviesTable)
        .where(ne(moviesTable.genres, '(no genres listed)'));

    console.log('Movies have been fetched.');

    // Create map for storing scores for each movie.
    const movieScoreMap = new Map<number, number>();

    // For every movie in the dataset.
    for (const movie of movies) {
        // Check if movie has already been rated by the target user.
        let movieHasBeenRated = 0;

        for (const rating of targetUserRatings) {
            if (rating.movieId === movie.movieId) {
                movieHasBeenRated = 1;
                break;
            }
        }

        // Continue to next movie if so.
        if (movieHasBeenRated === 1) {
            continue;
        }

        // Split genre string into individual genres.
        const genres = movie.movieGenre.split('|');

        // Initialise movie score.
        let score = 0;

        // Iterate through each genre and accumulate the score.
        for (const genre of genres) {
            score += genreScoreMap.get(genre) || 0;
        }

        // Set movie score.
        movieScoreMap.set(movie.movieId, score);
    }

    // Turn map into array.
    const scoredMovieIds = Array.from(movieScoreMap);

    // Default sorting algorithm, sorts alphabetically (even numerical).
    const sortedMovies = scoredMovieIds
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30);

    console.log('Sorted movies by score and got top 30.');

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
