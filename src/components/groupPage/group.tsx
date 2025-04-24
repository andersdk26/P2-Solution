'use server';

import { groupInfoTable } from '@/db/schema';
import { db } from 'db';
import { like } from 'drizzle-orm';

export type group = {
    groupId: number;
    groupAdmin: string;
};

export async function getGroupById(id: string): Promise<group[]> {
    // only show if written more than 1 character
    if (id.length < 1) {
        return [];
    }

    // search db for id
    const result = await db
        .select({
            groupId: groupInfoTable.groupId,
            groupAdmin: groupInfoTable.groupAdmin,
        })
        .from(groupInfoTable)
        .where(like(groupInfoTable.groupId, `${id}%`));

    return result;
}
