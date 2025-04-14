'use server';

import { db } from '@/db/index';
import { movieImageCacheTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface movieImageCache {
    id: number;
    url: string;
    blurHash: string | null;
}

export async function movieImageCacheLookup(
    movieId: number
): Promise<movieImageCache | undefined> {
    const result = await db
        .select({
            id: movieImageCacheTable.movieId,
            url: movieImageCacheTable.url,
            blurHash: movieImageCacheTable.blurHash,
        })
        .from(movieImageCacheTable)
        .where(eq(movieImageCacheTable.movieId, movieId));

    if (!result.length) {
        return undefined;
    }

    return result[0];
}

export async function movieImageCacheInsert(
    movieId: number,
    movieURL: string
): Promise<void> {
    const blurHash = '';

    try {
        await db.insert(movieImageCacheTable).values({
            movieId,
            url: movieURL,
            blurHash,
        });
    } catch (error) {
        console.error(
            `Error inserting movie image cache for movieId: ${movieId}.`,
            error
        );
    }
}
