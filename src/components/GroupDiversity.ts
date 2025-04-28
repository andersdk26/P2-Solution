/* Should return a similarityscore for a group
used for weights contentbased % + collaborative % */
import '@contentBasedFiltering-filtering/ts';
import { getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';
import { getNamedRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex';

export default async function similarityscore(
    genreScoreMap: Map<string, number>,
    group: number
): Promise<number> {
    // fetch groupId and users from group table. (MISSING)
    let similarityScore: number = 0;
    // new map with userId as key and genre score map as value
    const groupGenreScoreMap = new Map<number, Map<string, number>>();
    for (const userId of group) {
        const genreScoreMap = await genreData(userId);
        groupGenreScoreMap.set(userId, genreScoreMap);
    }
    // aggregate genre difference for each genre (MISSING)
    for (const [userId, genreScoreMap] of groupGenreScoreMap) {
    }

    /*  maybe sort the map first so we have the highest genre score first in the genreScoreMap. 
    (we cant only compare genrescore: since we aggregate the scores which means someones favorite genre can be the same as someone else, but if one has rated many more movies
    then it would indicate a low similarity score, which is not what we want)
    */
    return similarityScore;
}

async function genreData(userId: number): Promise<Map<string, number>> {
    // Initialise genre score map.
    const genreScoreMap = new Map<string, number>();

    // Fetch the user's ratings.
    const userRatings = await db
        .select({
            userId: testRatings.userId,
            movieId: testRatings.movieId,
            movieRating: testRatings.rating,
        })
        .from(testRatings)
        .where(eq(testRatings.userId, userId));

    // Iterate through each rating made by the user.
    for (const rating of userRatings) {
        // Fetch the movie associated with the rating.
        const movie = await getMovieById(rating.movieId);

        // Check that the movie exists.
        if (movie !== null) {
            // Get genres of the movie.
            const genres = movie.movieGenres;

            // If movie has no genres, continue to the next rating/movie.
            if (genres === '(no genres listed)') {
                continue;
            }

            // Split string into individual genres.
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

    // Return the genre score map.
    return genreScoreMap;
}

