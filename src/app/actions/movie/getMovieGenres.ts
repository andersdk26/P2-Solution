'use server';

import { db } from '@/db/index';
import { moviesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// gets the genres string for the given movie/row in the db
export default async function getMovieGenres(movieId: number): Promise<string> {
    const result = await db
        .select({ genres: moviesTable.genres })
        .from(moviesTable)
        .where(eq(moviesTable.id, movieId));

    if (!result || !result.length) {
        console.log("couldn't find genre :(");
        return '';
    }

    return result[0].genres;
}
