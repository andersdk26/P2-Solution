'use server';
import { db } from '@/db/index';
import { ratingsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getSeenMovies(userId: number): Promise<number[]> {
    const result = await db
        .select({ id: ratingsTable.movieId })
        .from(ratingsTable)
        .where(eq(ratingsTable.userId, userId));

    return result.map((ratings) => ratings.id);
}
