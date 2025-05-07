'use server';
import { db } from '@/db/index';
import { groupRequestsTable, groupsTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { AddUserToGroup } from './adminGroupActions';

// request type, the requester and the received group. and row id in the db
export type request = {
    userId: number;
    groupId: number;
    id: number;
};

// create a row in the requests table of the user and the group
export async function requestToJoinGroup(
    userId: number,
    groupId: number
): Promise<void> {
    // Check if user has already requested to join the group, then select nothing.
    const verify = await db
        .select()
        .from(groupRequestsTable)
        .where(
            and(
                eq(groupRequestsTable.userId, userId),
                eq(groupRequestsTable.groupId, groupId)
            )
        );

    // check if user is admin, select nothing
    const checkAdmin = await db
        .select()
        .from(groupsTable)
        .where(eq(groupsTable.adminId, userId));

    // If not, make request.
    if (!verify.length && !checkAdmin.length) {
        await db.insert(groupRequestsTable).values({ userId, groupId });
    }
}

// find the groups with the admin id and return them as a request type array
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

// add the user to the group and remove the request from db table
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

    // Delete request row from db.
    await db
        .delete(groupRequestsTable)
        .where(
            and(
                eq(groupRequestsTable.userId, userId),
                eq(groupRequestsTable.groupId, groupId)
            )
        );
}

// delete the request row for that user and group id
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
