'use server';

import { db } from '@/db/index';
import { moviesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// get string based on id in the db
export default async function getMovieTitle(movieId: number): Promise<string> {
    const result = await db
        .select({ title: moviesTable.title })
        .from(moviesTable)
        .where(eq(moviesTable.id, movieId));

    if (!result || !result.length) {
        return '';
    }

    return result[0].title;
}
