'use server';

import { db } from '@/db/index';
import { ratingsTable } from '@/db/schema';
import verifyUser from '../logIn/authenticateUser';
import { and, eq, sql } from 'drizzle-orm';

export async function rateMovie(
    movieId: number,
    rating: number
): Promise<void> {
    let response;
    const userId = await verifyUser(); // Get the logged-in user's ID

    try {
        // MySQL
        response = await db
            .insert(ratingsTable)
            .values({ userId, movieId, rating })
            .onDuplicateKeyUpdate({
                set: { rating, timestamp: sql`CURRENT_TIMESTAMP` }, // update rating at existing row
            })
            .execute();
        // // SQLite
        // response = await db
        // .insert(ratingsTable)
        // .values({ userId, movieId, rating })
        // .onConflictDoUpdate({
        //     target: [ratingsTable.userId, ratingsTable.movieId], // composite primary key
        //     set: { rating, timestamp: sql`CURRENT_TIMESTAMP` }, // update rating at existing row
        // })
        // .returning();

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
            .delete(ratingsTable)
            .where(
                and(
                    eq(ratingsTable.userId, userId),
                    eq(ratingsTable.movieId, movieId)
                )
            )
            .execute();
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
            .from(ratingsTable)
            .where(
                and(
                    eq(ratingsTable.userId, userId),
                    eq(ratingsTable.movieId, movieId)
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
