'use server';

import { db } from '@/db/index';
import { testRatings } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export default async function saveMovieRatings(
    userId: number,
    movieId: number,
    rating: number
): Promise<void> {
    const doesRatingAlreadyExist = await db
        .select({
            id: testRatings.id,
            userId: testRatings.userId,
            movieId: testRatings.movieId,
        })
        .from(testRatings)
        .where(
            and(
                eq(testRatings.userId, userId),
                eq(testRatings.movieId, movieId)
            )
        );

    if (doesRatingAlreadyExist[0] !== undefined) {
        console.log(
            'Deleting the following rating: ',
            doesRatingAlreadyExist[0]
        );
        await db
            .delete(testRatings)
            .where(eq(testRatings.id, doesRatingAlreadyExist[0].id));
    }

    try {
        const result = await db
            .insert(testRatings)
            .values({
                userId,
                movieId,
                rating,
            })
            .returning();

        if (result.length === 0) {
            throw new Error('No rating saved.');
        } else {
            console.log(
                'Added the following rating: ',
                userId,
                movieId,
                rating
            );
        }
    } catch (error) {
        console.error('Error saving user rating: ', error);
    }
}

