'use server';
import { db } from '@/db/index';
import { groupRequestsTable, groupsTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { AddUserToGroup } from './adminGroupActions';

export type request = {
    userId: number;
    groupId: number;
    id: number;
};

export async function requestToJoinGroup(
    userId: number,
    groupId: number
): Promise<void> {
    // Check if user has already requested to join the group.
    const verify = await db
        .select()
        .from(groupRequestsTable)
        .where(
            and(
                eq(groupRequestsTable.userId, userId),
                eq(groupRequestsTable.groupId, groupId)
            )
        );

    // check if user is admin
    const checkAdmin = await db
        .select()
        .from(groupsTable)
        .where(eq(groupsTable.adminId, userId));

    // If not, make request.
    if (!verify.length && !checkAdmin.length) {
        await db.insert(groupRequestsTable).values({ userId, groupId });
    }
}

export async function getGroupRequests(adminId: number): Promise<request[]> {
    // Fetch all group IDs that are owned by the admin.
    const groupsOwnedByAdmin = await db
        .select({ groupId: groupsTable.groupId })
        .from(groupsTable)
        .where(eq(groupsTable.adminId, adminId));

    // Declare array for storing requests.
    let requests: request[] = [];

    // Fetch requests for each group.
    for (const group of groupsOwnedByAdmin) {
        requests = requests.concat(
            await db
                .select({
                    userId: groupRequestsTable.userId,
                    groupId: groupRequestsTable.groupId,
                    id: groupRequestsTable.id,
                })
                .from(groupRequestsTable)
                .where(eq(groupRequestsTable.groupId, group.groupId))
        );
    }

    // Return array of group requests.
    return requests;
}

export async function acceptGroupRequest(
    userId: number,
    groupId: number
): Promise<void> {
    // Fetch existing group members.
    const existingMembers = await db
        .select({ members: groupsTable.members })
        .from(groupsTable)
        .where(eq(groupsTable.groupId, groupId));

    // Call function to add member to group.
    AddUserToGroup(groupId, existingMembers[0].members, userId);

    // Delete request from db.
    await db
        .delete(groupRequestsTable)
        .where(
            and(
                eq(groupRequestsTable.userId, userId),
                eq(groupRequestsTable.groupId, groupId)
            )
        );
}

export async function rejectGroupRequest(
    userId: number,
    groupId: number
): Promise<void> {
    // Delete request from db.
    await db
        .delete(groupRequestsTable)
        .where(
            and(
                eq(groupRequestsTable.userId, userId),
                eq(groupRequestsTable.groupId, groupId)
            )
        );
}
