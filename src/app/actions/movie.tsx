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
    const sql = `SELECT title FROM movies_fts WHERE title MATCH "${splitQuery(searchQuery)}" LIMIT 10`;

    // Fetch results.
    const result = await db.all<{ title: string }>(sql);

    // Return string array of movie titles.
    return result.map((row) => row.title);
}

function splitQuery(searchQuery: string): string {
    // Initialise return string.
    let result = '';

    // Split search query into terms.
    const terms = searchQuery.split(' ');

    // Add each term to a string, followed by an asterisk to label it as a prefix.
    for (const term of terms) {
        result = `${result} ${term}*`;
    }

    // Return the trimmed string as new search query.
    return result.trim();
}
