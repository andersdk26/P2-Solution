'use server';
import { db } from '@/db/index';
import { testRatings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getSeenMovies(userId: number): Promise<number[]> {
    const result = await db
        .select({ id: testRatings.movieId })
        .from(testRatings)
        .where(eq(testRatings.userId, userId));
    return result.map((ratings) => ratings.id);
}
