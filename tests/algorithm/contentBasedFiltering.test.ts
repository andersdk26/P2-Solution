import { db } from '@/db/index';
import contentBasedFiltering from '../../src/components/ContentBasedFiltering/contentBasedFiltering';
import { ratingsTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

test('Harry potter fan', async () => {
    const recommendations = await contentBasedFiltering(333333, 'individual');
    expect(recommendations[0].movieId).toBe(88125);
}, 20000);

test('User with no ratings', async () => {
    const recommendations = await contentBasedFiltering(444444, 'individual');
    expect(recommendations[0].movieId).toBe(1);
}, 20000);

test('Returns 30 recommendations', async () => {
    const recommendations = await contentBasedFiltering(333333, 'individual');
    expect(recommendations.length).toBe(30);
}, 20000);

test('Recommendations change after new user rating', async () => {
    const recommendationsBefore = await contentBasedFiltering(
        333333,
        'individual'
    );
    await db.insert(ratingsTable).values({
        userId: 333333,
        movieId: 59315,
        rating: 5,
    });
    const recommendationsAfter = await contentBasedFiltering(
        333333,
        'individual'
    );
    await db
        .delete(ratingsTable)
        .where(
            and(
                eq(ratingsTable.userId, 333333),
                eq(ratingsTable.movieId, 59315),
                eq(ratingsTable.rating, 5)
            )
        );

    expect(recommendationsBefore).not.toBe(recommendationsAfter);
}, 40000);
