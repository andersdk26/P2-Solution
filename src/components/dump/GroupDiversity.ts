// /* Should return a similarityscore for a group
// used for weights contentbased % + collaborative % */
// import '@contentBasedFiltering-filtering/ts';
// import { getMovieById, movie } from '@/actions/movie/movie';
// import { groupsTable, moviesTable, ratingsTable } from '@/db/schema';
// import { db } from 'db';
// import { eq, ne } from 'drizzle-orm';
// import { getNamedRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex';

// let targetUserRatings;
// export default async function getGroupSimilarityScore(
//     groupId: number
// ): Promise<number> {
//     // Fetch group members.
//     const users = await db
//         .select({ members: groupsTable.members })
//         .from(groupsTable)
//         .where(eq(groupsTable.groupId, groupId));

//     // Split members into array of IDs.
//     const memberIds = users[0].members.split('|');

//     // Map of user IDs and their genre ratings.
//     const groupGenreScoreMap = new Map<number, Map<string, number>>();

//     // For each member.
//     for (const userId of memberIds) {
//         // Get (and set) their genre scores.
//         const genreScoreMap = await getAllGenreScore(parseInt(userId));
//         groupGenreScoreMap.set(parseInt(userId), genreScoreMap);
//     }
// }

// async function getAllGenreScore(userId: number): Promise<Map<string, number>> {
//     const map = new Map<string, number>();

//     // Define map for storing score.
//     const genreScores = new Map<string, rating>();

//     // Add every genre to map.
//     // Pre-determined list of all possible genres.

//     // Get all movies watched by user.
//     const movies = await db
//         .select({
//             movieId: ratingsTable.movieId,
//             movieRating: ratingsTable.rating,
//         })
//         .from(ratingsTable)
//         .where(eq(ratingsTable.userId, userId));

//     // For every movie.
//     for (const movie of movies) {
//         // Get movie object.
//         const m = await getMovieById(movie.movieId);

//         // Check if the movie exists.
//         if (m !== null) {
//             // Skip movie if it has no genres.
//             if (m.movieGenres === '(no genres listed)') {
//                 continue;
//             }

//             // Get array of genres.
//             const genres = m.movieGenres.split('|');

//             for (const genre of genres) {
//             }
//         }
//     }
//     // Get all genres for those movies, and find genre score.
//     // Set the corresponding map entry to the score.

//     // Return map.

//     return map;
// }
