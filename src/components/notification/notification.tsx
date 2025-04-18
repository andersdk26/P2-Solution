'use client';
import React, { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import '@/styles/animation.css';

const Notification = (): JSX.Element => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <button
                onClick={toggleDropdown}
                className="centerMyDivPlease cursor-pointer shakeIcon"
            >
                <Image
                    src={'/img/Bell icon.png'}
                    width={30}
                    height={30}
                    alt={'Notification tab'}
                    title="Notification"
                />
            </button>
            {isDropdownOpen && (
                <div className="absolute select-none top-21 right-18 bg-[#9fa3d1] border-2 border-solid border-[#282f72] text-[#282f72] text-xs p-4 rounded-md w-1/8 my-3 z-100">
                    <p className="font-bold text-sm">Notifications</p>
                    <p>User1 Joined Group1</p>
                </div>
            )}
        </>
    );
};

export default Notification;
