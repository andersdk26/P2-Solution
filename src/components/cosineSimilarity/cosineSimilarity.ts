export default function cosineSimilarity(
    userA: number[],
    userB: number[]
): number {
    // Find dot product between the common ratings of user A and B.
    let dotProduct = 0;

    for (let i = 0; i < userA.length; i++) {
        dotProduct += userA[i] * userB[i];
    }

    // Find the magnitude (Euclidean norm) of user A (square root of A transpose A).
    let magnitudeA = 0;

    // A transpose A.
    for (let i = 0; i < userA.length; i++) {
        magnitudeA += userA[i] * userA[i];
    }

    // Get the square root.
    magnitudeA = Math.sqrt(magnitudeA);

    // Find the magnitude (Euclidean norm) of user B (square root of B transpose B).
    let magnitudeB = 0;

    // B transpose B.
    for (let i = 0; i < userB.length; i++) {
        magnitudeB += userB[i] * userB[i];
    }

    // Get the square root.
    magnitudeB = Math.sqrt(magnitudeB);

    // Return the cosine similarity of the two users.
    return dotProduct / (magnitudeA * magnitudeB);
}
