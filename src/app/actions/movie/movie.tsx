'use server';

import { moviesTable } from '@/db/schema';
import { db } from 'db';
import { eq } from 'drizzle-orm';

export type movie = {
    movieId: number;
    movieTitle: string;
    movieGenres: string;
};

export type movieWithRating = {
    movieId: number;
    title: string;
    genres: string;
    accumulativeRating: number;
    timesRated: number;
};

export async function getMovieById(id: number): Promise<movie | null> {
    const result = await db
        .select({
            movieId: moviesTable.id,
            movieTitle: moviesTable.title,
            movieGenres: moviesTable.genres,
        })
        .from(moviesTable)
        .where(eq(moviesTable.id, id));

    if (result.length === 0) {
        return null;
    }

    return result[0];
}

export async function searchForMovie(
    searchQuery: string,
    amount: number
): Promise<movie[]> {
    // Trim search query.
    searchQuery = searchQuery.trim();

    // Sanitise search query.
    searchQuery = searchQuery.replace(/[^a-zA-Z0-9 ]/g, ' ');

    // Only search if query is at least 1 letter long.
    if (searchQuery.length < 1) {
        return [];
    }

    // Define sql query using Full-Text Search. Limited to 10 results.
    // MySQL
    const sql = `SELECT id, title, genres FROM movies WHERE MATCH(title) AGAINST ('${splitQuery(searchQuery)}' IN NATURAL LANGUAGE MODE) LIMIT ${amount};`;
    // // SQLite
    // const sql = `SELECT id, title, genres FROM movies_fts WHERE title MATCH "${splitQuery(searchQuery)}" LIMIT ${amount}`;

    // Fetch results.
    // MySQL
    const queryResult = await db.execute(sql);
    const result = queryResult as unknown as {
        id: number;
        title: string;
        genres: string;
    }[];
    // // SQLite
    // const result = await db.all<{ id: number; title: string; genres: string }>(
    //     sql
    // );

    // Return string array of movie titles.
    return result.map((row) => ({
        movieId: row.id,
        movieTitle: row.title,
        movieGenres: row.genres,
    }));
}

function splitQuery(searchQuery: string): string {
    // Initialise return string.
    let result = '';

    // Split search query into terms.
    const terms = searchQuery.split(' ');

    // Add each term to a string, followed by an asterisk to label it as a prefix.
    for (const term of terms) {
        if (term.length > 0) {
            result = `${result} ${term}*`;
        }
    }

    // Return the trimmed string as new search query.
    return result.trim();
}
