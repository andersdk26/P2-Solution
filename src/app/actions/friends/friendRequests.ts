'use server';
import { db } from '@/db/index';
import { friendsTable } from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';

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
    console.log(friendRequests);

    return friendRequests;
}

export async function SendFriendRequest(
    userIDSender: number,
    userIDReceiver: number
): Promise<number> {
    // Check if sender and receiver are already friends.
    const verify = await db
        .select()
        .from(friendsTable)
        .where(
            or(
                and(
                    eq(friendsTable.userIdA, userIDSender),
                    eq(friendsTable.userIdB, userIDReceiver)
                ),
                and(
                    eq(friendsTable.userIdA, userIDReceiver),
                    eq(friendsTable.userIdB, userIDSender)
                )
            )
        );

    if (verify.length > 0) {
        if (verify[0].status === 0) {
            // If a row where the sender and receiver have a pending friend request, return 0.
            return 0;
        } else if (verify[0].status === 1) {
            // If a row where the sender and receiver are confirmed friends is found, then return -1.
            return -1;
        }
    }

    // Otherwise, insert friend request with pending status.
    await db
        .insert(friendsTable)
        .values({ userIdA: userIDSender, userIdB: userIDReceiver, status: 0 });

    return 1;
}

export async function AcceptFriendRequest(
    userIDSender: number,
    userIDReceiver: number
): Promise<void> {
    await db
        .update(friendsTable)
        .set({ status: 1 })
        .where(
            and(
                eq(friendsTable.userIdA, userIDSender),
                eq(friendsTable.userIdB, userIDReceiver)
            )
        );
}

export async function DeclineFriendRequest(
    userIDSender: number,
    userIDReceiver: number
): Promise<void> {
    await db
        .delete(friendsTable)
        .where(
            and(
                eq(friendsTable.userIdA, userIDSender),
                eq(friendsTable.userIdB, userIDReceiver)
            )
        );
}

export async function RemoveFriend(
    removerId: number,
    friendToBeRemovedId: number
): Promise<void> {
    await db
        .delete(friendsTable)
        .where(
            or(
                and(
                    eq(friendsTable.userIdA, removerId),
                    eq(friendsTable.userIdB, friendToBeRemovedId)
                ),
                and(
                    eq(friendsTable.userIdA, friendToBeRemovedId),
                    eq(friendsTable.userIdB, removerId)
                )
            )
        );
}
