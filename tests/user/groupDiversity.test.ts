import getGroupSimilarityScore from '../../src/components/GroupDiversity';
import { getAllGenreScore } from '../../src/components/GroupDiversity';
// test cosineSimilarity when testing algorithms

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

test('Returning a similarityscore for a custom picked group that should be very similar "test"', async () => {
    const score = await getGroupSimilarityScore(3378553321);
    expect(score).toBeCloseTo(1);
});

test('Returning a similarityscore for a custom picked group that should be very diverse "test"', async () => {
    const score = await getGroupSimilarityScore(1542737550);
    expect(score).toBeCloseTo(0);
});

test('Returning an array of scores of a user who has rated 15 westerns 5 popcorns', async () => {
    const array = await getAllGenreScore(2318340534);
    expect(array[17]).toBeCloseTo(5);
});

test('Returning an array of scores of a user who has rated 12 westerns (5,2,5,2....) and rated 3 comedy (5,4,3)', async () => {
    const array = await getAllGenreScore(1253957859);
    expect(array[17]).toBeCloseTo(2.8);
    expect(array[3]).toBeCloseTo(0.8);
});

