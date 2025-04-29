'use server';

import { CreateGroupId } from '@/components/db/groupAuth';

interface groupIdResponse {
    status: number;
    message?: string;
    object?: { groupId?: number };
}

export async function FetchGroupId(): Promise<number> {
    // Register the user
    const response: Promise<groupIdResponse> = CreateGroupId();

    // Check if the user was registered
    if ((await response).status !== 200) {
        console.log((await response).message);
        return -1;
    }

    // Check if the user ID is returned
    if (
        (await response).object === undefined ||
        (await response).object?.groupId === undefined
    ) {
        return -1;
    }

    return (await response).object?.groupId || -1;
}
