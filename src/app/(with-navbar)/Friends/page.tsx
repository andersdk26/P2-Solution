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
        <p key={0}>You have no pending friend requests.</p>,
    ]);
    const [FriendsList, setFriendsList] = useState<number[]>([]);
    const [friendsListObject, setFriendsListObject] = useState([
        <p className="ml-4" key={0}>
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
                        className="flex items-start space-x-2"
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
                        className="w-1/4 flex items-start rounded-lg ml-4 space-x-2 my-2 bg-black/15"
                        key={id}
                    >
                        <p className="ml-4 my-auto w-64 py-4">
                            {await getUserById(id)}
                        </p>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold my-auto py-2 px-4 mr-4 ml-auto relative rounded-sm cursor-pointer"
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
                        {/* TODO: Gør så man kan fjerne venner. */}
                    </div>
                ))
            );
            setFriendsListObject(resolvedFriends);
        };
        updateFriendList();
    }, [FriendsList]);

    return (
        <>
            {/* your friends section */}
            <section className="ml-4">
                <h2>Your friends</h2>
                <p className="ml-4">
                    Here you can view and manage your friends.
                </p>
                {friendsListObject}
            </section>

            {/* searching for users section */}
            <section className="h-80 ml-4">
                <h2>Search for users</h2>
                <p className="ml-4">
                    Search for users by their user ID or their username to send
                    them a friend request.
                </p>
                <aside className="align-left content-left justify-left text-left table ml-4">
                    <SearchFriends />
                </aside>
            </section>

            {/* friend requests section */}
            <section className="h-80 ml-4">
                <h2>Friend requests</h2>
                <p className="ml-4">
                    Here you can accept or decline incoming friend requests.
                </p>
                <div className="ml-4">{friendRequestList}</div>
            </section>
        </>
    );
}
