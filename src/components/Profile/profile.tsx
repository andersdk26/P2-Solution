// /Users/frederikskipper-andersen/Documents/GitHub/P2-Solution/src/components/Profile/profile.tsx
'use client';
import React, { useState, JSX } from 'react'; // useState has isDropdown functions
import ProfileImage from './profileImg';
import { redirect, useRouter } from 'next/navigation'; // Import useRouter
import userLogout from '@/actions/logIn/userLogout';

const Profile = (): JSX.Element => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter(); // Use the useRouter hook

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown on click
    };

    const redirrectProfile = (path: string): void => {
        if (path) {
            router.push(path);
        }
        setIsDropdownOpen(false);
    };

    return (
        <>
            <button onClick={toggleDropdown} className="centerMyDivPlease">
                <ProfileImage /> {/* Separation of concerns */}
            </button>
            {isDropdownOpen && (
                <div className="absolute top-16 right-0 bg-[#101010c0] text-gray-300 p-4 rounded-md w-48 my-3">
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
                            await userLogout();
                            redirect('/logIn');
                        }}
                        className="flex items-center space-x-2 w-full p-2 hover:font-bold text-left my-1"
                    >
                        Logout
                    </button>
                </div>
            )}
        </>
    );
};

export default Profile;
