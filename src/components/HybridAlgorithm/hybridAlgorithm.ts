import { movie } from '@/actions/movie/movie';
import contentBasedFiltering from '../ContentBasedFiltering/contentBasedFiltering';
import collaborativeFiltering from '../CollaborativeFiltering/collaborativeFiltering';
import getGroupSimilarityScore from '../GroupDiversity';

export default async function hybridAlgorithm(
    targetId: number,
    type: string
): Promise<movie[]> {
    // Get collaborative filtering results.
    const collaborativeFilteringResults = await collaborativeFiltering(
        targetId,
        type
    );

    // Get content-based filtering results.
    const contentBasedFilteringResults = await contentBasedFiltering(
        targetId,
        type
    );

    // Get group similarity score (a number between 0 and 1).
    const similarity = await getGroupSimilarityScore(targetId);

    // Use similarity score to get number of movies from one of the two arrays.
    // The more similar the users are, the more recommendations will be based on collaborative filtering.
    const numberOfCollaborativeRecommendations = Math.floor(similarity * 30);

    // Define array for containing a mix of the results from the two algorithms.
    const result: movie[] = [];

    // Define variables for interleaving the two arrays.
    let i = 0;
    let j = 0;

    // Evenly interleave the two movie arrays based on group similarity.
    for (let n = 0; n < 30; n++) {
        if ((i + j) * numberOfCollaborativeRecommendations < j * 30) {
            result.push(collaborativeFilteringResults[i++]);
        } else {
            result.push(contentBasedFilteringResults[j++]);
        }
    }

    // Return alternating array of movies.
    return result;
}
