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
import GroupToast from '@/components/toast/toast';

export default function GroupSettings(): JSX.Element {
    // array for the groups current user is admin of
    const [AdminGroups, setAdminGroups] = useState<group[]>([]);
    // count for how many admin groups
    const [AdminGroupCount, setAdminGroupCount] = useState<number>(0);
    // array for groups current user is a part of but NOT admin
    const [RegularGroups, setRegularGroups] = useState<group[]>([]);
    // array for group requests.
    const [groupRequests, setGroupRequests] = useState<request[]>([]);
    // state for displaying requests. this is for useEffect so that it can return JSX element
    const [DisplayRequestsList, setDisplayRequestsList] = useState([
        <p key={0}>You have no pending requests.</p>,
    ]);

    // states to keep track of the 4 types of states.
    // at end of each call, set loading state to false.
    // show the page
    const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
    const [isLoadingCount, setIsLoadingCount] = useState(true);
    const [isLoadingRegular, setIsLoadingRegular] = useState(true);
    const [isLoadingRequest, setIsLoadingRequest] = useState(true);
    const [isLoadingDisplay, setIsLoadingDisplay] = useState(true);

    // Toast message for success/error and is used to show a toast message when an action is performed
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    // get the groups user is admin of
    const getAdminGroups = async (): Promise<void> => {
        setAdminGroups(await getGroupsByAdminId(await verifyUser()));
        // set the loading to false
        setIsLoadingAdmin(false);
    };

    useEffect(() => {
        getAdminGroups();
    }, []);

    useEffect(() => {
        // set the loading to true, so only final iteration sets to false
        setIsLoadingCount(true);
        setAdminGroupCount(AdminGroups.length);
        // set the loading to false
        setIsLoadingCount(false);
    }, [AdminGroups]);

    // set the groups user is not admin of
    const getRegularGroups = async (): Promise<void> => {
        setRegularGroups(await getRegularGroupsByMemberId(await verifyUser()));
    };
    useEffect(() => {
        getRegularGroups();
        // set the loading to false
        setIsLoadingRegular(false);
    }, []);

    const getGroupRequestsA = async (): Promise<void> => {
        // returns an array of the object "request", which is group ID and the requester's ID
        // groupID is from groups where current user is Admin
        setGroupRequests(await getGroupRequests(await verifyUser()));
        // set the loading to false
        setIsLoadingRequest(false);
    };
    useEffect(() => {
        getGroupRequestsA();
    }, []);

    useEffect(() => {
        const updateRequestsList = async (): Promise<void> => {
            // set to true at each iteration, so it ends with false by the final
            setIsLoadingDisplay(true);
            const resolvedRequests = await Promise.all(
                groupRequests.map(async (request) => (
                    <div
                        className="flex items-start align-center my-2 ml-4 space-x-2"
                        key={request.id}
                    >
                        <p className="text-xl my-auto">
                            {/* prints the specific user Id */}
                            <i>{await getUserById(request.userId)}</i> wants to
                            join {/* prints the specific group name */}
                            <b>{await getGroupNameById(request.groupId)}</b>
                        </p>
                        <button
                            className="bg-[#2ec400] hover:bg-[#259e00] text-[#ffffff] font-bold py-2 px-4 rounded-sm cursor-pointer"
                            onClick={async () => {
                                await acceptGroupRequest(
                                    //
                                    request.userId,
                                    request.groupId
                                );
                                // calls the functions that updates the array of requests, and the admin groups
                                getGroupRequestsA();
                                getAdminGroups();
                                setToast({
                                    message: `You accepted the request`,
                                    type: 'error',
                                });
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold py-2 px-4 relative rounded-sm cursor-pointer"
                            onClick={async () => {
                                await rejectGroupRequest(
                                    // finds the specific group, and deletes it from db
                                    request.userId,
                                    request.groupId
                                );
                                getGroupRequestsA(); // calls the functions that update the array of requests
                                setToast({
                                    message: 'You declined the request',
                                    type: 'error',
                                });
                            }}
                        >
                            Decline
                        </button>
                    </div>
                ))
            );

            setDisplayRequestsList(resolvedRequests);
            // set the loading to false
            setIsLoadingDisplay(false);
        };

        updateRequestsList();
    }, [groupRequests]);

    if (
        isLoadingAdmin ||
        isLoadingCount ||
        isLoadingDisplay ||
        isLoadingRegular ||
        isLoadingRequest
    )
        return <LoadingPage />;

    return (
        <>
            {/* Toast message */}
            {toast && (
                <GroupToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
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
                        {AdminGroups.map(
                            (
                                Group // maps through all the groups where you are admin
                            ) => (
                                <div key={Group.groupId}>
                                    <AdminGroupIcon
                                        groupId={Group.groupId}
                                        groupName={Group.groupName}
                                        groupAdmin={Group.groupAdmin}
                                        groupMembers={Group.groupMembers}
                                        settings={Group.settings}
                                    />
                                </div>
                            )
                        )}
                        <CreateGroupIcon adminGroupNumber={AdminGroupCount} />
                    </div>
                </section>

                <section>
                    <h2 className="ml-4">Groups you have joined</h2>
                    <div className="inline-flex">
                        {RegularGroups.map(
                            (
                                Group // maps through all the groups you are NOT admin of, but member
                            ) => (
                                <div key={Group.groupId}>
                                    <GroupIcon
                                        groupId={Group.groupId}
                                        groupName={Group.groupName}
                                        groupAdmin={Group.groupAdmin}
                                        groupMembers={Group.groupMembers}
                                        settings={Group.settings}
                                    />
                                </div>
                            )
                        )}
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
