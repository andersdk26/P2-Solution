'use server';

import { usersTable } from '@/db/schema';
import { db } from 'db';
import { like } from 'drizzle-orm';

export type user = {
    userId: number;
    userName: string;
};

export async function getUserById(id: string): Promise<user[]> {
    // only show if written more than 1 character
    if (id.length < 1) {
        return [];
    }

    // search db for id
    const result = await db
        .select({
            userId: usersTable.id,
            userName: usersTable.username,
        })
        .from(usersTable)
        .where(like(usersTable.id, `${id}%`));

    return result;
}

// export async function searchForUsers(
//     searchQuery: string,
//     amount: number
// ): Promise<user[]> {
//     // Trim search query.
//     searchQuery = searchQuery.trim();

//     // Sanitise search query.
//     searchQuery = searchQuery.replace(/[^a-zA-Z0-9 ]/g, ' ');

//     // Only search if query is at least 1 letter long.
//     if (searchQuery.length < 1) {
//         return [];
//     }

//     // Define sql query using Full-Text Search. Limited to 10 results.
//     const sql = `SELECT id, username FROM users WHERE username MATCH "${splitQuery(searchQuery)}" LIMIT ${amount}`;

//     // Fetch results.
//     const result = await db.all<{ id: number; username: string }>(sql);

//     // Return string array of movie titles.
//     return result.map((row) => ({
//         userId: row.id,
//         userName: row.username,
//     }));
// }

// function splitQuery(searchQuery: string): string {
//     // Initialise return string.
//     let result = '';

//     // Split search query into terms.
//     const terms = searchQuery.split(' ');

//     // Add each term to a string, followed by an asterisk to label it as a prefix.
//     for (const term of terms) {
//         if (term.length > 0) {
//             result = `${result} ${term}*`;
//         }
//     }

//     // Return the trimmed string as new search query.
//     return result.trim();
// }
