'use server';

import { groupsTable } from '@/db/schema';
import { db } from 'db';
import { like } from 'drizzle-orm';

export type group = {
    groupId: number;
    groupName: string;
    groupAdmin: number;
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
        })
        .from(groupsTable)
        .where(like(groupsTable.groupId, `${id}%`));

    return result;
}
