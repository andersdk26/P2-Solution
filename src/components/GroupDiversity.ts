/* Should return a similarityscore for a group
used for weights contentbased % + collaborative % */
import '@contentBasedFiltering-filtering/ts';
import { getMovieById } from '@/actions/movie/movie';
import { groupsTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq } from 'drizzle-orm';
import { averageRating } from './ContentBasedFiltering/contentBasedFiltering';
import { cosineSimilarity } from './CollaborativeFiltering/collaborativeFiltering';

export default async function getGroupSimilarityScore(
    groupId: number
): Promise<number> {
    // Fetch group members.
    const users = await db
        .select({ members: groupsTable.members })
        .from(groupsTable)
        .where(eq(groupsTable.groupId, groupId));

    // Split members into array of IDs.
    const memberIds = users[0].members.split('|');

    // Map of user IDs and their genre ratings.
    const groupGenreScoreMap = new Map<number, number[]>();

    // For each member.
    for (const userId of memberIds) {
        // Get (and set) their genre scores.
        const genreScoreMap = await getAllGenreScore(parseInt(userId));
        groupGenreScoreMap.set(parseInt(userId), genreScoreMap);
    }

    // Define variables for getting similarity score.
    let totalSimilarityScore = 0;
    let count = 0;

    for (let i = 0; i < memberIds.length; i++) {
        for (let j = i + 1; j < memberIds.length; j++) {
            totalSimilarityScore += cosineSimilarity(
                groupGenreScoreMap.get(parseInt(memberIds[i]))!,
                groupGenreScoreMap.get(parseInt(memberIds[j]))!
            );
            count++;
        }
    }

    // Return group's similarity score.
    return totalSimilarityScore / count;
}

async function getAllGenreScore(userId: number): Promise<number[]> {
    // Define map for storing genre scores.
    const genreScores = new Map<string, averageRating>();

    // Add every genre to map.
    const allGenres = [
        'Adventure',
        'Animation',
        'Children',
        'Comedy',
        'Fantasy',
        'Romance',
        'Drama',
        'Action',
        'Crime',
        'Thriller',
        'Horror',
        'Mystery',
        'Sci-Fi',
        'IMAX',
        'Documentary',
        'War',
        'Musical',
        'Western',
        'Film-Noir',
    ];

    for (const genre of allGenres) {
        if (!genreScores.has(genre)) {
            genreScores.set(genre, {
                runningTotal: 0,
                timesRated: 0,
            });
        }
    }

    // Get all movies watched by user.
    const movies = await db
        .select({
            movieId: testRatings.movieId,
            movieRating: testRatings.rating,
        })
        .from(testRatings)
        .where(eq(testRatings.userId, userId));

    // Get total number of ratings.
    const totalMoviesRated = movies.length;

    // For every movie.
    for (const movie of movies) {
        // Get movie object.
        const m = await getMovieById(movie.movieId);

        // Check if the movie exists.
        if (m !== null) {
            // Skip movie if it has no genres.
            if (m.movieGenres === '(no genres listed)') {
                continue;
            }

            // Get array of genres.
            const genres = m.movieGenres.split('|');

            // For every genre.
            for (const genre of genres) {
                // Update the score for the current genre.
                genreScores.set(genre, {
                    runningTotal:
                        genreScores.get(genre)!.runningTotal +
                        movie.movieRating,
                    timesRated: genreScores.get(genre)!.timesRated + 1,
                });
            }
        }
    }

    // Convert running total and times rated to a score for each genre and each word.
    const genreScoreArray: number[] = [];

    // Get array of genre scores.
    for (const genre of genreScores) {
        genreScoreArray.push(
            (genre[1].runningTotal / genre[1].timesRated) *
                (genre[1].timesRated / totalMoviesRated)
        );
    }

    // Return the array.
    return genreScoreArray;
}
