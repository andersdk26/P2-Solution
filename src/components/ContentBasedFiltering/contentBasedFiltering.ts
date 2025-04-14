'use server';

import { movieWithRating, getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';

type score = {
    accumulativeScore: number;
    timesRated: number;
};

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

    // Initialise genre score map.
    const genreScoreMap = new Map<string, score>();

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
                    genreScoreMap.set(genre, {
                        accumulativeScore: 1,
                        timesRated: 0,
                    });
                }

                // Update the score for the current genre.
                genreScoreMap.set(genre, {
                    accumulativeScore:
                        genreScoreMap.get(genre)!.accumulativeScore *
                        rating.movieRating,
                    timesRated: genreScoreMap.get(genre)!.timesRated + 1,
                });
            }
        }
    }

    // Fetch all movies from the database.
    const movies = await db
        .select({
            movieId: moviesTable.id,
            movieTitle: moviesTable.title,
            movieGenre: moviesTable.genres,
        })
        .from(moviesTable)
        .where(ne(moviesTable.genres, '(no genres listed)'));

    // Create map for storing scores for each movie.
    const movieScoreMap = new Map<number, number>();

    for (const movie of movies) {
        // Get movie information.
        const m = await getMovieById(movie.movieId);

        // Check if movie exists.
        if (m !== null) {
            // Split genre string into individual genres.
            const genres = m.movieGenres.split('|');

            // Initialise movie score.
            let score = 0;

            // Iterate through each genre.
            for (const genre of genres) {
                score +=
                    genreScoreMap.get(genre)!.accumulativeScore /
                    genreScoreMap.get(genre)!.timesRated;
            }

            // Set movie score.
            movieScoreMap.set(movie.movieId, score / genres.length);
        }
    }

    return [];
}
