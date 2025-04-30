/* Should return a similarityscore for a group
used for weights contentbased % + collaborative % */
import '@contentBasedFiltering-filtering/ts';
import { getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';
import { getNamedRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex';

let targetUserRatings;
export default async function similarityscore(
    genreScoreMap: Map<string, number>,
    group: number
): Promise<number> {
    // fetch groupId and users from group table. (MISSING)
    let similarityScore: number = 0;
    let userId: number = targetUserRatings = 0;
    // new map with userId as key and genre score map as value
    const groupGenreScoreMap = new Map<number, Map<string, number>>();
    for (const userId of group) {
        const genreScoreMap = await genreData(userId);
        groupGenreScoreMap.set(userId, genreScoreMap);
    }
    // aggregate genre difference for each genre (MISSING)
        groupGenreScoreMap.forEach((userGenreScoreMap, userId) => {
             // Compare genreScores for the users in the group. 
            userGenreScoreMap.forEach((score, genre) => {
                const otherUserScore = genreScoreMap.get(genre);
                if (otherUserScore !== undefined) {
                    // Calculate the difference between the scores
                    const difference = score % otherUserScore;
                    // Add the difference to the similarity score
                    similarityScore += difference;
                }
            });
        });
        return similarityScore;
        }


    type averageRating = {
        runningTotal: number;
        timesRated: number;
    };

    async function genreData(targetId: number): Promise<Map<string, number>> {
        // Declare variable used for storing movie ratings.
        let targetUserRatings;
        targetUserRatings = await db
            .select({
                userId: testRatings.userId,
                movieId: testRatings.movieId,
                movieRating: testRatings.rating,
            })
            .from(testRatings)
            .where(eq(testRatings.userId, targetId));

        console.log('Got target user ratings.');
        console.log(targetUserRatings);

        // Find the total number of movies rated by the target user.
        const totalMoviesRated = targetUserRatings!.length;

        // Initialise genre score map.
        const averageGenreRating = new Map<string, averageRating>();

        // Iterate through each rating made by the target user.
        for (const rating of targetUserRatings!) {
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
                            rating.movieRating,
                        timesRated:
                            averageGenreRating.get(genre)!.timesRated + 1,
                    });
                }
            }
        }

        // Convert running total and times rated to a score for each genre.
        const genreScoreMap = new Map<string, number>();

        for (const genre of averageGenreRating) {
            genreScoreMap.set(
                genre[0],
                (genre[1].runningTotal / genre[1].timesRated) *
                    (genre[1].timesRated / totalMoviesRated)
            );
        }
        return genreScoreMap;
    }
}

