'use server';
import { db } from '@/db/index';
import { watchlistTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getSeenMovies(userId: number): Promise<number[]> {
    const result = await db
        .select({ id: watchlistTable.movieid })
        .from(watchlistTable)
        .where(eq(watchlistTable.userid, userId));

    return result.map((ratings) => ratings.id);
}
