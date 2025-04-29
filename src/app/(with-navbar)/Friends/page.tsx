'use client';
import React, { JSX, useEffect, useState } from 'react';
import { SearchFriends } from '@/components/Profile/Friends/searchFriends';
import {
    AcceptFriendRequest,
    DeclineFriendRequest,
    GetFriendRequest,
    RemoveFriend,
} from '@/actions/friends/friendRequests';
import verifyUser from '@/actions/logIn/authenticateUser';
import getUserById from '@/actions/friends/getUserById';
import getUserID from '@/actions/logIn/userID';
import { GetFriends } from '@/actions/friends/friendsList';

export default function Friends(): JSX.Element {
    const [FriendRequests, setFriendRequests] = useState<{ from: number }[]>(
        []
    );
    const [friendRequestList, setFriendRequestList] = useState([
        <p className="text-[#282f72]" key={0}>
            You have no pending friend requests.
        </p>,
    ]);
    const [FriendsList, setFriendsList] = useState<number[]>([]);
    const [friendsListObject, setFriendsListObject] = useState([
        <p className="ml-4 text-[#282f72]" key={0}>
            No friends to show.
        </p>,
    ]);

    const getFriendRequests = async (): Promise<void> => {
        setFriendRequests(await GetFriendRequest(await verifyUser()));
    };

    useEffect(() => {
        getFriendRequests();
    }, []);

    useEffect(() => {
        const updateFriendRequestList = async (): Promise<void> => {
            const resolvedRequests = await Promise.all(
                FriendRequests.map(async (request) => (
                    <div
                        className="flex items-center space-x-2 bg-[#9fa3d1] mb-4 p-4 rounded-sm"
                        key={request.from}
                    >
                        <p className="my-auto w-64 py-4">
                            {await getUserById(request.from)}
                        </p>
                        <button
                            className="bg-[#2ec400] hover:bg-[#259e00] text-[#ffffff] font-bold py-2 px-4 rounded-sm cursor-pointer"
                            onClick={async () => {
                                AcceptFriendRequest(
                                    request.from,
                                    await verifyUser()
                                );
                                getFriendRequests();
                                getFriendsList();
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold py-2 px-4 relative rounded-sm cursor-pointer"
                            onClick={async () => {
                                DeclineFriendRequest(
                                    request.from,
                                    await verifyUser()
                                );
                                getFriendRequests();
                            }}
                        >
                            Decline
                        </button>
                    </div>
                ))
            );
            setFriendRequestList(resolvedRequests);
        };
        updateFriendRequestList();
    }, [FriendRequests]);

    const getFriendsList = async (): Promise<void> => {
        setFriendsList(await GetFriends(await verifyUser()));
    };

    useEffect(() => {
        getFriendsList();
    }, []);

    useEffect(() => {
        const updateFriendList = async (): Promise<void> => {
            if (!FriendsList.length) {
                return;
            }

            const resolvedFriends = await Promise.all(
                FriendsList.map(async (id) => (
                    <div
                        className="flex items-center space-x-2 bg-[#9fa3d1] mr-25 mb-4 p-4 rounded-sm" //HERRRRRRR
                        key={id}
                    >
                        <p className="ml-4 my-auto w-64 py-4">
                            {await getUserById(id)}
                        </p>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold my-auto py-2 px-4 mr-2 ml-auto relative rounded-sm cursor-pointer"
                            onClick={async () => {
                                RemoveFriend(await verifyUser(), id);
                                alert(
                                    `${await getUserById(id)} has been removed from your friends!`
                                );
                                getFriendsList();
                            }}
                        >
                            Remove friend
                        </button>
                    </div>
                ))
            );
            setFriendsListObject(resolvedFriends);
        };
        updateFriendList();
    }, [FriendsList]);

    return (
        <>
            {/* entire page section */}
            <section className="p-8">
                <section className="ml-100 mr-100 p-1 rounded-sm bg-[#9fa3d1]">
                    {/* your friends section */}
                    <section className="h-auto m-4 p-4 bg-[#babdde] rounded-sm">
                        <h2>Your friends</h2>
                        <p className="ml-4 text-[#282f72]">
                            Here you can view and manage your friends.
                        </p>
                        <div className="pl-4 pt-4 text-[#282f72]">
                            {friendsListObject}
                        </div>
                    </section>

                    {/* searching for users section */}
                    <section className="h-80 p-4 m-4 bg-[#babdde] rounded-sm">
                        <h2>Search for users</h2>
                        <p className="ml-4 text-[#282f72]">
                            Search for users by their user ID or their username
                            to send them a friend request.
                        </p>
                        <aside className="align-left content-left justify-left text-left table ml-4 rounded-sm">
                            <SearchFriends />
                        </aside>
                    </section>

                    {/* friend requests section */}
                    <section className="h-auto m-4 p-4 bg-[#babdde] rounded-sm">
                        <h2>Friend requests</h2>
                        <p className="ml-4 text-[#282f72]">
                            Here you can accept or decline incoming friend
                            requests.
                        </p>
                        <div className="mr-25 pl-4 pt-4 text-[#282f72]">
                            {friendRequestList}
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
}
