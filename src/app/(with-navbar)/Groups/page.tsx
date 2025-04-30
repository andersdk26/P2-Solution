'use client';
import React, { JSX, use, useEffect, useState } from 'react';
import AdminGroupIcon from '@/components/groupPage/adminGroupIcon';
import GroupIcon from '@/components/groupPage/groupIcon';
// import RequestGroupIcon from '@/components/groupPage/requestGroupIcon';
import CreateGroupIcon from '@/components/groupPage/createGroupIcon';
import SearchGroupIcon from '@/components/groupPage/searchGroupIcon';

import {
    getGroupNameById,
    getGroupsByAdminId,
    getRegularGroupsByMemberId,
    group,
} from '@/components/groupPage/group';
import verifyUser from '@/actions/logIn/authenticateUser';
import {
    acceptGroupRequest,
    getGroupRequests,
    rejectGroupRequest,
    request,
} from '@/actions/groups/groupRequests';
import getUserById from '@/actions/friends/getUserById';
import LoadingPage from '@/components/loading';

export default function GroupSettings(): JSX.Element {
    // array for the groups current user is admin of
    const [AdminGroups, setAdminGroups] = useState<group[]>([]);
    // count for how many admin groups
    const [AdminGroupCount, setAdminGroupCount] = useState<number>(0);
    // array for groups current user is a part of but NOT admin
    const [RegularGroups, setRegularGroups] = useState<group[]>([]);
    // array for group requests.
    const [groupRequests, setGroupRequests] = useState<request[]>([]);

    // for the loading page
    const [isLoading, setIsLoading] = useState(true);

    // // state for displaying requests. this is for useEffect so that it can return JSX element
    const [DisplayRequestsList, setDisplayRequestsList] = useState([
        <p key={0}>You have no pending requests.</p>,
    ]);

    // get the groups user is admin of
    const getAdminGroups = async (): Promise<void> => {
        setAdminGroups(await getGroupsByAdminId(await verifyUser()));
    };
    useEffect(() => {
        getAdminGroups();
    }, []);

    useEffect(() => {
        setAdminGroupCount(AdminGroups.length);
    }, [AdminGroups]);

    // set the groups user is not admin of
    useEffect(() => {
        const getRegularGroups = async (): Promise<void> => {
            setRegularGroups(
                await getRegularGroupsByMemberId(await verifyUser())
            );
        };
        getRegularGroups();
    }, []);

    const getGroupRequestsA = async (): Promise<void> => {
        setGroupRequests(await getGroupRequests(await verifyUser()));
    };
    useEffect(() => {
        getGroupRequestsA();
    }, []);

    useEffect(() => {
        const updateRequestsList = async (): Promise<void> => {
            const resolvedRequests = await Promise.all(
                groupRequests.map(async (request) => (
                    <div
                        className="flex items-start align-center my-2 ml-4 space-x-2"
                        key={request.id}
                    >
                        <p className="text-xl my-auto">
                            <i>{await getUserById(request.userId)}</i> wants to
                            join{' '}
                            <b>{await getGroupNameById(request.groupId)}</b>
                        </p>
                        <button
                            className="bg-[#2ec400] hover:bg-[#259e00] text-[#ffffff] font-bold py-2 px-4 rounded-sm cursor-pointer"
                            onClick={async () => {
                                acceptGroupRequest(
                                    request.userId,
                                    request.groupId
                                );
                                getGroupRequestsA();
                                getAdminGroups();
                                alert(`You accepted the request`);
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold py-2 px-4 relative rounded-sm cursor-pointer"
                            onClick={async () => {
                                rejectGroupRequest(
                                    request.userId,
                                    request.groupId
                                );
                                getGroupRequestsA();
                                alert('You declined the request');
                            }}
                        >
                            Decline
                        </button>
                    </div>
                ))
            );
            setDisplayRequestsList(resolvedRequests);
        };
        setIsLoading(false);
        updateRequestsList();
    }, [groupRequests]);

    if (isLoading) return <LoadingPage />;

    return (
        <>
            <div>
                <h1>Groups</h1>
                <section>
                    <h2 className="ml-4">Your groups</h2>
                    <p className="text-2xl ml-4">
                        <i>
                            You are the admin. Only you can add or remove
                            members.{' '}
                        </i>
                        ({AdminGroupCount}/5)
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
                        <CreateGroupIcon adminGroupNumber={AdminGroupCount} />
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
                        <i>
                            Here you can accept or decline incoming requests
                            from other users that want to join one of your
                            groups
                        </i>
                    </p>
                    <div>{DisplayRequestsList}</div>
                </section>
            </div>
        </>
    );
}
