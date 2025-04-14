'use client';
import React, { JSX } from 'react';

export default function Friends(): JSX.Element {
    return (
        <>
            <h1>Your friends</h1>
            <p className="ml-4">Here you can view your friends</p>
            <h2>Search for friends!</h2>
            <p className="ml-4">Search by their username or user ID</p>
        </>
    );
}
