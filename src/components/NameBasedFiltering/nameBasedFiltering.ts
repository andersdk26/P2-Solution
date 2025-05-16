'use server';

import { getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, ratingsTable } from '@/db/schema';
import { db } from 'db';
import { eq } from 'drizzle-orm';
import levenshtein from 'fast-levenshtein';

export default async function nameBasedFiltering(
    targetUserId: number
): Promise<movie[]> {
    // Fetch the target user's ratings.
    const targetUserRatings = await db
        .select({
            userId: ratingsTable.userId,
            movieId: ratingsTable.movieId,
            movieRating: ratingsTable.rating,
        })
        .from(ratingsTable)
        .where(eq(ratingsTable.userId, targetUserId));

    console.log('Got target user ratings.');

    // Initialise name score map.
    const nameScoreMap = new Map<string, number>();
    const wordFrequencyMap = new Map<string, number>();

    // Iterate through each rating made by the target user.
    for (const rating of targetUserRatings) {
        const movie = await getMovieById(rating.movieId);
        if (movie !== null) {
            const movieTitle = movie.movieTitle;
            nameScoreMap.set(movieTitle, rating.movieRating);

            // Extract words from the title
            const words = movieTitle.toLowerCase().split(/\s+/);
            for (const word of words) {
                // removes 2 letter words and some three letter words that aren't helpful
                if (
                    word.length > 2 &&
                    ![
                        'and',
                        'the',
                        'for',
                        'but',
                        'yet',
                        'not',
                        'can',
                        'has',
                        'was',
                    ].includes(word)
                ) {
                    // Finds out how frequent the word appear in the rated titles
                    wordFrequencyMap.set(
                        word,
                        (wordFrequencyMap.get(word) || 0) + rating.movieRating
                    );
                }
            }
        }
    }

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

    for (const movie of movies) {
        if (
            targetUserRatings.some((rating) => rating.movieId === movie.movieId)
        ) {
            continue;
        }

        let score = 0;

        // Name similarity scoring
        // For each movie title that the target user has rated...
        for (const [ratedTitle, ratedScore] of nameScoreMap) {
            // Compute how similar the current movie's title is to the rated title using Levenshtein distance.
            // Lower distance = higher similarity.
            score +=
                ratedScore /
                (levenshtein.get(
                    ratedTitle.toLowerCase(),
                    movie.movieTitle.toLowerCase()
                ) +
                    1);
            // Add to the score based on the similarity.
            // The closer the titles (lower distance), the higher the contribution.
        }

        // Word-based scoring -- if word is present in the title, add too it's score
        for (const [word, wordScore] of wordFrequencyMap) {
            if (movie.movieTitle.toLowerCase().includes(word)) {
                score += wordScore;
            }
        }

        movieScoreMap.set(movie.movieId, score);
    }

    // Sort and select top recommendations
    const sortedMovies = Array.from(movieScoreMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30);

    console.log('Sorted movies by enhanced scoring and got top 30.');

    // Create final recommendations list
    const recommendedMovies: movie[] = [];

    for (const movie of sortedMovies) {
        const m = await getMovieById(movie[0]);
        if (m !== null) {
            recommendedMovies.push(m);
        }
    }

    console.log('Fetched all recommended movies');

    return recommendedMovies;
}
