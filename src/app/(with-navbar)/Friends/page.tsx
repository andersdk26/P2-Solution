'use client';
import React, { JSX, useEffect, useState } from 'react';
import { SearchFriends } from '@/components/Profile/Friends/searchFriends';
import {
    AcceptFriendRequest,
    DeclineFriendRequest,
    GetFriendRequest,
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
        <p key={0}>No friend requests</p>,
    ]);
    const [FriendsList, setFriendsList] = useState<number[]>([]);
    const [friendsListObject, setFriendsListObject] = useState([
        <p key={0}>Hej</p>,
    ]);

    useEffect(() => {
        const getFriendRequests = async (): Promise<void> => {
            setFriendRequests(await GetFriendRequest(await verifyUser()));
        };
        getFriendRequests();
    }, []);

    useEffect(() => {
        const updateFriendRequestList = async (): Promise<void> => {
            const resolvedRequests = await Promise.all(
                FriendRequests.map(async (request) => (
                    <div key={request.from}>
                        <p>{await getUserById(request.from)}</p>
                        <button
                            onClick={async () =>
                                AcceptFriendRequest(
                                    request.from,
                                    await verifyUser()
                                )
                            }
                        >
                            ✔️
                        </button>
                        <button
                            onClick={async () =>
                                DeclineFriendRequest(
                                    request.from,
                                    await verifyUser()
                                )
                            }
                        >
                            ❌
                        </button>
                    </div>
                ))
            );
            setFriendRequestList(resolvedRequests);
        };
        updateFriendRequestList();
    }, [FriendRequests]);

    useEffect(() => {
        const getFriendsList = async (): Promise<void> => {
            setFriendsList(await GetFriends(await verifyUser()));
        };
        getFriendsList();
    }, []);

    useEffect(() => {
        const updateFriendList = async (): Promise<void> => {
            if (!FriendsList.length) {
                return;
            }

            const resolvedFriends = await Promise.all(
                FriendsList.map(async (id) => (
                    <div key={id}>
                        <p className="ml-4">{await getUserById(id)}</p>
                        <button className="ml-4" onClick={() => alert('HI')}>
                            🫡
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
            {/* your friends section */}
            <section className="h-80">
                <h1>Your friends</h1>
                <p className="ml-4">Here you can view your friends</p>
                {friendsListObject}
            </section>

            {/* searching for users section */}
            <section className="h-80">
                <h2>Search for users</h2>
                <p className="ml-8">Search by their user ID</p>
                <aside className="align-left content-left justify-left text-left table mx-4">
                    <SearchFriends />
                </aside>
            </section>

            {/* friend requests section */}
            <section className="h-80">
                <h2>Friend requests</h2>
                <div>{friendRequestList}</div>
            </section>
        </>
    );
}
