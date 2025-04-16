/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import getUsername from '@/actions/logIn/username';
import getUserID from '@/actions/logIn/userID';
import getUserEmail from '@/actions/logIn/userEmail';
import verifyUser from '@/actions/logIn/authenticateUser';
import './ProfileSettings.css';
import changePassword from '@/actions/profileSettings/changePassword';

// import of movies to user stats - seenlist
import { movie, getMovieById } from '@/actions/movie/movie';
import MovieImage from '@/components/movie/MovieImage';
import RatingCarousel from '@/components/coldStarSurvey/rateMovies/ratingCarousel';
import getSeenMovies from '@/actions/profileSettings/getSeenMovies';

export default function ProfileSettings() {
    const [username, setUsername] = useState('Username');
    const [id, setUserID] = useState('User ID#');
    const [email, setUserEmail] = useState('Email');
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(
        '/img/profileSettingIcons/derpPopcornBucket.png'
    ); // Default icon
    const [seenMovies, setSeenMovies] = useState<number[]>([1]);

    const icons = [
        '/img/profileSettingIcons/cornpop.png',
        '/img/profileSettingIcons/cuteButterPopcorn.png',
        '/img/profileSettingIcons/bucketCornPop.png',
        '/img/profileSettingIcons/cutePopcorn.png',
        '/img/profileSettingIcons/surpricedButterPopcorn.png',
        '/img/profileSettingIcons/derpPopcornBucket.png',
        '/img/profileSettingIcons/surpricedPopcorn.png',
        '/img/profileSettingIcons/happyButterPopcorn.png',
        '/img/profileSettingIcons/happyPopcornBucket.png',
        '/img/profileSettingIcons/happyPopcorn.png',
        '/img/profileSettingIcons/cutePopcornBucket.png',
        '/img/profileSettingIcons/swagMoviePopcornBucket.png',
    ];

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

    useEffect(() => {
        const fetchUserEmail = async (): Promise<void> => {
            setUserEmail(String(await getUserEmail(verifyUser())));
        };
        fetchUserEmail();
    }, []);

    useEffect(() => {
        const fetchSeenMovies = async () => {
            setSeenMovies(await getSeenMovies(await verifyUser()));
        };
        fetchSeenMovies();
    }, []);

    const handleUsernameChange = async () => {
        if (!newUsername) {
            alert('Please fill in the field');
            return;
        }

        // Validate username so that it has a maximum number charectors (15)
        if (newUsername.length > 15) {
            alert('Username cannot exceed 15 characters.');
            return;
        }

        // Check if the new username already exists
        const userId = parseInt(id);

        try {
            const response = await changeUsername(userId, newUsername);

            if (response.status === 200) {
                alert('Username updated successfully!');
                setUsername(newUsername);
                setIsEditing(null);
                setNewUsername('');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error changing username:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword) {
            alert('Please fill in both fields.');
            return;
        }

        const userId = parseInt(id);

        try {
            const response = await changePassword(
                userId,
                currentPassword,
                newPassword
            );

            if (response.status === 200) {
                alert('Password updated successfully!');
                setIsEditing(null);
                setCurrentPassword('');
                setNewPassword('');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleEmailChange = () => {};

    return (
        <div className="p-8">
            {/* Profile Settings container and content*/}
            <div className="ml-100 mr-100 pt-10 pb-10 rounded-sm bg-[#9fa3d1]">
                <h2 className="mb-6 text-center">Profile Settings</h2>

                <div className="flex flex-col items-center mb-8">
                    <Image
                        src={selectedIcon}
                        alt="Profile Icon"
                        width={100}
                        height={100}
                        className="w-25 h-25 rounded-full border border-black object-cover select-none"
                        draggable="false"
                    />
                    <p
                        className="mt-2 text-blue-800 underline cursor-pointer"
                        onClick={() => setIsPopupOpen(true)} // Open popup
                    >
                        Change Profile Icon
                    </p>
                    <p className="text-xl mt-2 text-[#282f72] font-bold">
                        {username || 'Loading...'}
                    </p>
                    <p className="text-sm text-[#282f72]">
                        ID: #{id || 'Loading...'}
                    </p>
                </div>

                {/* Popup til selecting profile icon */}
                {isPopupOpen && (
                    <div className="fixed mt-25 inset-0 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-[#babdde] p-6 rounded-lg shadow-lg border-3 border-[#282f72]">
                            <h2>Select Profile Icon</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {icons.map((icon, index) => (
                                    <Image
                                        key={index}
                                        src={icon}
                                        alt={`Icon ${index + 1}`}
                                        width={64}
                                        height={64}
                                        className={`w-20 h-20 cursor-pointer rounded-full border select-none ${
                                            selectedIcon === icon
                                                ? 'border-blue-500'
                                                : 'border-gray-400'
                                        } hover:border-blue-500 object-cover`}
                                        draggable="false"
                                        onClick={() => setSelectedIcon(icon)}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    className="border-[#282f72] border-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => setIsPopupOpen(false)} // Close popup
                                >
                                    Cancel
                                </button>
                                <button
                                    className="basicBtn"
                                    onClick={() => {
                                        setIsPopupOpen(false);
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <p className="flex flex-col items-center font-bold mr-37 text-lg text-[#282f72]">
                    Username
                </p>

                <div className="flex flex-col items-center space-y-4 mb-10">
                    {/* Change Username Section */}
                    <p className="mb-0 flex flex-col items-center bg-[#dcdeef] text-[#282f72] px-6 py-2 rounded w-60">
                        {username}
                    </p>
                    <div className="w-full flex flex-col items-center">
                        <button
                            className="mb-3 mr-26 underline text-blue-800 cursor-pointer select-none"
                            onClick={() =>
                                setIsEditing(
                                    isEditing === 'username' ? null : 'username'
                                )
                            }
                        >
                            {' '}
                            Change Username
                        </button>
                        {isEditing === 'username' && (
                            <div className="flex flex-col items-center mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter new username"
                                    value={newUsername}
                                    onChange={(e) =>
                                        setNewUsername(e.target.value)
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />

                                <button
                                    onClick={handleUsernameChange}
                                    className="basicBtn"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Password Section */}
                    <p className="font-bold mb-0 mr-38 text-lg text-[#282f72]">
                        Password
                    </p>
                    <p className="mb-0 flex flex-col items-center bg-[#dcdeef] text-[#282f72] px-6 py-2 rounded w-60">
                        *********
                    </p>
                    <div className="w-full flex flex-col items-center">
                        <button
                            className="mb-3 mr-26 underline text-blue-800 cursor-pointer select-none"
                            onClick={() =>
                                setIsEditing(
                                    isEditing === 'password' ? null : 'password'
                                )
                            }
                        >
                            Change Password
                        </button>
                        {isEditing === 'password' && (
                            <div className="flex flex-col items-center mt-4">
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />
                                <button
                                    onClick={handlePasswordChange}
                                    className="basicBtn"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="font-bold mb-0 mr-47 text-lg text-[#282f72]">
                        Email
                    </p>

                    {/* Change Email Section */}
                    <p className="mb-0 flex flex-col items-center bg-[#dcdeef] text-[#282f72] px-6 py-2 rounded w-60">
                        {email}
                    </p>
                    <div className="w-full flex flex-col items-center">
                        <button
                            className="mb-0 mr-33 underline text-blue-800 cursor-pointer select-none"
                            onClick={() =>
                                setIsEditing(
                                    isEditing === 'email' ? null : 'email'
                                )
                            }
                        >
                            Change Email
                        </button>
                        {isEditing === 'email' && (
                            <div className="flex flex-col items-center mt-4">
                                <input
                                    type="email"
                                    placeholder="Enter new email"
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />
                                <button
                                    onClick={handleEmailChange}
                                    className="basicBtn"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* User stats container and content */}
            <div className="mt-10 ml-100 mr-100 pt-10 pb-10 rounded-sm bg-[#9fa3d1] text-center">
                <h2>User stats</h2>
                <div className="bg-[#282f72] m-5">
                    Visualisering af stats, evt. m. graffer
                </div>

                <div className="bg-[#282f72] m-5">
                    Seenlist - under seen movies, we have change movie ratings
                    <MovieImage movieId={seenMovies[0]} />
                    <MovieImage movieId={seenMovies[1]} />
                </div>
                {/* <div className="bg-[#282f72] m-5">Movie ratings</div> */}

                {/* <ul className="list-disc list-inside ml-4">
                    <li>
                        <span className="underline text-blue-800 cursor-pointer">
                            Histogrammer/grafferne
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
                </ul> */}
            </div>
        </div>
    );
}
