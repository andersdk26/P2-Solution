'use server';
import { db } from '@/db/index';
import { friendsTable } from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';

// returns number array of user id's that are friends (status 1) with the input userID.
export async function GetFriends(userID: number): Promise<number[]> {
    const friendsObj = await db
        .select({ IdA: friendsTable.userIdA, IdB: friendsTable.userIdB })
        .from(friendsTable)
        .where(
            and(
                or(
                    eq(friendsTable.userIdA, userID),
                    eq(friendsTable.userIdB, userID)
                ),
                eq(friendsTable.status, 1)
            )
        );

    // checks if it has found something, if not return empty array
    if (!friendsObj || !friendsObj.length) {
        return [];
    }

    // only returns the id that is not user. so if userID is IdB, then it returns idA
    const friends = friendsObj.map((obj) =>
        obj.IdA === userID ? obj.IdB : obj.IdA
    );

    return friends;
}
