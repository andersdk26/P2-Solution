'use server';

import { db } from 'db';
//import { moviesTable } from 'db/schema';

export type movie = {
    movieId: number;
    movieTitle: string;
    movieGenres: string[];
};

export async function searchForMovie(searchQuery: string): Promise<string[]> {
    // Trim search query.
    searchQuery = searchQuery.trim();

    // Sanitise search query.
    searchQuery = searchQuery.replace(/[^a-zA-Z0-9 ]/g, '');

    // Only search if query is at least 1 letter long.
    if (searchQuery.length < 1) {
        return [];
    }

    // Define sql query using Full-Text Search. Limited to 10 results.
    const sql = `SELECT title FROM movies_fts WHERE title MATCH "${searchQuery}*" LIMIT 10`;

    // Fetch results.
    const result = await db.all<{ title: string }>(sql);

    // Return string array of movie titles.
    return result.map((row) => row.title);
}
