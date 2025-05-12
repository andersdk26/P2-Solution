import cosineSimilarity from '@/components/cosineSimilarity/cosineSimilarity';

test('Cosine similarity with identical vectors', () => {
    const a = [2, 5, 3, 4, 4, 1, 2, 5];
    const b = [2, 5, 3, 4, 4, 1, 2, 5];
    expect(cosineSimilarity(a, b)).toBeCloseTo(1);
});

test('Cosine similarity with opposite vectors', () => {
    const a = [5, 5, 5];
    const b = [-5, -5, -5];
    expect(cosineSimilarity(a, b)).toBeCloseTo(-1);
});

test('Cosine similarity with orthogonal vectors', () => {
    const a = [5, 0];
    const b = [0, 5];
    expect(cosineSimilarity(a, b)).toBeCloseTo(0);
});
