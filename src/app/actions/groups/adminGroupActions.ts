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
    await db
        .update(groupsTable)
        .set({ members: `${groupMembers}|${addedUserId}` })
        .where(
            // the group id and that the user id does not already exist in group members
            and(
                eq(groupsTable.groupId, groupId),
                not(like(groupsTable.groupName, `${addedUserId}`))
            )
        );

    console.log(addedUserId);
    console.log('User added to group');
}

export async function DeleteGroup(groupId: number): Promise<void> {
    await db.delete(groupsTable).where(eq(groupsTable.groupId, groupId));
}
