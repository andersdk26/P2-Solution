/* 
Desciption: Need weights, need ERROR handling for fallback cases! Need to check SQL query for issues.
 */
import { eq, sql } from 'drizzle-orm';
import scoreIndCollab from '@/components/IndividualAlgorithm/collaborative';
import scoreIndContent from '@/components/IndividualAlgorithm/contentbased';
import calculatePreferredGenres from '@/components/IndividualAlgorithm/preferredGenre';

export async function finalRecommendation(
    userId: string,
    movieIds: number[]
): Promise<{ movieId: number; score: number }[]> {
    await calculatePreferredGenres(userId);

    const moviesScores = [];
    for (const movieId of movieIds) {
        const scoreIndContentResult = await scoreIndContent(userId, movieId);
        const scoreIndCollabResult = await scoreIndCollab(
            movieId,
            Number(userId)
        );
        const finalScore =
            scoreIndContentResult.scoreIndContent + scoreIndCollabResult;
        moviesScores.push({ movieId, finalScore });
    }
    moviesScores.sort((a, b) => b.finalScore - a.finalScore);
    return [
        { movieId: moviesScores[0].movieId, score: moviesScores[0].finalScore },
    ]; // Return the first movie with the highest score
}

