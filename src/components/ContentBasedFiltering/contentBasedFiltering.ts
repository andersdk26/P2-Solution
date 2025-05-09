'use server';

import {
    getMovieById,
    getMoviesById,
    movie,
} from '../../app/actions/movie/movie';
import { moviesTable, ratingsTable } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';
import groupAggregation from '../GroupAggregation/groupAggregation';

export type averageRating = {
    runningTotal: number;
    timesRated: number;
};

export default async function contentBasedFiltering(
    targetId: number,
    type: string
): Promise<movie[]> {
    // Declare variable used for storing movie ratings.
    let targetUserRatings;

    // Check whether the input ID represents a group or an individual.
    if (type === 'individual') {
        // Fetch the target user's ratings.
        targetUserRatings = await db
            .select({
                userId: ratingsTable.userId,
                movieId: ratingsTable.movieId,
                movieRating: ratingsTable.rating,
            })
            .from(ratingsTable)
            .where(eq(ratingsTable.userId, targetId));

        console.log('Got target user ratings.');
        console.log(targetUserRatings);
    } else if (type === 'group') {
        // Fetch the target users' average ratings.
        targetUserRatings = await groupAggregation(targetId);

        // Abort recommendation algorithm if the group has not rated enough movies.
        if (targetUserRatings.length < 10) {
            console.log('Target group has not rated enough movies.');
            return [];
        }
    }

    // Find the total number of movies rated by the target user.
    const totalMoviesRated = targetUserRatings!.length;

    // Create and populate map of movie IDs and user ratings.
    const movieRatings = new Map<number, number>();
    for (const movieRating of targetUserRatings!) {
        movieRatings.set(movieRating.movieId, movieRating.movieRating);
    }

    // Initialise genre score map.
    const averageGenreRating = new Map<string, averageRating>();

    // Initialise word score map.
    const averageWordRating = new Map<string, averageRating>();

    // List of words to ignore/not rate.
    const ignoreWords = ['the', 'and', 'a', 'an', 'or', 'of', '', 'aka', 'ii'];

    // Fetch all movies rated by the user.
    const ratedMovies = await getMoviesById(
        targetUserRatings!.map((movie) => movie.movieId)
    );

    // For each movie of rated movies.
    for (const ratedMovie of ratedMovies) {
        // Split title into words and remove special characters and numbers.
        let title = ratedMovie.movieTitle.toLowerCase();
        title = title.replace(/[^a-z ]+/g, '');
        const titleWords = title.split(' ');

        // Iterate through each word.
        for (const word of titleWords) {
            // Skip words from ignore list.
            if (!ignoreWords.includes(word)) {
                // If the word score map does not contain an entry for the specified genre, initialise it.
                if (!averageWordRating.has(word)) {
                    averageWordRating.set(word, {
                        runningTotal: 0,
                        timesRated: 0,
                    });
                }

                // Update the score for the current genre.
                averageWordRating.set(word, {
                    runningTotal:
                        averageWordRating.get(word)!.runningTotal +
                        movieRatings.get(ratedMovie.movieId)!,
                    timesRated: averageWordRating.get(word)!.timesRated + 1,
                });
            }
        }

        // Get genres of the movie.
        const genres = ratedMovie.movieGenres;

        // If movie has no genres, continue to the next rating/movie.
        if (genres === '(no genres listed)') {
            continue;
        }

        // Split string into single genres.
        const genreArray = genres.split('|');

        // Iterate through each genre.
        for (const genre of genreArray) {
            // If the genre score map does not contain an entry for the specified genre, initialise it.
            if (!averageGenreRating.has(genre)) {
                averageGenreRating.set(genre, {
                    runningTotal: 0,
                    timesRated: 0,
                });
            }

            // Update the score for the current genre.
            averageGenreRating.set(genre, {
                runningTotal:
                    averageGenreRating.get(genre)!.runningTotal +
                    movieRatings.get(ratedMovie.movieId)!,
                timesRated: averageGenreRating.get(genre)!.timesRated + 1,
            });
        }
    }

    // Convert running total and times rated to a score for each genre and each word.
    const genreScoreMap = new Map<string, number>();
    for (const genre of averageGenreRating) {
        genreScoreMap.set(
            genre[0],
            (genre[1].runningTotal / genre[1].timesRated) *
                (genre[1].timesRated / totalMoviesRated)
        );
    }

    const wordScoreMap = new Map<string, number>();
    for (const word of averageWordRating) {
        wordScoreMap.set(word[0], word[1].runningTotal / word[1].timesRated);
    }

    console.log(wordScoreMap);
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

    // Create map for storing genre and word scores for each movie.
    const movieScoreMap = new Map<number, number>();

    // For every movie in the dataset.
    for (const movie of movies) {
        // Check if movie has already been rated by the target user.
        let movieHasBeenRated = 0;

        for (const rating of targetUserRatings!) {
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

        // Split title into words and remove special characters and numbers.
        let title = movie.movieTitle.toLowerCase();
        title = title.replace(/[^a-z ]+/g, '');
        const titleWords = title.split(' ');

        // Initialise genre score.
        let genreScore = 0;

        // Iterate through each genre and accumulate the score.
        for (const genre of genres) {
            genreScore += genreScoreMap.get(genre) || 0;
        }

        // Initialise word score.
        let wordScore = 0;

        // Iterate through each word.
        for (const word of titleWords) {
            wordScore += wordScoreMap.get(word) || 0;
        }

        // Set movie score to average genre score + average word score.
        movieScoreMap.set(movie.movieId, genreScore + wordScore);
    }

    // Turn map into array.
    const scoredMovieIds = Array.from(movieScoreMap);

    // Default sorting algorithm, sorts alphabetically (even numerical).
    const sortedMovies = scoredMovieIds
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30);
    console.log('Sorted movies by score and got top 30.');

    // Create array for storing recommended movies.
    const recommendedMovies = await getMoviesById(
        sortedMovies.map(([id]) => id)
    );
    console.log('Fetched all recommended movies');

    // Sort recommended movies after fetching from db, since the returned array is based on movie order in the dataset.
    recommendedMovies.sort(
        (a, b) => movieScoreMap.get(b.movieId)! - movieScoreMap.get(a.movieId)!
    );

    // Return recommended movies.
    return recommendedMovies;
}
