'use client';
import React, { JSX } from 'react';
import { SearchFriends } from '@/components/Profile/Friends/searchFriends';

export default function Friends(): JSX.Element {
    return (
        <>
            <h1>Your friends</h1>
            <p className="ml-4">Here you can view your friends</p>
            <h2>Search for friends!</h2>
            <p className="ml-4">Search by their username or user ID</p>
            <aside className="align-left content-left justify-left text-left table m-4">
                <SearchFriends />
            </aside>
            <h2>Friend requests</h2>
        </>
    );
}
