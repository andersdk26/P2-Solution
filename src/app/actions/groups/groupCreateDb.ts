'use server';

import { group } from '@/components/groupPage/group';
import { db } from '@/db/index';
import { groupsTable } from '@/db/schema';

//creates a row in the groupstable with all the group values
export async function GroupCreateDb(group: group): Promise<void> {
    if (group.groupId === -1) {
        throw new Error('Group Id is -1');
    }

    await db.insert(groupsTable).values({
        groupId: group.groupId,
        groupName: group.groupName,
        adminId: group.groupAdmin,
        members: group.groupMembers,
        settings: group.settings,
    });
}
