'use client';
import React, { useState, useEffect, JSX } from 'react';
import ProfileImage from './profileImg';
import { useRouter } from 'next/navigation';
import userLogout from '@/actions/logIn/userLogout';
import getUsername from '@/actions/logIn/username';
import verifyUser from '@/actions/logIn/authenticateUser';
import redirect from '@/components/redirect';

const Profile = (): JSX.Element => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [username, setUsername] = useState('Username'); // State for username
    const router = useRouter();

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
                    </p>{' '}
                    {/* Viser username. Hvis den ikke kan skaffe username insætter den Loading... istedet*/}
                    <button
                        onClick={() => redirect('ProfileSettings')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={() => redirect('Watchlist')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
                    >
                        Watchlist
                    </button>
                    <button
                        onClick={() => redirect('Help')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
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
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
                    >
                        Log out
                    </button>
                </div>
            )}
        </>
    );
};

export default Profile;
