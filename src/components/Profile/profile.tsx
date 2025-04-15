'use client';
import React, { useState, useEffect, JSX } from 'react';
import ProfileImage from './profileImg';
import userLogout from '@/actions/logIn/userLogout';
import getUsername from '@/actions/logIn/username';
import verifyUser from '@/actions/logIn/authenticateUser';
import useRedirect from '@/components/redirect';

const Profile = (): JSX.Element => {
    const redirect = useRedirect(); // Custom hook for redirection
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [username, setUsername] = useState('Username'); // State for username

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // skaffer the logged-in user's username
    useEffect(() => {
        const fetchUsername = async (): Promise<void> => {
            setUsername(await getUsername(verifyUser()));
        };
        fetchUsername();
    }, []);

    return (
        <>
            <button onClick={toggleDropdown} className="centerMyDivPlease">
                <ProfileImage />
            </button>
            {isDropdownOpen && (
                <div className="absolute top-21 right-0 bg-[#101010c0] text-purple-200 p-4 rounded-md w-42 my-3 z-100">
                    <p className="text-white font-bold">
                        {username || 'Loading...'}
                    </p>
                    {/* shows username, if not shows "loading..." instead*/}
                    <button
                        onClick={() => redirect('ProfileSettings')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1 cursor-pointer"
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={() => redirect('Friends')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1 cursor-pointer"
                    >
                        Friends
                    </button>
                    <button
                        onClick={() => redirect('Watchlist')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1 cursor-pointer"
                    >
                        Watchlist
                    </button>
                    <button
                        onClick={() => redirect('Help')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1 cursor-pointer"
                    >
                        Help
                    </button>
                    <button
                        onClick={async () => {
                            if ((await userLogout()) === true) {
                                alert('Error logging out! Please try again.');
                                return;
                            }
                            redirect('logIn');
                        }}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1 cursor-pointer"
                    >
                        Log out
                    </button>
                </div>
            )}
        </>
    );
};

export default Profile;
