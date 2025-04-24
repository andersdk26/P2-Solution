'use client';
import React, { JSX, useEffect, useState } from 'react';
import { SearchFriends } from '@/components/Profile/Friends/searchFriends';
import {
    AcceptFriendRequest,
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
    const [FriendsList, setFriendsList] = useState<string[]>([]);

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
                                    await verifyUser(),
                                    request.from
                                )
                            }
                        >
                            ✔️
                        </button>
                        <button onClick={() => alert('NO')}>❌</button>
                    </div>
                ))
            );
            setFriendRequestList(resolvedRequests);
        };
        updateFriendRequestList();
    }, [FriendRequests]);

    useEffect(() => {
        const getFriendsList = async (): Promise<void> => {
            const list = await GetFriends(await verifyUser());
            const list2: string[] = list.map(
                async (id) => await getUserById(id)
            );
            setFriendsList(list2);
        };
        getFriendsList();
    }, []);

    return (
        <>
            {/* your friends section */}
            <section className="h-80">
                <h1>Your friends</h1>
                <p className="ml-4">Here you can view your friends</p>
                {FriendsList.map(async (friend) => (
                    <p key={friend}>{await getUserById(friend)}</p>
                ))}
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
