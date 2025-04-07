'use client';
import React, { useState, useEffect, JSX } from 'react';
import ProfileImage from './profileImg';
import { useRouter } from 'next/navigation';
import userLogout from '@/actions/logIn/userLogout';

const Profile = (): JSX.Element => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null); // State for username
    const router = useRouter();

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const redirrectProfile = (path: string): void => {
        if (path) {
            router.push(path);
        }
        setIsDropdownOpen(false);
    };

    // skaffer the logged-in user's username
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('/api/user'); // Fetch den fra API
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username); // Set the username
                } else {
                    console.error('Failed to fetch username');
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
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
                        onClick={() => redirrectProfile('/ProfileSettings')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={() => redirrectProfile('/Watchlist')}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
                    >
                        Watchlist
                    </button>
                    <button
                        onClick={() => redirrectProfile('/Help')}
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
                            //window.location.reload();
                            router.push('/logIn');
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
