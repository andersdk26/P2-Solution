'use server';
import { db } from '@/db/index';
import { friendsTable } from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';

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

    if (!friendsObj || !friendsObj.length) {
        return [];
    }

    const friends = friendsObj.map((obj) =>
        obj.IdA === userID ? obj.IdB : obj.IdA
    );

    return friends;
}
