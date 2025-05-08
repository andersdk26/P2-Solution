import getGroupSimilarityScore from '../../src/components/GroupDiversity';
import { getAllGenreScore } from '../../src/components/GroupDiversity';

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

test('Returning an array of scores of a user who has only watched and rated western 5', async () => {
    const array = await getAllGenreScore(2318340534);
    expect(array[17]).toStrictEqual(5);
});

