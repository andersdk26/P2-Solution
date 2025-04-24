'use client';
import React, { JSX, useEffect, useState } from 'react';
import AdminGroupIcon from '@/components/groupPage/adminGroupIcon';
import GroupIcon from '@/components/groupPage/groupIcon';
import RequestGroupIcon from '@/components/groupPage/requestGroupIcon';
import CreateGroupIcon from '@/components/groupPage/createGroupIcon';
import SearchGroupIcon from '@/components/groupPage/searchGroupIcon';
import {
    getGroupsByAdminId,
    getRegularGroupsByMemberId,
    group,
} from '@/components/groupPage/group';
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
    // array for the groups current user is admin of
    const [AdminGroups, setAdminGroups] = useState<group[]>([]);
    // array for groups current user is a part of but NOT admin
    const [RegularGroups, setRegularGroups] = useState<group[]>([]);

    // get the groups user is admin of
    useEffect(() => {
        const getAdminGroups = async (): Promise<void> => {
            setAdminGroups(await getGroupsByAdminId(await verifyUser()));
        };
        getAdminGroups();
    }, []);

    // set the groups user is not admin of
    useEffect(() => {
        const getRegularGroups = async (): Promise<void> => {
            setRegularGroups(
                await getRegularGroupsByMemberId(await verifyUser())
            );
        };
        getRegularGroups();
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
                    <div className="inline-flex overflow-scroll">
                        {AdminGroups.map((Group) => (
                            <div key={Group.groupId}>
                                <AdminGroupIcon
                                    groupId={Group.groupId}
                                    groupName={Group.groupName}
                                    groupAdmin={Group.groupAdmin}
                                    groupMembers={Group.groupMembers}
                                    settings={Group.settings}
                                />
                            </div>
                        ))}
                        <CreateGroupIcon />
                    </div>
                </section>

                <section>
                    <h2 className="ml-4">Groups you have joined</h2>
                    <div className="inline-flex">
                        {RegularGroups.map((Group) => (
                            <div key={Group.groupId}>
                                <GroupIcon
                                    groupId={Group.groupId}
                                    groupName={Group.groupName}
                                    groupAdmin={Group.groupAdmin}
                                    groupMembers={Group.groupMembers}
                                    settings={Group.settings}
                                />
                            </div>
                        ))}
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
