'use client';
import React, { JSX, useEffect, useState } from 'react';
import AdminGroupIcon from '@/components/groupPage/adminGroupIcon';
import GroupIcon from '@/components/groupPage/groupIcon';
import RequestGroupIcon from '@/components/groupPage/requestGroupIcon';
import CreateGroupIcon from '@/components/groupPage/createGroupIcon';
import SearchGroupIcon from '@/components/groupPage/searchGroupIcon';
import { getGroupByAdminId, group } from '@/components/groupPage/group';
import verifyUser from '@/actions/logIn/authenticateUser';

const tempGroup: group = {
    groupId: 12345,
    groupName: 'TobiasOgAnders',
    groupAdmin: 6050670358,
    groupMembers: '6050670358|8271494205|6565229868',
    settings: '🎥|#9fa3d1|#282f72',
};

const tempGroup2: group = {
    groupId: 12345,
    groupName: 'TobiasOgAnders',
    groupAdmin: 6050670358,
    groupMembers: '6050670358|8271494205|6565229868',
    settings: '🍿|#ffffff|#000000',
};

export default function GroupSettings(): JSX.Element {
    const [AdminGroups, setAdminGroups] = useState<group[]>([]);

    useEffect(() => {
        const getAdminGroups = async (): Promise<void> => {
            setAdminGroups(await getGroupByAdminId(await verifyUser()));
        };
        getAdminGroups();
        console.log(AdminGroups);
    }, []);

    return (
        <>
            <div>
                <h1>Groups</h1>
                <section>
                    <h2 className="ml-4">Your groups</h2>
                    <p className="text-2xl ml-4">
                        <i>You are admin</i>
                    </p>
                    <div className="table-row overflow-scroll">
                        {/* <AdminGroupIcon group={tempGroup} />
                        <AdminGroupIcon group={tempGroup2} /> */}

                        {AdminGroups.map((AdminGroup) => {
                            <AdminGroupIcon group={AdminGroup} />;
                        })}
                        <CreateGroupIcon />
                    </div>
                </section>

                <section>
                    <h2 className="ml-4">Groups you have joined</h2>
                    <div className="table-row">
                        <GroupIcon
                            groupId={tempGroup2.groupId}
                            groupName={tempGroup2.groupName}
                            groupAdmin={tempGroup2.groupAdmin}
                            groupMembers={tempGroup2.groupMembers}
                            settings={tempGroup2.settings}
                        />
                        <SearchGroupIcon />
                    </div>
                </section>

                <section className="min-h-90">
                    <h2 className="ml-4">Requests...</h2>
                    <p className="text-2xl ml-4">
                        Groups that have asked you to join
                    </p>
                    <RequestGroupIcon
                        groupId={tempGroup.groupId}
                        groupName={tempGroup.groupName}
                        groupAdmin={tempGroup.groupAdmin}
                        groupMembers={tempGroup.groupMembers}
                        settings={tempGroup.settings}
                    />
                </section>
            </div>
        </>
    );
}
