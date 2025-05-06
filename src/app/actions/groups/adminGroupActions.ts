'use server';

import { db } from '@/db/index';
import { groupsTable } from '@/db/schema';
import { and, eq, like, not } from 'drizzle-orm';

// Add user to group
export async function AddUserToGroup(
    groupId: number,
    groupMembers: string,
    addedUserId: number
): Promise<void> {
    // count members in the string. if more than 8, do not add more
    const memberCount = groupMembers.split('|').length;
    if (memberCount >= 8) {
        return;
    }
    await db
        .update(groupsTable)
        .set({ members: `${groupMembers}|${addedUserId}` })
        .where(
            // the group id and that the user id does not already exist in group members
            and(
                eq(groupsTable.groupId, groupId),
                not(like(groupsTable.groupName, `$${addedUserId}$`))
            )
        );

    console.log(addedUserId);
    console.log('User added to group');
}

export async function DeleteGroup(groupId: number): Promise<void> {
    await db.delete(groupsTable).where(eq(groupsTable.groupId, groupId));
}

export async function ChangeDbGroupSettings(
    groupId: number,
    newSettings: string
): Promise<void> {
    await db
        .update(groupsTable)
        .set({ settings: newSettings })
        .where(eq(groupsTable.groupId, groupId));
}

export async function ChangeDbGroupName(
    groupId: number,
    newGroupName: string
): Promise<void> {
    await db
        .update(groupsTable)
        .set({ groupName: newGroupName })
        .where(eq(groupsTable.groupId, groupId));
}

export async function RemoveMemberFromDb(
    userId: string,
    groupMembers: string,
    groupId: number
): Promise<void> {
    //Remove the string with user id from string
    const newMemberString = groupMembers.replace(`|${userId}`, '');

    await db
        .update(groupsTable)
        .set({ members: newMemberString })
        .where(eq(groupsTable.groupId, groupId));
}
