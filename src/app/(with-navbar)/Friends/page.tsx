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

export default function Friends(): JSX.Element {
    const [FriendRequests, setFriendRequests] = useState<{ from: number }[]>(
        []
    );
    const [friendRequestList, setFriendRequestList] = useState([
        <p key={0}>No friend requests</p>,
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

    return (
        <>
            <h1>Your friends</h1>
            <p className="ml-4">Here you can view your friends</p>
            <h2>Search for users</h2>
            <p className="ml-4">Search by their user ID</p>
            <aside className="align-left content-left justify-left text-left table m-4">
                <SearchFriends />
            </aside>
            <h2>Friend requests</h2>
            <div>{friendRequestList}</div>
        </>
    );
}
