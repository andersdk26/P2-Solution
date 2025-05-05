'use server';

import getUserById from '@/actions/friends/getUserById';
import verifyUser from '@/actions/logIn/authenticateUser';
import { groupsTable } from '@/db/schema';
import { db } from 'db';
import { eq, like, ne, and, or } from 'drizzle-orm';

export type group = {
    groupId: number;
    groupName: string;
    groupAdmin: number;
    groupMembers: string;
    settings: string;
};

export async function getGroupById(id: string): Promise<group[]> {
    // only show if written more than 1 character
    if (id.length < 1) {
        return [];
    }

    // search db for id
    const result = await db
        .select({
            groupId: groupsTable.groupId,
            groupName: groupsTable.groupName,
            groupAdmin: groupsTable.adminId,
            groupMembers: groupsTable.members,
            settings: groupsTable.settings,
        })
        .from(groupsTable)
        .where(
            or(
                like(groupsTable.groupId, `${id}%`),
                like(groupsTable.groupName, `${id}%`)
            )
        );

    return result;
}

export async function getGroupNameById(id: number): Promise<string> {
    // search db for id
    const result = await db
        .select({
            groupName: groupsTable.groupName,
        })
        .from(groupsTable)
        .where(eq(groupsTable.groupId, id));

    return result[0].groupName;
}

export async function getGroupsByAdminId(id: number): Promise<group[]> {
    // search db for id, admin id and current user id is the same
    const result = await db
        .select({
            groupId: groupsTable.groupId,
            groupName: groupsTable.groupName,
            groupAdmin: groupsTable.adminId,
            groupMembers: groupsTable.members,
            settings: groupsTable.settings,
        })
        .from(groupsTable)
        .where(eq(groupsTable.adminId, id));

    return result;
}

//return array with groups that part of but not admin
export async function getRegularGroupsByMemberId(id: number): Promise<group[]> {
    // search db for id
    const result = await db
        .select({
            groupId: groupsTable.groupId,
            groupName: groupsTable.groupName,
            groupAdmin: groupsTable.adminId,
            groupMembers: groupsTable.members,
            settings: groupsTable.settings,
        })
        .from(groupsTable)
        .where(
            and(
                like(groupsTable.members, `%${id}%`),
                ne(groupsTable.adminId, id)
            )
        );

    return result;
}
