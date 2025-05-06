'use server';
import { randomInt } from 'crypto';
import { groupsTable } from '@/db/schema';
import { db } from '@/db/index';
import { eq } from 'drizzle-orm';
import defaultResponse from '../defaultResponse';

export async function CreateGroupId(): Promise<defaultResponse> {
    let groupId: number;
    // Generate a unique user ID
    try {
        let i = 0;
        while (true) {
            groupId = randomInt(1000000000, 4000000000);

            const groupExists = await db
                .select({ id: groupsTable.groupId })
                .from(groupsTable)
                .where(eq(groupsTable.groupId, groupId));

            if (groupExists.length === 0) {
                break;
            }

            i++;
            if (i > 10) {
                throw new Error('Could not generate group ID');
            }
        }
    } catch (error) {
        console.error('Error generating group ID:', error);
        return { status: 500, message: 'Internal server error' };
    }

    return { status: 200, object: { groupId } };
}
