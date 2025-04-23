'use server';
import { db } from '@/db/index';
import { friendsTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function GetFriendRequest(userID: number): Promise<
    {
        from: number;
    }[]
> {
    const friendRequests = await db
        .select({ from: friendsTable.userIdA })
        .from(friendsTable)
        .where(
            and(eq(friendsTable.userIdB, userID), eq(friendsTable.status, 0))
        );
    console.log(await friendRequests);

    return friendRequests;
}

export async function SendFriendRequest(
    userIDSender: number,
    userIDReceiver: number
): Promise<null> {
    await db
        .insert(friendsTable)
        .values({ userIdA: userIDSender, userIdB: userIDReceiver, status: 0 });

    return null;
}

export async function AcceptFriendRequest(
    userIDSender: number,
    userIDReceiver: number
): Promise<null> {
    await db
        .update(friendsTable)
        .set({ status: 1 })
        .where(
            and(
                eq(friendsTable.userIdA, userIDSender),
                eq(friendsTable.userIdB, userIDReceiver)
            )
        );

    return null;
}
