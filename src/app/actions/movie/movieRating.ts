'use server';

import { db } from '@/db/index';
import { testRatings } from '@/db/schema';
import verifyUser from '../logIn/authenticateUser';
import { and, eq, sql } from 'drizzle-orm';

export async function rateMovie(
    movieId: number,
    rating: number
): Promise<void> {
    let response;
    const userId = await verifyUser(); // Get the logged-in user's ID

    try {
        response = await db
            .insert(testRatings)
            .values({ userId, movieId, rating })
            .onConflictDoUpdate({
                target: [testRatings.userId, testRatings.movieId], // composite primary key
                set: { rating, timestamp: sql`CURRENT_TIMESTAMP` }, // update rating at existing row
            })
            .returning();

        if (!response || !response.length) {
            throw new Error('Failed to insert or update rating.');
        }
    } catch (error) {
        console.error(
            `Error inserting or updating rating for movieId: ${movieId}.`,
            error
        );
    }
}

export async function removeMovieRating(movieId: number): Promise<void> {
    const userId = await verifyUser(); // Get the logged-in user's ID

    try {
        const response = await db
            .delete(testRatings)
            .where(
                and(
                    eq(testRatings.userId, userId),
                    eq(testRatings.movieId, movieId)
                )
            )
            .returning();
        console.log(response);

        if (!response || !response.length) {
            throw new Error('Failed to insert or update rating.');
        }
    } catch (error) {
        console.error(
            `Error inserting or updating rating for movieId: ${movieId}.`,
            error
        );
    }
}

export async function getMovieRating(movieId: number): Promise<number> {
    const userId = await verifyUser(); // Get the logged-in user's ID

    try {
        const response = await db
            .select()
            .from(testRatings)
            .where(
                and(
                    eq(testRatings.userId, userId),
                    eq(testRatings.movieId, movieId)
                )
            )
            .limit(1); // Limit to 1 result

        if (!response || !response.length) {
            return 0; // No rating found
        }

        return response[0].rating; // Return the rating
    } catch (error) {
        console.error(`Error fetching rating for movieId: ${movieId}.`, error);
        return 0; // Default value in case of error
    }
}
