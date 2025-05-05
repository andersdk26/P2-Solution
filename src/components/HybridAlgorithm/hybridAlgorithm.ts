import { movie } from '@/actions/movie/movie';
import contentBasedFiltering from '../ContentBasedFiltering/contentBasedFiltering';
import collaborativeFiltering from '../CollaborativeFiltering/collaborativeFiltering';

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

    // Define array for a mix of the two algorithms.
    const result: movie[] = [];

    // Add movies to the array if the array does not already contain it.
    while (result.length < 30) {
        if (!result.includes(collaborativeFilteringResults[result.length])) {
            result.push(collaborativeFilteringResults[result.length]);
        }
        if (!result.includes(collaborativeFilteringResults[result.length])) {
            result.push(contentBasedFilteringResults[result.length]);
        }
    }

    // Return alternating array of movies.
    return result;
}
