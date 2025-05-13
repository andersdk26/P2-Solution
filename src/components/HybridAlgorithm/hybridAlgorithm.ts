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

    // Define array for containing a mix of the results from the two algorithms.
    const result: movie[] = [];

    if (type === 'group') {
        // Get group similarity score (a number between 0 and 1).
        const similarity = await getGroupSimilarityScore(targetId);

        // Use similarity score to get number of movies from one of the two arrays.
        // The more similar the users are, the more recommendations will be based on collaborative filtering.
        const numberOfCollaborativeRecommendations = Math.floor(
            similarity * 30
        );

        // Define variables for interleaving the two arrays.
        let i = 0;
        let j = 0;

        // Evenly intertwine the two movie arrays based on group similarity.
        for (let n = 0; n < 30; n++) {
            if ((i + j) * numberOfCollaborativeRecommendations < j * 30) {
                result.push(collaborativeFilteringResults[i++]);
            } else {
                result.push(contentBasedFilteringResults[j++]);
            }
        }
    } else if (type === 'individual') {
        // Add movies to the array if the array does not already contain it.
        let colI = 0;
        let conI = 0;
        while (result.length < 30) {
            if (
                collaborativeFilteringResults.length > colI &&
                !result.includes(collaborativeFilteringResults[colI])
            ) {
                result.push(collaborativeFilteringResults[colI]);
                colI++;
            }
            if (
                contentBasedFilteringResults.length > conI &&
                !result.includes(contentBasedFilteringResults[conI])
            ) {
                result.push(contentBasedFilteringResults[conI]);
                conI++;
            }
        }
    }

    // Return alternating array of movies.
    return result;
}
