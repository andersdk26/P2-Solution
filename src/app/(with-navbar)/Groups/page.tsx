'use client';
import React, { JSX } from 'react';
import AdminGroupIcon from '@/components/groupPage/adminGroupIcon';
import GroupIcon from '@/components/groupPage/groupIcon';
import RequestGroupIcon from '@/components/groupPage/requestGroupIcon';
import CreateGroupIcon from '@/components/groupPage/createGroupIcon';
import SearchGroupIcon from '@/components/groupPage/searchGroupIcon';
import { group } from '@/components/groupPage/group';

const tempGroup: group = {
    groupId: 12345,
    groupName: 'TobiasOgAnders',
    groupAdmin: 6050670358,
    groupMembers: '6050670358 | 8271494205 | 6565229868',
    settings: '🎥|#9fa3d1|#282f72',
};

const tempGroup2: group = {
    groupId: 12345,
    groupName: 'TobiasOgAnders',
    groupAdmin: 6050670358,
    groupMembers: '6050670358 | 8271494205 | 6565229868',
    settings: '🍿|#ffffff|#000000',
};

const GroupSettings = (): JSX.Element => (
    <div>
        <h1>Groups</h1>
        <section>
            <h2 className="ml-4">Your groups</h2>
            <p className="text-2xl ml-4">
                <i>You are admin</i>
            </p>
            <div className="table-row overflow-scroll">
                <AdminGroupIcon group={tempGroup} />
                <AdminGroupIcon group={tempGroup2} />

                <CreateGroupIcon />
            </div>
        </section>

        <section>
            <h2 className="ml-4">Groups you have joined</h2>
            <div className="table-row">
                <GroupIcon group={tempGroup2} />
                <SearchGroupIcon />
            </div>
        </section>

        <section>
            <h2 className="ml-4">Requests...</h2>
            <p className="text-2xl ml-4">Groups that have asked you to join</p>
            <RequestGroupIcon group={tempGroup2} />
        </section>
    </div>
);
export default GroupSettings;
