// /Users/frederikskipper-andersen/Documents/GitHub/P2-Solution/src/components/Profile/profile.tsx
'use client';
import React, { useState, JSX } from 'react'; // useState has isDropdown functions
import ProfileImage from './profileImg';
import { useRouter } from 'next/navigation'; // Import useRouter

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
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="border-none bg-none p-0"
            >
                <ProfileImage /> {/* Separation of concerns */}
            </button>
            {isDropdownOpen && (
                <div className="absolute top-16 right-0 bg-gray-900 text-gray-300 p-4 rounded-md w-48 my-3">
                    <button
                        onClick={() => redirrectProfile('/ProfileSettings')}
                        className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 text-left my-1"
                    >
                        Profile Settings
                    </button>
                    <button
                        onClick={() => redirrectProfile('/Watchlist')}
                        className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 text-left my-1"
                    >
                        Watchlist
                    </button>
                    <button
                        onClick={() => redirrectProfile('/Groups')}
                        className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 text-left my-1"
                    >
                        Groups
                    </button>
                    <button
                        onClick={() => redirrectProfile('/Logout')}
                        className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 text-left my-1"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
