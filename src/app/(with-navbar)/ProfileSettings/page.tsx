'use client';
import React, { useState, JSX } from 'react';
import Image from 'next/image';

const ProfileImage = (): JSX.Element => (
    <Image
        src="/popcornImage.jpeg"
        alt="Profile Icon"
        width={64}
        height={64}
        className="rounded-full border border-black cursor-pointer"
    />
);

const ProfileSettings = (): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('CurrentUsername');
    const [newUsername, setNewUsername] = useState('');

    const handleUsernameChange = (): void => {
        if (newUsername.trim()) {
            setUsername(newUsername); // Update the username
            setNewUsername('');
            setIsEditing(false);
        }
    };

    return (
        <div className="p-4">
            <ProfileImage />
            <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
            <div className="mb-4">
                <span className="text-lg font-medium">Username: </span>
                <span className="text-lg">{username}</span>
                <button
                    className="ml-4 text-blue-500 hover:underline"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Change Username
                </button>
            </div>
            {isEditing && (
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter new username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="border p-2 rounded-md w-full mb-2"
                    />
                    <button
                        onClick={handleUsernameChange}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;
