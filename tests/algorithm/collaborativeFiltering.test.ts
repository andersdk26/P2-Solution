import { db } from '@/db/index';
import collaborativeFiltering from '../../src/components/CollaborativeFiltering/collaborativeFiltering';
import { ratingsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

test('User with not enough ratings', async () => {
    const recommendations = await collaborativeFiltering(333333, 'individual');
    expect(recommendations.length).toBe(0);
});

test('Returns 30 recommendations', async () => {
    const recommendations = await collaborativeFiltering(200611, 'individual');
    expect(recommendations.length).toBe(30);
});

test('Recommendations contains expected movies', async () => {
    const ratedMovies = [
        60040, 77561, 86332, 88140, 102125, 106072, 110102, 122892, 122900,
        122922, 122918, 122920, 122912, 122910, 122914, 201773, 242774, 272525,
        274971, 285593, 5349, 8636, 52722,
    ];
    for (const movie of ratedMovies) {
        await db
            .insert(ratingsTable)
            .values({ userId: 777777, movieId: movie, rating: 5 });
    }
    const recommendations = await collaborativeFiltering(777777, 'individual');
    db.delete(ratingsTable).where(eq(ratingsTable.userId, 777777));
    const recommendedMovieIds = recommendations.map((movie) => movie.movieId);
    const expectedRecommendations = [
        122906, 122914, 59315, 117344, 263007, 89745, 112852, 201773,
    ];
    const numberOfMatches = expectedRecommendations.filter((expectedMovieId) =>
        recommendedMovieIds.includes(expectedMovieId)
    );
    expect(numberOfMatches.length).toBeGreaterThan(0);
}, 20000);
