'use client';
import React, { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import getProfileIcon from '@/actions/logIn/userProfileIcon';
import verifyUser from '@/actions/logIn/authenticateUser';

// This is a React component that displays a user's profile image
export default function ProfileImage(): JSX.Element {
    // Declare a state variable called profileIcon with a default image (a loading spinner)
    const [profileIcon, setProfileIcon] = useState<string>('/loadingIcon.gif');

    useEffect(() => {
        // Define an async function to fetch the user's profile icon
        const fetchProfileIcon = async (): Promise<void> => {
            const userId = await verifyUser(); // this calls a function to verify the user and get their ID
            // if the user ID is valid (greater than 0), fetch their profile icon
            if (userId > 0) {
                const icon = await getProfileIcon(userId); // here we call another function to get the actual icon URL from the database

                setProfileIcon(icon); // then we update the profileIcon state with the fetched icon
            }
        };

        fetchProfileIcon(); //we call the call the fetchProfileIcon function
    }, []);

    // then lasty return an Image component that displays the current profileIcon
    // the Image component is placed in the navbar
    return (
        <Image
            src={profileIcon} // profileIcon is the URL of the profile image
            alt="Profile Icon"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full border border-black cursor-pointer object-cover select-none"
            draggable="false"
        />
    );
}
