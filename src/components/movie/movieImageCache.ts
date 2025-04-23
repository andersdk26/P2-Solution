'use server';

import { db } from '@/db/index';
import { movieImageCacheTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getPlaiceholder } from 'plaiceholder';

export interface movieImageCache {
    id: number;
    url: string;
    blurHash: string | null;
}

export async function movieImageCacheLookup(
    movieId: number
): Promise<movieImageCache | undefined> {
    // Check if movieId is in cache
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

    // Return the first result
    return result[0];
}

export async function movieImageCacheInsert(
    movieId: number,
    movieURL: string
): Promise<void> {
    const blurHash = await generateBlurHash(movieURL);

    try {
        // Insert movie image cache
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

async function generateBlurHash(url: string): Promise<string> {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    // Encode image
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
}
