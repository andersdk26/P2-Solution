/* Should return a similarityscore for a group
used for weights contentbased % + collaborative % */
import '@contentBasedFiltering-filtering/ts';
import { getMovieById, movie } from '@/actions/movie/movie';
import { moviesTable, testRatings } from '@/db/schema';
import { db } from 'db';
import { eq, ne } from 'drizzle-orm';

export default async function Diversity(
    targetUserId: number
): Promise<Map<string, number>> {
        if (UserID === targetUserId) {
            // Fetch the target user's ratings.
            const group; // Fetch the group of users
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
                            genreScoreMap.set(genre, 1);
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

            // Return the genre score map.
            return genreScoreMap;
        }
        // Compare each genreScoreMap in the group and aggregate the difference in genrescores.
        // This will be used to calculate the diversity score.

        // create mappings
        const DiversityGenre: string[][] = [];
        const DiversityScore: number [][] = [];
        
        for (let i = 0; i < group.lenght; i++) {
            genreScoreMap = genreScoreMap[i];
        }
        // get genres from mappings
        for (let genreScoreMap[i] = 0; i < group.lenght; i++) {
            let genreScoreMap[i].get('genre') = DiversityGenre[i];
            let genreScoreMap[i].get('rating') = DiversityScore[i];
        }
        // add the difference 
        for (DiversityGenre[i] of group.lenght) {
            DiversityScore[i]+ = 0
        }
    }
}

      
/*
example with 2 users in a group the differencescore is 2000. (Normalice later)
horror , 5000                horror, 4000          = 1000
romance , 4000              fantasy, 3000          = 1000 
happy , 3000                 NONE , 0
= 5000 difference in the group.
*/
