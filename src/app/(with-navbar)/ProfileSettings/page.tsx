'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import getUsername from '@/actions/logIn/username';
import getUserID from '@/actions/logIn/userID';
import verifyUser from '@/actions/logIn/authenticateUser';

export default function ProfileSettings() {
    const [username, setUsername] = useState('Username');
    const [id, setUserID] = useState('User ID#');
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        const fetchUsername = async (): Promise<void> => {
            setUsername(await getUsername(verifyUser()));
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchUserID = async (): Promise<void> => {
            setUserID(String(await getUserID(verifyUser())));
        };
        fetchUserID();
    }, []);

    //her skal indsættes databasen ind således at den kan ændre username, password og email
    const handleUsernameChange = () => {};

    const handlePasswordChange = () => {};

    const handleEmailChange = () => {};

    return (
        <div className="p-8 text-black">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

            <div className="flex flex-col items-center mb-8">
                <Image
                    src="/popcornImage.jpeg"
                    alt="Profile Icon"
                    width={100}
                    height={100}
                    className="rounded-full border border-black"
                />
                <p className="mt-2 text-blue-800 underline cursor-pointer">
                    Change icon
                </p>
                <p className="text-xl mt-2 underline">
                    {username || 'Loading...'}
                </p>
                <p className="text-sm">ID: #{id || 'Loading...'}</p>
            </div>

            <div className="flex flex-col items-center space-y-4 mb-10">
                {/* Change Username Section */}
                <div className="w-full flex flex-col items-center">
                    <button
                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold px-6 py-2 rounded w-60 cursor-pointer"
                        onClick={() =>
                            setIsEditing(
                                isEditing === 'username' ? null : 'username'
                            )
                        }
                    >
                        Change username
                    </button>
                    {isEditing === 'username' && (
                        <div className="flex flex-col items-center mt-4">
                            <input
                                type="text"
                                placeholder="Enter new username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="border p-2 rounded-md w-60 mb-2"
                            />

                            <button
                                onClick={handleUsernameChange}
                                className="bg-[#424ebd] text-white px-4 py-2 rounded-md hover:bg-pink-600 cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>

                {/* Change Password Section */}
                <div className="w-full flex flex-col items-center">
                    <button
                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold px-6 py-2 rounded w-60 cursor-pointer"
                        onClick={() =>
                            setIsEditing(
                                isEditing === 'password' ? null : 'password'
                            )
                        }
                    >
                        Change password
                    </button>
                    {isEditing === 'password' && (
                        <div className="flex flex-col items-center mt-4">
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border p-2 rounded-md w-60 mb-2"
                            />
                            <button
                                onClick={handlePasswordChange}
                                className="bg-[#424ebd] text-white px-4 py-2 rounded-md hover:bg-pink-600 cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>

                {/* Change Email Section */}
                <div className="w-full flex flex-col items-center">
                    <button
                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold px-6 py-2 rounded w-60 cursor-pointer cursor-pointer"
                        onClick={() =>
                            setIsEditing(isEditing === 'email' ? null : 'email')
                        }
                    >
                        Change email
                    </button>
                    {isEditing === 'email' && (
                        <div className="flex flex-col items-center mt-4">
                            <input
                                type="email"
                                placeholder="Enter new email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="border p-2 rounded-md w-60 mb-2"
                            />
                            <button
                                onClick={handleEmailChange}
                                className="bg-[#424ebd] text-white px-4 py-2 rounded-md hover:bg-pink-600 cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="ml-12">
                <p className="text-lg font-semibold">User statsss</p>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        <span className="underline text-blue-800 cursor-pointer">
                            Histogrammer/grafferne
                        </span>
                    </li>
                    <li>
                        <span className="underline text-blue-800 cursor-pointer">
                            watchlist her
                        </span>
                    </li>
                    <li>
                        <span className="underline text-blue-800 cursor-pointer">
                            Seen movies
                        </span>
                        <ul className="ml-6 list-disc">
                            <li>
                                <span className="underline text-black-900 cursor-pointer">
                                    under seen movies we have change movie
                                    ratings
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
