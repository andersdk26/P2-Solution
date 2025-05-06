'use server';
import { db } from '@/db/index';
import { friendsTable } from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';

// gets user id number, and checks if receiver is user and the friendstable status is 0: pending
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

    // returns array with all user id's that has sent request to input user id
    return friendRequests;
}

// creates a row in the db, where userIDA is sender, userIDB is receiver. set status to 0 for "pending"
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

// change the status to 1 for "accepted". user A is sender, user B is receiver
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

// deletes row where the sender is user A and receiver is user B
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

// delete row where user A or B is either current user (remover ID) or the other user (friend to be removed id)
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
