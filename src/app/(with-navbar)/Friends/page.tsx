'use client';
import React, { JSX, useEffect, useState } from 'react';
import { SearchFriends } from '@/components/Profile/Friends/searchFriends';
import { GetFriendRequest } from '@/actions/friends/friendRequests';
import verifyUser from '@/actions/logIn/authenticateUser';

export default function Friends(): JSX.Element {
    const [FriendRequests, setFriendRequests] = useState<{ from: number }[]>(
        []
    );

    useEffect(() => {
        const getFriendRequests = async (): Promise<void> => {
            setFriendRequests(await GetFriendRequest(await verifyUser()));
        };
        getFriendRequests();
    }, []);

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
            <div>
                {FriendRequests.map((request) => {
                    <div key={request.from}>
                        <p>{request.from}</p>
                    </div>;
                })}
            </div>
        </>
    );
}
