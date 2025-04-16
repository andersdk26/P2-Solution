'use server';

import { db } from '@/db/index';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// this async function fetches a user's profile icon URL from the database
// it takes the users ID that is loged in and returns the profileIcon URL under the table users
export default async function getProfileIcon(
    id: number | Promise<number>
): Promise<string> {
    const resolvedId = await id;

    // query the database to get the users profileIcon using the resolved ID
    const result = await db
        .select({ profileIcon: usersTable.profileIcon }) // only select the profileIcon column
        .from(usersTable) // from the users table
        .where(eq(usersTable.id, resolvedId)); // where the user ID matches

    // If the query didn't return any user, throw an error
    if (result.length === 0) {
        throw new Error(`No user found with ID ${resolvedId}`);
    }

    // Return the profile icon URL from the query result
    // if it's null or undefined (like if the user has no profileIcon url in the database)
    // use a fallback default icon (in this case cornpop.png)
    return result[0].profileIcon || '/img/profileSettingIcons/cornpop.png';
}
