/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import getUsername from '@/actions/logIn/username';
import getUserID from '@/actions/logIn/userID';
import getUserEmail from '@/actions/logIn/userEmail';
import verifyUser from '@/actions/logIn/authenticateUser';
import changePassword from '@/actions/profileSettings/changePassword';
import changeUsername from '@/actions/profileSettings/changeUsername';
import changeEmail from '@/actions/profileSettings/changeEmail';
import changeProfileIcon from '@/actions/profileSettings/changeProfilePic';
import getProfileIcon from '@/actions/logIn/userProfileIcon';
import useRedirect from '@/components/redirect';

export default function ProfileSettings() {
    const redirect = useRedirect(); // Custom hook for redirection

    // current user info
    const [username, setUsername] = useState('Username');
    const [id, setUserID] = useState('User ID#');
    const [email, setUserEmail] = useState('Email');
    const [currentPassword, setCurrentPassword] = useState('');

    // when you wish to edit your current info
    const [isEditing, setIsEditing] = useState<string | null>(null);

    // changing of user info
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    //
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    // pop-up for selected icons
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // select new icon
    const [selectedIcon, setSelectedIcon] = useState(
        '/img/profileSettingIcons/cornpop.png'
    ); // Default icon
    const [profileIcon, setProfileIcon] = useState<string>('/loadingIcon.gif');

    // possible icon images
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
            setUsername(await getUsername(verifyUser())); // finds username
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchUserID = async (): Promise<void> => {
            setUserID(String(await getUserID(verifyUser()))); // finds userID, makes number to string
        };
        fetchUserID();
    }, []);

    useEffect(() => {
        const fetchUserEmail = async (): Promise<void> => {
            setUserEmail(String(await getUserEmail(verifyUser()))); // finds user email, makes number to string
        };
        fetchUserEmail();
    }, []);

    useEffect(() => {
        // Define an async function to fetch the user's profile icon
        const fetchProfileIcon = async (): Promise<void> => {
            const userId = await verifyUser(); // calls a function to verify the user and get their ID
            // if the user ID is valid (greater than 0), fetch their profile icon
            if (userId > 0) {
                const icon = await getProfileIcon(userId); // function to get the actual icon URL from the database

                setProfileIcon(icon); // update the profileIcon state with the fetched icon
            }
        };

        fetchProfileIcon(); // call the fetchProfileIcon function
    }, []);

    // Set selectedIcon to profileIcon when the component mounts
    useEffect(() => {
        if (profileIcon) {
            setSelectedIcon(profileIcon);
        }
    }, [profileIcon]); // Dependency array ensures this runs when profileIcon changes

    const handleIconChange = async () => {
        if (!selectedIcon) {
            alert('Please select an icon');
            return;
        }

        const userId = parseInt(id); // makes userId from string to int

        try {
            const response = await changeProfileIcon(userId, selectedIcon);

            if (response.status === 200) {
                // if the status is successful, then
                alert('Profile icon updated successfully!');
                setProfileIcon(selectedIcon);
                setIsPopupOpen(false); // Close the popup after saving
                window.location.reload(); // Reload the page after successful login
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error changing profile icon:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleUsernameChange = async () => {
        if (!newUsername) {
            // if no username has been written
            alert('Please fill in the field');
            return;
        }

        // Validate username so that it has a maximum number charectors (15)
        if (newUsername.length > 15) {
            alert('Username cannot exceed 15 characters.');
            return;
        }

        // Checks if the new username already exists
        const userId = parseInt(id);

        try {
            const response = await changeUsername(userId, newUsername);

            if (response.status === 200) {
                // if the status is successful, then
                alert('Username updated successfully!');
                setUsername(newUsername); // sets new username
                setIsEditing(null); // closes the editing mode
                setNewUsername(''); //sets the field to blank
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error changing username:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handlePasswordChange = async () => {
        // if nothing in any of the fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('Please fill all the fields.');
            return;
        }

        const userId = parseInt(id); // makes userId from string to int

        try {
            const response = await changePassword(
                userId,
                currentPassword,
                newPassword
            );

            if (response.status === 200) {
                // if status is successful, then
                alert('Password updated successfully!');
                setIsEditing(null); // closes the editing mode
                // set the input fields to blanks
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleEmailChange = async () => {
        if (!newEmail) {
            alert('Please fill in the field');
            return;
        }

        // Validate email format (it makes it so that the users email has to include @ and .)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Check if the new email already exists
        const userId = parseInt(id);

        try {
            const response = await changeEmail(userId, newEmail);

            if (response.status === 200) {
                alert('Email updated successfully!');
                setUserEmail(newEmail);
                setIsEditing(null);
                setNewEmail('');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error changing username:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        // Entire page container
        <section className="p-8">
            {/* Profile Settings container and content*/}
            <section className="ml-120 mr-120 pt-10 pb-10 rounded-sm bg-[#9fa3d1] h-1/2 w-1/3">
                {/* Title */}
                <h2 className="mb-6 text-center">Profile Settings</h2>
                {/* Profile icon container */}
                <section className="flex flex-col items-center mb-8">
                    <Image
                        src={profileIcon} //you can change this to profileIcon if you want to use the one from the database
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
                        {username || 'Loading...'} {/* Loads your username */}
                    </p>
                    <p className="text-sm text-[#282f72]">
                        ID: #{id || 'Loading...'} {/* Loads your userID */}
                    </p>
                </section>
                {/* End of profile picture container */}

                {/* Popup til selecting profile icon */}
                {isPopupOpen && ( // if it's open, then:
                    <section className="fixed mt-25 inset-0 bg-opacity-50 flex justify-center items-center z-50">
                        {/* Popup container */}
                        <div className="bg-[#babdde] p-6 rounded-lg shadow-lg border-3 border-[#282f72]">
                            <h2>Select Profile Icon</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {icons.map(
                                    (
                                        icon,
                                        index // needs comment
                                    ) => (
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
                                            onClick={() =>
                                                setSelectedIcon(icon)
                                            } // sets selected icon to the selected icon
                                        />
                                    )
                                )}
                            </div>
                            ...
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    className="border-[#282f72] border-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => setIsPopupOpen(false)} // Closes popup
                                >
                                    Cancel
                                </button>
                                <button
                                    className="basicBtn"
                                    onClick={handleIconChange} // Save selected icon
                                >
                                    Save
                                </button>
                            </div>
                            ...
                        </div>
                    </section>
                )}
                {/* User information content(container??) (username, password, email) */}
                <section className="flex flex-col items-center space-y-4 mb-10">
                    {/* Username Section */}
                    <p className="flex flex-col items-center font-bold mr-37 mb-0 text-lg text-[#282f72]">
                        Username
                    </p>
                    {/* Your own username */}
                    <p className="mb-0 flex flex-col items-center bg-[#dcdee7] text-[#282f72] px-6 py-2 rounded w-60">
                        {username}
                    </p>
                    {/* Change Username container */}
                    <section className="flex flex-col">
                        <button // "Change username" button
                            className="mb-3 mr-26 underline text-blue-800 cursor-pointer select-none"
                            onClick={
                                () =>
                                    setIsEditing(
                                        isEditing === 'username'
                                            ? null
                                            : 'username'
                                    ) // sets is editing to "username"
                            }
                        >
                            Change Username
                        </button>
                        {/* Change Username-popup */}
                        {/* opens when isEditing is "username" */}
                        {isEditing === 'username' && (
                            // Input box
                            <div className="flex flex-col items-center mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter new username"
                                    value={newUsername}
                                    onChange={(e) =>
                                        setNewUsername(e.target.value)
                                    } // sets the new username
                                    maxLength={15}
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
                    </section>

                    {/* Password Section */}
                    <section className="w-full flex flex-col items-center">
                        <p className="font-bold mb-0 mr-38 text-lg text-[#282f72]">
                            Password
                        </p>
                        <p className="mb-0 flex flex-col items-center bg-[#dcdee7] text-[#282f72] px-6 py-2 rounded w-60">
                            *********
                        </p>

                        <button // "Change Password" button
                            className="mb-3 mr-26 underline text-blue-800 cursor-pointer select-none"
                            onClick={
                                () =>
                                    setIsEditing(
                                        isEditing === 'password'
                                            ? null
                                            : 'password'
                                    ) // sets isediting to "password"
                            }
                        >
                            Change Password
                        </button>
                        {/* Change Password-popup */}
                        {isEditing === 'password' && (
                            // Input boxes
                            <div className="flex flex-col items-center mt-4">
                                {/* Input box 1: Enter current password */}
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={
                                        (e) =>
                                            setCurrentPassword(e.target.value) // sets the current password
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />
                                {/* Input box 2: Enter new password */}
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={
                                        (e) => setNewPassword(e.target.value) // sets the new password
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />
                                {/* Input box 3: Confirm new password */}
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value); // Updates the state with the value entered in the "Confirm new password" input field
                                        setPasswordError(
                                            e.target.value !== newPassword
                                        ); //checks if the passwords matches
                                    }}
                                    className={`border p-2 rounded-md w-60 mb-2 ${
                                        passwordError ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Passwords do not match!
                                    </p>
                                )}
                                <button // Submit button
                                    onClick={handlePasswordChange}
                                    className="basicBtn"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Email Section */}
                    <section className="w-full flex flex-col items-center">
                        <p className="font-bold mb-0 mr-47 text-lg text-[#282f72]">
                            Email
                        </p>

                        {/* Your current email */}
                        <p className="mb-0 flex flex-col items-center bg-[#dcdee7] text-[#282f72] px-6 py-2 rounded w-60">
                            {email}
                        </p>

                        <button //"Change Email" button
                            className="mb-0 mr-33 underline text-blue-800 cursor-pointer select-none"
                            onClick={
                                () =>
                                    setIsEditing(
                                        isEditing === 'email' ? null : 'email'
                                    ) // missing comment
                            }
                        >
                            Change Email
                        </button>
                        {/* Change Email-popup */}
                        {isEditing === 'email' && (
                            // Input box
                            <div className="flex flex-col items-center mt-4">
                                <input
                                    type="email"
                                    placeholder="Enter new email"
                                    value={newEmail}
                                    onChange={
                                        (e) => setNewEmail(e.target.value) // missing comment
                                    }
                                    className="border p-2 rounded-md w-60 mb-2"
                                />
                                <button // Submit button
                                    onClick={handleEmailChange}
                                    className="basicBtn"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </section>
                    <button
                        className="basicBtn mt-10"
                        onClick={() => redirect('/userStats')}
                    >
                        User Statistics
                    </button>
                </section>
            </section>
        </section>
    );
}
